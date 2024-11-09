import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import { axiosInstance } from "@shared/lib/hooks/useInterceptor";
import { Ionicons } from "@expo/vector-icons";
import { CandidateCard } from "@features/ui/CandidateCard/candidate-card";

interface Vacancy {
  id: string;
  position: string;
  location: string;
  salary: number[];
  experience: number;
  formatOfWork: string;
  employmentType: string;
  summary: string;
  hard_skills: string[];
  soft_skills: string[];
  work_experience: string[];
  additional: string[];
  contacts: string[];
}

export const RecommendedVacanciesScreen = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleContactCandidate = (candidateId: string) => {
    console.log(`Contacting candidate with ID: ${candidateId}`);
    // Implement the actual contact functionality here
  };

  useEffect(() => {
    const getVacancies = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`vacancies/recommend/6`);
        setVacancies(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(
          "Failed to fetch recommended vacancies. Please try again later."
        );
        setLoading(false);
      }
    };

    getVacancies();
  }, []);

  if (loading) {
    return (
      <Layout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4FB84F" />
          <Text className="mt-4 text-gray-600">
            Загрузка рекомендуемых вакансий...
          </Text>
        </View>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <View className="flex-1 justify-center items-center">
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text className="mt-4 text-red-500 text-center">{error}</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout isBack isScroll isHeader isChat isNoMarginBottom>
      <View className="flex-1">
        <Text className="text-2xl mb-4 text-text" weight="bold">
          Рекомендованные вакансии
        </Text>
        <FlatList
          data={vacancies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CandidateCard
              position={item.position}
              location={item.location}
              salary={item.salary}
              experience={item.experience}
              formatOfWork={item.formatOfWork}
              employmentType={item.employmentType}
              summary={item.summary}
              hard_skills={item.hard_skills}
              soft_skills={item.soft_skills}
              work_experience={item.work_experience}
              additional={item.additional}
              contacts={item.contacts}
              onContact={() => handleContactCandidate(item.id)}
            />
          )}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center">
              <Ionicons name="document-outline" size={48} color="#9CA3AF" />
              <Text className="mt-4 text-gray-500 text-center">
                Не найдено ни одной рекомендуемой вакансии.
              </Text>
            </View>
          }
        />
      </View>
    </Layout>
  );
};
