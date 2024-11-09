import { create } from "zustand";

interface OpenCloseStore {
  isOpen: boolean;
  toggleOpenClose: () => void;
  open: () => void;
  close: () => void;
}

export const createOpenCloseStore = () =>
  create<OpenCloseStore>((set) => ({
    isOpen: false,
    toggleOpenClose: () => set((state) => ({ isOpen: !state.isOpen })),
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }));

export const useUserStackStore = createOpenCloseStore();
export const useVacancyStore = createOpenCloseStore();
