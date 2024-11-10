import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { axiosInstance } from "@shared/lib/hooks/useInterceptor";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";

type VacancyDetailScreenRouteProp = RouteProp<
  { VacancyDetailScreen: { id: number } },
  "VacancyDetailScreen"
>;

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

export default function VacancyDetailScreen() {
  const route = useRoute<VacancyDetailScreenRouteProp>();
  const { id } = route.params;
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<Vacancy>(
          `vacancies/get/${Number(id)}`
        );
        setVacancy(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch vacancy details. Please try again later.");
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [id]);

  if (loading) {
    return (
      <Layout isHeader isBottomTab isNoMarginBottom={true} isBack>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4FB84F" />
          <Text className="mt-4 text-text">Loading vacancy details...</Text>
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

  if (!vacancy) {
    return (
      <Layout isHeader isBottomTab isNoMarginBottom={true} isBack>
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-center">Vacancy not found</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout isHeader isBottomTab isNoMarginBottom={true} isBack>
      <ScrollView className="flex-1 w-full">
        <Text className="text-3xl font-bold text-text mb-2">
          {vacancy.title}
        </Text>
        <Text className="text-xl text-primary mb-4">
          ЕНПФ (Единый накопительный пенсионный фонд)
        </Text>

        <View className="flex-row items-center mb-2">
          <Feather name="map-pin" size={18} color="#045433" />
          <Text className="text-text text-base ml-2">{vacancy.location}</Text>
        </View>

        <View className="flex-row items-center mb-2">
          <Feather name="dollar-sign" size={18} color="#045433" />
          <Text className="text-text text-base ml-2">
            {vacancy.salary[0]} ₸
          </Text>
        </View>

        <View className="flex-row items-center mb-4">
          <Feather name="clock" size={18} color="#045433" />
          <Text className="text-text text-base ml-2">
            {vacancy.employmentType}, {vacancy.formatOfWork.join(", ")}
          </Text>
        </View>

        <Text className="text-lg font-semibold mb-2">О компании:</Text>
        <Text className="text-text mb-4">{vacancy.description}</Text>

        <Text className="text-lg font-semibold mb-2">Обязанности:</Text>
        <Text className="text-text mb-4">{vacancy.task}</Text>

        <Text className="text-lg font-semibold mb-2">Требования:</Text>
        {vacancy.requirements.map((req, index) => (
          <View key={index} className="flex-row items-start mb-2">
            <Feather name="check" size={18} color="#4FB84F" />
            <Text className="text-text ml-2 flex-1">{req}</Text>
          </View>
        ))}

        <Text className="text-lg font-semibold mt-4 mb-2">
          Технические навыки:
        </Text>
        <View className="flex-row flex-wrap">
          {vacancy.hard_skills.map((skill, index) => (
            <View
              key={index}
              className="bg-gray-200 rounded-full px-3 py-1 m-1"
            >
              <Text className="text-text text-sm">{skill}</Text>
            </View>
          ))}
        </View>

        <Text className="text-lg font-semibold mt-4 mb-2">
          Личные качества:
        </Text>
        <View className="flex-row flex-wrap">
          {vacancy.soft_skills.map((skill, index) => (
            <View
              key={index}
              className="bg-gray-200 rounded-full px-3 py-1 m-1"
            >
              <Text className="text-text text-sm">{skill}</Text>
            </View>
          ))}
        </View>

        <Text className="text-lg font-semibold mt-4 mb-2">Мы предлагаем:</Text>
        {vacancy.additional.map((item, index) => (
          <View key={index} className="flex-row items-start mb-2">
            <Feather name="plus" size={18} color="#4FB84F" />
            <Text className="text-text ml-2 flex-1">{item}</Text>
          </View>
        ))}

        <Text className="text-lg font-semibold mt-4 mb-2">Контакты:</Text>
        {vacancy.contacts.map((contact, index) => (
          <Text key={index} className="text-text mb-1">
            {contact}
          </Text>
        ))}

        <Text className="text-sm text-gray-500 mt-4">
          Вакансия опубликована: {vacancy.created_at || "Не указано"}
        </Text>

        <View className="mt-6 mb-24">
          <MyTouchableOpacity
            className="bg-primary rounded-full py-3 px-4 w-full items-center"
            onPress={() => console.log("Apply for vacancy")}
          >
            <Text className="text-white text-base" weight="bold">
              Откликнуться на вакансию
            </Text>
          </MyTouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
}
