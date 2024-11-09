import React from "react";
import { View } from "react-native";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { useUserStore } from "src/entites/UserType/model/user-type-store";

export const UserTypeSelector = () => {
  const selectedType = useUserStore((state) => state.selectedType); // Получаем выбранный тип из хранилища
  const setSelectedType = useUserStore((state) => state.setSelectedType); // Функция для обновления выбранного типа

  // Mapping for display text to internal values
  const typeMapping = {
    Работник: "User",
    Работодатель: "HR",
  } as const;

  return (
    <View className="flex-row justify-between mb-4">
      {Object.keys(typeMapping).map((type) => (
        <MyTouchableOpacity
          key={type}
          className={`flex-1 h-12 items-center justify-center rounded-full ${
            selectedType === typeMapping[type] ? "bg-primary" : "bg-gray-200"
          } ${type === "Работодатель" ? "ml-2" : "mr-2"}`}
          onPress={() => setSelectedType(typeMapping[type])}
        >
          <Text
            className={`text-base ${
              selectedType === typeMapping[type] ? "text-white" : "text-text"
            }`}
            weight={selectedType === typeMapping[type] ? "bold" : "regular"}
          >
            {type}
          </Text>
        </MyTouchableOpacity>
      ))}
    </View>
  );
};
