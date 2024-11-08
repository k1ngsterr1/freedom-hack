import React from "react";
import { View, ScrollView, Image } from "react-native";
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  applicants: number;
}

interface Stat {
  label: string;
  value: number;
  icon: React.ComponentProps<typeof Feather>["name"];
}

const vacancies: Vacancy[] = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp",
    location: "Москва",
    applicants: 15,
  },
  {
    id: "2",
    title: "UX Designer",
    company: "DesignStudio",
    location: "Санкт-Петербург",
    applicants: 8,
  },
  {
    id: "3",
    title: "Product Manager",
    company: "InnovateCo",
    location: "Казань",
    applicants: 12,
  },
];

const stats: Stat[] = [
  { label: "Активные вакансии", value: 5, icon: "briefcase" },
  { label: "Всего кандидатов", value: 87, icon: "users" },
  { label: "Проведено интервью", value: 32, icon: "phone" },
];

const HRProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleAddVacancy = () => {
    navigation.navigate("AddVacancy" as never); // Navigate to the Login screen
  };

  const handleInnerVacancy = () => {
    navigation.navigate("InnerVacancy" as never); // Navigate to the Login screen
  };

  return (
    <Layout isScroll isHeader isHR isChat>
      <View className="w-full mt-2">
        <View className="flex-row items-center mb-6">
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/women/44.jpg",
            }}
            className="w-20 h-20 rounded-full mr-4"
          />
          <View>
            <Text className="text-2xl font-bold text-text">Анна Смирнова</Text>
            <Text className="text-base text-secondary">HR-менеджер</Text>
          </View>
        </View>

        <View className="flex-row justify-between mb-6">
          {stats.map((stat, index) => (
            <View
              key={index}
              className="items-center bg-white p-3 rounded-xl shadow-sm flex-1 mx-1"
            >
              <Feather name={stat.icon} size={24} color="#4FB84F" />
              <Text className="text-lg font-bold text-text mt-2">
                {stat.value}
              </Text>
              <Text className="text-xs text-secondary text-center">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <View className="mb-6">
          <View className="w-full text-">
            <Text className="text-xl font-bold text-text mb-4" weight="bold">
              Ваши вакансии
            </Text>
          </View>
          {vacancies.map((vacancy) => (
            <MyTouchableOpacity
              key={vacancy.id}
              className="bg-white p-4 rounded-xl shadow-sm mb-3"
              onPress={handleInnerVacancy}
            >
              <Text className="text-lg font-semibold text-text">
                {vacancy.title}
              </Text>
              <Text className="text-sm text-secondary mb-2">
                {vacancy.company}
              </Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Feather name="map-pin" size={14} color="#045433" />
                  <Text className="text-sm text-secondary ml-1">
                    {vacancy.location}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="users" size={14} color="#4FB84F" />
                  <Text className="text-sm text-primary ml-1">
                    {vacancy.applicants} кандидатов
                  </Text>
                </View>
              </View>
            </MyTouchableOpacity>
          ))}
        </View>

        <MyTouchableOpacity
          className="bg-primary py-4 px-6 rounded-full items-center"
          onPress={handleAddVacancy}
        >
          <Text className="text-white text-lg font-semibold">
            Добавить новую вакансию
          </Text>
        </MyTouchableOpacity>
      </View>
    </Layout>
  );
};

export default HRProfileScreen;
