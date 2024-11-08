import React from "react";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { View } from "react-native";

interface UserTypeSelectorProps {
  selectedType: string; // Define the possible options for selectedType
  onSelect: (type: "Работник" | "Работодатель") => void; // Define the onSelect function type
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  selectedType,
  onSelect,
}) => {
  return (
    <View className="flex-row justify-between mb-4">
      {["Работник", "Работодатель"].map((type) => (
        <MyTouchableOpacity
          key={type}
          className={`flex-1 h-12 items-center justify-center rounded-full ${
            selectedType === type ? "bg-primary" : "bg-gray-200"
          } ${type === "Работодатель" ? "ml-2" : "mr-2"}`}
          onPress={() => onSelect(type as "Работник" | "Работодатель")}
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
