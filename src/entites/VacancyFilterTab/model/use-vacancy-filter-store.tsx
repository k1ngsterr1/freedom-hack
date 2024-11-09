import { create } from "zustand";

type SortOption = "newest" | "oldest" | "mostValuable" | "leastValuable";
type ExperienceFilter = "all" | "1+" | "3+" | "5+";
type DateFilter = "all" | "week" | "month" | "3months" | "6months" | "year";

interface VacancyFilterStore {
  experienceFilter: ExperienceFilter;
  sortBy: SortOption;
  dateFilter: DateFilter;
  setExperienceFilter: (filter: ExperienceFilter) => void;
  setSortBy: (sort: SortOption) => void;
  setDateFilter: (filter: DateFilter) => void;
  applyFilters: () => void;
}

export const useVacancyFilterStore = create<VacancyFilterStore>((set, get) => ({
  // Изначальные значения
  experienceFilter: "all",
  sortBy: "newest",
  dateFilter: "all",

  // Функции для обновления состояния
  setExperienceFilter: (filter) => set({ experienceFilter: filter }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setDateFilter: (filter) => set({ dateFilter: filter }),

  // Функция для применения фильтров
  applyFilters: () => {
    console.log("Фильтры применены:", {
      experienceFilter: get().experienceFilter,
      sortBy: get().sortBy,
      dateFilter: get().dateFilter,
    });
  },
}));
