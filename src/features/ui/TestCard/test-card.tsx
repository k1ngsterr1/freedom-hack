import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@shared/ui/Text/text";
import { Ionicons } from "@expo/vector-icons";

interface StyleCardProps {
  styleName: string;
  estimatedTime: number;
  onStartTest: () => void;
}

export const TestCard: React.FC<StyleCardProps> = ({
  styleName,
  estimatedTime,
  onStartTest,
}) => {
  return (
    <View className="bg-white rounded-lg shadow-md w-full p-4 mb-4">
      <Text className="text-xl font-bold mb-2 text-gray-800">{styleName}</Text>

      <View className="flex-row items-center mb-4">
        <Ionicons name="time-outline" size={20} color="#6B7280" />
        <Text className="ml-2 text-gray-600">
          Примерное время: {estimatedTime} мин.
        </Text>
      </View>

      <TouchableOpacity
        onPress={onStartTest}
        className="bg-primary py-3 px-4 rounded-lg flex-row items-center justify-center"
      >
        <Ionicons name="play-circle-outline" size={24} color="white" />
        <Text className="ml-2 text-white font-semibold text-lg">
          Пройти тест
        </Text>
      </TouchableOpacity>
    </View>
  );
};
