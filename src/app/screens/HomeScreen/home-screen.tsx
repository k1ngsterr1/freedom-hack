import React, { useState } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";
import { UserTypeSelector } from "@features/ui/UserTypeSelector/user-type-selector";
import { VacancyCard } from "@features/ui/VacancyCard/vacancy-card";
import { useOpenCloseStore } from "src/entites/FilterTab/model/filter-tab-store";
import { vacancies } from "@shared/lib/recommendation-content";
import { CompactHorizontalVacancySwiper } from "@widgets/ui/RecommendationsSwiper/recommendation-swiper";

export const HomeScreen = () => {
  const { isOpen } = useOpenCloseStore();
  const toggleOpenClose = useOpenCloseStore((state) => state.toggleOpenClose);

  return (
    <Layout isBottomTab isHeader isScroll>
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-3xl  mb-4 text-text" weight="bold">
          Рекомеднации
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
          Вакансии
        </Text>
        <MyTouchableOpacity className="text-primary" onPress={toggleOpenClose}>
          {isOpen ? (
            <Feather name="x" size={24} color="#4FB84F" />
          ) : (
            <Feather name="filter" size={24} color="#4FB84F" />
          )}
        </MyTouchableOpacity>
      </View>
      <VacancyCard
        onPress={() => console.log("lol")}
        title="Frontend Developer"
        company="TechCorp"
        location="Москва, Россия"
        salary="120,000 - 180,000 ₽"
        logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL1oD3nncXjZG556ZfoYW1u3rUd0XH8hG3ng&s"
      />
      <VacancyCard
        onPress={() => console.log("lol")}
        title="Frontend Developer"
        company="TechCorp"
        location="Москва, Россия"
        salary="120,000 - 180,000 ₽"
        logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL1oD3nncXjZG556ZfoYW1u3rUd0XH8hG3ng&s"
      />
      <VacancyCard
        onPress={() => console.log("lol")}
        title="Frontend Developer"
        company="TechCorp"
        location="Москва, Россия"
        salary="120,000 - 180,000 ₽"
        logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL1oD3nncXjZG556ZfoYW1u3rUd0XH8hG3ng&s"
      />
    </Layout>
  );
};
