import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

// Define user data with statuses
export interface IUserData {
  username: string | null;
  email: string | null;
  accessToken: string | null;
  id: number | null;
}

// Hook result interface
export interface UserDataHookResult {
  userData: IUserData | null;
  isLoading: boolean;
  updateUserData: (newData: IUserData) => Promise<void>;
}

export const useUserData = (): UserDataHookResult => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<IUserData | null>(null);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        const parsedData: IUserData = JSON.parse(data);
        console.log("Parsed userData:", parsedData); // Debugging log
        setUserData(parsedData);
      } else {
        console.warn("No user data found in AsyncStorage.");
        setUserData(null);
      }
    } catch (error) {
      console.error("Error reading userData from AsyncStorage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const updateUserData = async (newData: IUserData) => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem("userData", JSON.stringify(newData));
      setUserData(newData);
    } catch (error) {
      console.error("Error saving userData to AsyncStorage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { userData, isLoading, updateUserData };
};
