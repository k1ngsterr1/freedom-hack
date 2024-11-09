import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import { vacancies } from "@shared/lib/recommendation-content";
import { CompactHorizontalVacancySwiper } from "@widgets/ui/RecommendationsSwiper/recommendation-swiper";
import { TestCard } from "@features/ui/TestCard/test-card";

const tests = [
  {
    id: "1",
    name: "Оценка рабочего стиля",
    estimatedTime: 20,
    screen: "WorkStyleTest",
  },
  {
    id: "2",
    name: "Тест на тип личности",
    estimatedTime: 15,
    screen: "PersonalityTest",
  },

  {
    id: "3",
    name: "Анализ профессиональных навыков",
    estimatedTime: 25,
    screen: "SkillsAnalysisTest",
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation();

  const handleStartTest = (screen: string) => {
    navigation.navigate(screen as never);
  };

  return (
    <Layout isBottomTab isHeader isScroll>
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-3xl mb-4 text-text" weight="bold">
          Рекомендации
        </Text>
      </View>
      <CompactHorizontalVacancySwiper vacancies={vacancies} />
      <View className="flex flex-row justify-between items-start w-full mt-6">
        <Text className="text-3xl mb-4 text-text" weight="bold">
          Тесты
        </Text>
      </View>
      <View className="mb-10">
        {tests.map((test) => (
          <View key={test.id} className="w-full">
            <TestCard
              styleName={test.name}
              estimatedTime={test.estimatedTime}
              onStartTest={() => handleStartTest(test.screen as never)}
            />
          </View>
        ))}
      </View>
    </Layout>
  );
};
