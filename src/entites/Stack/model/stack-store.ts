// src/store/authStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  selectedType: string | null;
  setAuthenticated: (value: boolean) => void;
  setSelectedType: (type: string) => void;
  loadUserData: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: true,
  isAuthenticated: false,
  selectedType: null,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setSelectedType: (type) => set({ selectedType: type }),
  loadUserData: async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      const parsedData = data ? JSON.parse(data) : null;

      if (parsedData && parsedData.user) {
        set({
          isAuthenticated: true,
          selectedType: parsedData.user.role,
        });
      } else {
        set({ isAuthenticated: false, selectedType: null });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      set({ isAuthenticated: false, selectedType: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
