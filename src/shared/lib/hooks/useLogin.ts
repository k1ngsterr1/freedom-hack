import { useState } from "react";
import { axiosInstance } from "./useInterceptor";

interface UseLoginResult {
  login: string;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  loginFunction: () => Promise<void>;
}

export function useLogin(): UseLoginResult {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const loginFunction = async () => {
    const data = {
      login,
      password,
    };

    try {
      const response = await axiosInstance.post("/users/login", data);
      console.log("Login successful:", response.data);
    } catch (error: any) {
      setError(
        error.response?.data?.error || "Login failed. Please try again."
      );
      console.error("Login error:", error.message);
    }
  };

  return { login, setLogin, password, setPassword, error, loginFunction };
}
