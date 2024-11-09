import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://freedom-back-production.up.railway.app/api",
});

// Request interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      console.log("[Request Interceptor] Checking for access token...");
      const data = await AsyncStorage.getItem("userData");
      const parsedData = data ? JSON.parse(data) : {};
      const token = parsedData?.accessToken;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        console.log("[Request Interceptor] Access token added to headers");
      } else {
        console.log("[Request Interceptor]:", parsedData);
        console.log("[Request Interceptor] No access token found");
      }
      return config;
    } catch (error) {
      console.error(
        "[Request Interceptor] Error retrieving token from AsyncStorage:",
        error
      );
      return config;
    }
  },
  (error) => {
    console.error("[Request Interceptor] Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh on 401
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("[Response Interceptor] Response received:", response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn(
        "[Response Interceptor] 401 Unauthorized - attempting token refresh..."
      );
      originalRequest._retry = true;

      try {
        console.log(
          "[Token Refresh] Retrieving refresh token from AsyncStorage..."
        );
        const data = await AsyncStorage.getItem("userData");
        const parsedData = data ? JSON.parse(data) : {};
        const refreshToken = parsedData?.user?.refreshToken;

        if (refreshToken) {
          console.log(
            "[Token Refresh] Sending refresh token to refresh endpoint..."
          );
          const res = await axios.post(
            `${axiosInstance.defaults.baseURL}/access`,
            {},
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );

          if (res.status === 200) {
            const { accessToken, refreshToken: newRefreshToken } = res.data;
            console.log(
              "[Token Refresh] Token refresh successful - new tokens received"
            );

            // Update tokens in AsyncStorage
            const updatedUserData = {
              ...parsedData,
              user: {
                ...parsedData.user,
                accessToken,
                refreshToken: newRefreshToken,
              },
            };
            await AsyncStorage.setItem(
              "userData",
              JSON.stringify(updatedUserData)
            );
            console.log("[Token Refresh] Updated tokens saved to AsyncStorage");

            // Set new access token on the request and retry
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

            console.log(
              "[Token Refresh] Retrying original request with new access token"
            );
            return axiosInstance(originalRequest);
          } else {
            console.warn(
              "[Token Refresh] Refresh token request failed with status:",
              res.status
            );
          }
        } else {
          console.warn(
            "[Token Refresh] No refresh token found in AsyncStorage"
          );
        }
      } catch (refreshError) {
        console.error("[Token Refresh] Error refreshing token:", refreshError);
        await AsyncStorage.removeItem("userData"); // Clear storage on error
        return Promise.reject(refreshError);
      }
    } else if (error.response?.status === 401) {
      console.error(
        "[Response Interceptor] Unauthorized request failed after token refresh attempt."
      );
    }

    console.error("[Response Interceptor] Request error:", error);
    return Promise.reject(error);
  }
);
