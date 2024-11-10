// src/stores/filterStore.ts
import { create } from "zustand";

interface FilterStoreState {
  selectedFilters: string[];
  salaryRange: { min: string; max: string };
  sortOrder: "newest" | "oldest" | null;
  setFilters: (filters: string[]) => void;
  setSalaryRange: (range: { min: string; max: string }) => void;
  setSortOrder: (order: "newest" | "oldest" | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStoreState>((set) => ({
  selectedFilters: [],
  salaryRange: { min: "0", max: "1000000" },
  sortOrder: null,
  setFilters: (filters) => set({ selectedFilters: filters }),
  setSalaryRange: (range) => set({ salaryRange: range }),
  setSortOrder: (order) => set({ sortOrder: order }),
  resetFilters: () =>
    set({
      selectedFilters: [],
      salaryRange: { min: "0", max: "1000000" },
      sortOrder: null,
    }),
}));
