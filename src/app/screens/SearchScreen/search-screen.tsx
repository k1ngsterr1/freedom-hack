import React, { useEffect, useState, useCallback } from "react";
import { View, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { Layout } from "@app/layouts/layout";
import { Ionicons } from "@expo/vector-icons";
import { useUserStackStore } from "src/entites/FilterTab/model/filter-tab-store";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import { VacancyCard } from "@features/ui/VacancyCard/vacancy-card";
import { axiosInstance } from "@shared/lib/hooks/useInterceptor";
import Text from "@shared/ui/Text/text";
import { useFilterStore } from "src/entites/VacancyFilter/use-vacancy-store";
import { useNavigation } from "@react-navigation/native";

interface Vacancy {
  id: number;
  userId: number;
  title: string;
  description: string;
  hard_skills: string[];
  soft_skills: string[];
  formatOfWork: string[];
  employmentType: string;
  salary: number[];
  task: string;
  requirements: string[];
  location: string | null;
  additional: string[];
  contacts: string[];
  created_at: string | null;
}

export default function SearchScreen() {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");
  const { toggleOpenClose } = useUserStackStore();
  const { selectedFilters, salaryRange, sortOrder } = useFilterStore();

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterVacancies = useCallback(() => {
    const filtered = vacancies.filter((vacancy) => {
      const matchesKeyword =
        !keyword ||
        vacancy.title.toLowerCase().includes(keyword.toLowerCase()) ||
        vacancy.description.toLowerCase().includes(keyword.toLowerCase());

      const matchesSalary =
        (vacancy.salary[0] >= salaryRange.min &&
          vacancy.salary[0] <= salaryRange.max) ||
        (vacancy.salary[1] >= salaryRange.min &&
          vacancy.salary[1] <= salaryRange.max);

      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.some((filter) => {
          switch (filter) {
            case "fulltime":
              return vacancy.employmentType === "Полный день";
            case "parttime":
              return vacancy.employmentType === "Частичная занятость";
            case "remote":
              return vacancy.formatOfWork.includes("Удаленная работа");
            case "contract":
              return vacancy.employmentType === "Контракт";
            case "internship":
              return vacancy.employmentType === "Стажировка";
            default:
              return false;
          }
        });

      return matchesKeyword && matchesSalary && matchesFilters;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "from_new") {
        return (
          new Date(b.created_at || "").getTime() -
          new Date(a.created_at || "").getTime()
        );
      } else if (sortOrder === "from_old") {
        return (
          new Date(a.created_at || "").getTime() -
          new Date(b.created_at || "").getTime()
        );
      }
      return 0;
    });

    setFilteredVacancies(sorted);
  }, [vacancies, keyword, selectedFilters, salaryRange, sortOrder]);

  useEffect(() => {
    const getVacancies = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<Vacancy[]>(`vacancies/get`);
        setVacancies(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch vacancies. Please try again later.");
        setLoading(false);
      }
    };

    getVacancies();
  }, []);

  const vacancyId = 7;

  useEffect(() => {
    filterVacancies();
  }, [filterVacancies]);

  const handleSearch = () => {
    filterVacancies();
  };

  if (loading) {
    return (
      <Layout isHeader isBottomTab isNoMarginBottom={true} isBack>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4FB84F" />
          <Text className="mt-4 text-text">Loading vacancies...</Text>
        </View>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout isHeader isBottomTab isNoMarginBottom={true} isBack>
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-center">{error}</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout isHeader isBottomTab isNoMarginBottom={true} isBack>
      <View className="flex-1 w-full mt-4">
        <View className="flex-row items-center mb-4">
          <TextInput
            className="flex-1 bg-gray-200 rounded-full px-4 py-3.5 mr-2"
            placeholder="Поиск"
            value={keyword}
            onChangeText={setKeyword}
          />
          <MyTouchableOpacity
            className="bg-primary rounded-full p-2"
            onPress={handleSearch}
          >
            <Ionicons name="search" size={24} color="white" />
          </MyTouchableOpacity>
          <MyTouchableOpacity
            className="bg-gray-200 rounded-full p-2 ml-2"
            onPress={toggleOpenClose}
          >
            <Ionicons name="options" size={24} color="black" />
          </MyTouchableOpacity>
        </View>
        <ScrollView className="h-full mb-24">
          {filteredVacancies.map((vacancy) => (
            <VacancyCard
              id={vacancy.id}
              created_at={vacancy.created_at || ""}
              title={vacancy.title}
              formatOfWork={vacancy.formatOfWork}
              employmentType={vacancy.employmentType}
              location={vacancy.location || "Не указано"}
              salary={`${
                vacancy.salary[1]
                  ? `${vacancy.salary[0]} - ${vacancy.salary[1]}`
                  : `${vacancy.salary[0]}`
              }`}
              onPress={() =>
                navigation.navigate("InnerVacancySearchScreen", {
                  id: vacancy.id,
                })
              }
            />
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
}
