import { useState } from "react";
import { useUserStore } from "src/entites/UserType/model/user-type-store";
import axios from "axios";

interface UseLoginResult {
  login: string;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  loginFunction: () => Promise<void>;
  isLogged: boolean; // Add this line
}

export function useLogin(): UseLoginResult {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setSelectedType } = useUserStore(); // Get role setter from store

  const loginFunction = async () => {
    const data = {
      email: login,
      password,
    };

    try {
      const response = await axios.post(
        "https://freedom-back-production.up.railway.app/api/users/login",
        data
      );

      const { role } = response.data;
      setSelectedType(role);
      setIsLogged(true);
    } catch (error: any) {
      setError(
        error.response?.data?.error || "Login failed. Please try again."
      );
      console.error("Login error:", error.message);
    }
  };

  return {
    login,
    setLogin,
    password,
    setPassword,
    error,
    loginFunction,
    isLogged,
  };
}
