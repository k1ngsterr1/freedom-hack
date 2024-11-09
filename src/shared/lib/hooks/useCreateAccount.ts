import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "./useInterceptor"; // Customize this path as needed
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "src/entites/UserType/model/user-type-store";
import { executeNativeBackPress } from "react-native-screens";

interface UseCreateAccountResult {
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  registerAccount: () => Promise<void>;
}

export function useCreateAccount(): UseCreateAccountResult {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { selectedType } = useUserStore();
  const navigation = useNavigation();

  const registerAccount = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const data = {
      username: fullName,
      email,
      password,
      role: selectedType,
    };

    console.log("Registering with data:", data);

    try {
      const response = await axiosInstance.post("/users/register", data);
      console.log("Registration successful:", response.data);

      // Save user data including tokens in AsyncStorage
      const userData = JSON.stringify(response.data);
      await AsyncStorage.setItem("userData", userData);
      console.log("User data saved to AsyncStorage");

      if (selectedType === "HR") {
        navigation.navigate("HRProfile" as never);
      } else {
        navigation.navigate("CVScreen" as never);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.error || "Registration failed. Please try again."
      );
      console.error("Registration error:", error);
    }
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    registerAccount,
  };
}
