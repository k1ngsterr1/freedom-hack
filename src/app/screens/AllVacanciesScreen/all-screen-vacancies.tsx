import React, { useState } from "react";
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";
import { HRVacancyCard } from "@features/ui/HRVacancyCard/hr-vacancy-card";
import { useNavigation } from "expo-router";

interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
}

const mockVacancies: Vacancy[] = [
  {
    id: 1,
    title: "Senior React Native Developer",
    company: "Tech Co",
    location: "Remote",
    salary: "$120k - $150k",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Design Studio",
    location: "New York",
    salary: "$80k - $100k",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "StartUp Inc",
    location: "San Francisco",
    salary: "$100k - $130k",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Big Corp",
    location: "Chicago",
    salary: "$90k - $120k",
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Cloud Services",
    location: "Remote",
    salary: "$110k - $140k",
    posted: "1 day ago",
  },
];

export const AllScreenVacancies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVacancies, setFilteredVacancies] = useState(mockVacancies);

  const navigation = useNavigation();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockVacancies.filter(
      (vacancy) =>
        vacancy.title.toLowerCase().includes(query.toLowerCase()) ||
        vacancy.company.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVacancies(filtered);
  };

  const handleInnerVacancy = () => {
    navigation.navigate("InnerVacancy" as never); // Navigate to the Login screen
  };

  return (
    <Layout isHeader isBottomTab isScroll>
      <View className="flex-1 w-full">
        <Text className="text-2xl font-bold text-text mb-4">All Vacancies</Text>

        <View className="mb-4">
          <View className="flex-row items-center bg-white rounded-full px-4 py-2">
            <Feather name="search" size={20} color="#045433" />
            <TextInput
              className="flex-1 ml-2 text-text"
              placeholder="Search vacancies"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {filteredVacancies.map((vacancy) => (
            <HRVacancyCard
              key={vacancy.id}
              title={vacancy.title}
              company={vacancy.company}
              location={vacancy.location}
              salary={vacancy.salary}
              onPress={handleInnerVacancy}
            />
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
};
