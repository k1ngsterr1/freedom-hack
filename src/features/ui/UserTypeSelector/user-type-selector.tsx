import React from "react";
import { View } from "react-native";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { useUserStore } from "src/entites/model/user-type-store";

export const UserTypeSelector = () => {
  const selectedType = useUserStore((state) => state.selectedType); // Получаем выбранный тип из хранилища
  const setSelectedType = useUserStore((state) => state.setSelectedType); // Функция для обновления выбранного типа

  return (
    <View className="flex-row justify-between mb-4">
      {["Работник", "Работодатель"].map((type) => (
        <MyTouchableOpacity
          key={type}
          className={`flex-1 h-12 items-center justify-center rounded-full ${
            selectedType === type ? "bg-primary" : "bg-gray-200"
          } ${type === "Работодатель" ? "ml-2" : "mr-2"}`}
          onPress={() => setSelectedType(type as "Работник" | "Работодатель")}
        >
          <Text
            className={`text-base ${
              selectedType === type ? "text-white" : "text-text"
            }`}
            weight={selectedType === type ? "bold" : "regular"}
          >
            {type}
          </Text>
        </MyTouchableOpacity>
      ))}
    </View>
  );
};
