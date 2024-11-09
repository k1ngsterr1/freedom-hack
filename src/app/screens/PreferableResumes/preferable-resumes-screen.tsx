import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import { Ionicons } from "@expo/vector-icons";
import { useVacancyStore } from "src/entites/FilterTab/model/filter-tab-store";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import { useNavigation } from "@react-navigation/native";

interface SearchResult {
  id: string;
  name: string;
  position: string;
  experience: number;
  value: number;
  createdAt: Date;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    name: "Анна Смирнова",
    position: "Frontend Developer",
    experience: 5,
    value: 85,
    createdAt: new Date("2023-05-15"),
  },
  {
    id: "2",
    name: "Иван Петров",
    position: "Backend Developer",
    experience: 3,
    value: 75,
    createdAt: new Date("2023-05-10"),
  },
  {
    id: "3",
    name: "Мария Иванова",
    position: "UX Designer",
    experience: 7,
    value: 90,
    createdAt: new Date("2023-05-05"),
  },
  {
    id: "4",
    name: "Алексей Сидоров",
    position: "DevOps Engineer",
    experience: 4,
    value: 80,
    createdAt: new Date("2023-05-01"),
  },
];

type SortOption = "mostValuable" | "leastValuable" | "newest" | "oldest";

export default function PreferableResumesScreen() {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("mostValuable");
  const [results, setResults] = useState<SearchResult[]>(mockResults);
  const { toggleOpenClose } = useVacancyStore();

  const handleSearch = () => {
    let filteredResults = mockResults.filter(
      (result) =>
        result.name.toLowerCase().includes(keyword.toLowerCase()) ||
        result.position.toLowerCase().includes(keyword.toLowerCase())
    );

    switch (sortBy) {
      case "newest":
        filteredResults.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        break;
      case "oldest":
        filteredResults.sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        );
        break;
      case "mostValuable":
        filteredResults.sort((a, b) => b.value - a.value);
        break;
      case "leastValuable":
        filteredResults.sort((a, b) => a.value - b.value);
        break;
    }

    setResults(filteredResults);
  };

  const renderSortButton = (option: SortOption, label: string) => (
    <TouchableOpacity
      onPress={() => {
        setSortBy(option);
        handleSearch();
      }}
      className={`px-3 py-2 rounded-full mr-2 ${
        sortBy === option ? "bg-primary" : "bg-gray-200"
      }`}
    >
      <Text className={sortBy === option ? "text-white" : "text-gray-600"}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderResultItem = ({ item }: { item: SearchResult }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow">
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text className="text-gray-600">{item.position}</Text>
      <View className="flex-row justify-between mt-2">
        <Text className="text-gray-500">Опыт: {item.experience} лет</Text>
        <Text className="text-gray-500">Ценность: {item.value}%</Text>
      </View>
    </View>
  );

  return (
    <Layout isHeader isNoMarginBottom={true} isBack>
      <View className="flex-1 w-full mt-4">
        <View className="flex-row items-center mb-4">
          <TextInput
            className="flex-1 bg-gray-200 rounded-full px-4 py-3.5 mr-2"
            placeholder="Поиск по ключевым словам..."
            value={keyword}
            onChangeText={setKeyword}
          />
          <MyTouchableOpacity
            onPress={handleSearch}
            className="bg-primary rounded-full p-2"
          >
            <Ionicons name="search" size={24} color="white" />
          </MyTouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row">
            {renderSortButton("mostValuable", "Самые ценные")}
            {renderSortButton("leastValuable", "Менее ценные")}
          </View>
          <MyTouchableOpacity
            onPress={() => toggleOpenClose()}
            className="bg-gray-200 rounded-full p-2"
          >
            <Ionicons name="options" size={24} color="black" />
          </MyTouchableOpacity>
        </View>
        <ScrollView>
          <MyTouchableOpacity
            onPress={() => navigation.navigate("CandidateScreen" as never)}
          >
            <FlatList
              data={results}
              renderItem={renderResultItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text className="text-center text-gray-500 mt-4">
                  Результаты не найдены
                </Text>
              }
            />
          </MyTouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
}
