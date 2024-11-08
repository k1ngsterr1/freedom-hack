import { create } from "zustand";

interface OpenCloseStore {
  isOpen: boolean;
  toggleOpenClose: () => void;
  open: () => void;
  close: () => void;
}

export const useOpenCloseStore = create<OpenCloseStore>((set) => ({
  isOpen: false, // Initial state
  toggleOpenClose: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
