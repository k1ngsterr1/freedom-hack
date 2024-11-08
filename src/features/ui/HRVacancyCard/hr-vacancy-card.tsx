import React from "react";
import { View } from "react-native";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";

interface VacancyCardProps {
  title: string;
  salary: string; // Changed to string for consistency with mock data
  company: string;
  location: string;
  onPress: () => void;
}

export const HRVacancyCard: React.FC<VacancyCardProps> = ({
  title,
  salary,
  company,
  location,
  onPress,
}) => {
  return (
    <MyTouchableOpacity
      className="bg-white rounded-xl p-4 mb-4 shadow-sm"
      onPress={onPress}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-text mb-1">{title}</Text>
          <Text className="text-base text-primary font-semibold">{salary}</Text>
        </View>
        <Feather name="bookmark" size={24} color="#045433" />
      </View>
      <View className="flex-row items-center mt-2">
        <Feather name="briefcase" size={16} color="#666" />
        <Text className="text-sm text-secondary ml-2 mr-4">{company}</Text>
        <Feather name="map-pin" size={16} color="#666" />
        <Text className="text-sm text-secondary ml-2">{location}</Text>
      </View>
    </MyTouchableOpacity>
  );
};
