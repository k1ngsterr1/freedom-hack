import { create } from "zustand";

type UserType = "User" | "HR";

interface AppState {
  selectedType: UserType | null;
  setSelectedType: (type: UserType) => void;
}

export const useUserStore = create<AppState>((set) => ({
  selectedType: null, // Начальное значение
  setSelectedType: (type) => set({ selectedType: type }), // Функция для обновления значения
}));
