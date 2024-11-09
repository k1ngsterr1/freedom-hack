import React from "react";
import { View } from "react-native";
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { VacancyCard } from "@features/ui/VacancyCard/vacancy-card";
import { vacancies } from "@shared/lib/recommendation-content";
import { CompactHorizontalVacancySwiper } from "@widgets/ui/RecommendationsSwiper/recommendation-swiper";

export const HomeScreen = () => {
  return (
    <Layout isBottomTab isHeader isScroll>
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-3xl  mb-4 text-text" weight="bold">
          Рекомендации
        </Text>
        <MyTouchableOpacity className="text-primary">
          <Text className="text-base  mb-4 text-primary" weight="light">
            Смотреть все
          </Text>
        </MyTouchableOpacity>
      </View>
      <CompactHorizontalVacancySwiper vacancies={vacancies} />
      <View className="flex flex-row justify-between items-start w-full">
        <Text className="text-3xl  mb-4 text-text" weight="bold">
          Тесты
        </Text>
      </View>
    </Layout>
  );
};
