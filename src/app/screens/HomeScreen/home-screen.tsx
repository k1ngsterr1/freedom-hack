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

export const HomeScreen = () => {
  return (
    <Layout isBottomTab isHeader>
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
