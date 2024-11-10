import React from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";

interface VacancyCardProps {
  id: number;
  title: string;
  company?: string;
  location: string;
  salary: string;
  employmentType: string;
  formatOfWork: string[];
  onPress: () => void;
  created_at: string;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({
  title,
  company,
  location,
  salary,
  employmentType,
  created_at,
  formatOfWork,
  onPress,
}) => {
  return (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-md w-full">
      <View className="flex-row items-center mb-3">
        <View className="flex-1">
          <Text className="text-text text-lg" weight="bold">
            {title}
          </Text>
          <Text className="text-secondary text-sm" weight="medium">
            {company}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center mb-2">
        <Feather name="map-pin" size={16} color="#045433" className="mr-2" />
        <Text className="text-text text-sm ml-1" weight="regular">
          {location}
        </Text>
      </View>
      <View className="flex-row items-center mb-2">
        <Feather
          name="dollar-sign"
          size={16}
          color="#045433"
          className="mr-2"
        />
        <Text className="text-text text-sm" weight="regular">
          {salary} ₸
        </Text>
      </View>
      <View className="flex-row items-center">
        <Feather name="clock" size={16} color="#045433" className="mr-2" />
        <Text className="text-text text-sm ml-1" weight="regular">
          {employmentType}, {formatOfWork}
        </Text>
      </View>
      {created_at && (
        <View className="flex-row items-center mt-2">
          <Text className="text-gray-300 text-sm" weight="regular">
            {created_at}
          </Text>
        </View>
      )}
      <View className="mt-3 border-t border-gray-200 pt-3">
        <MyTouchableOpacity
          className="bg-primary rounded-full py-2 px-4 w-full items-center"
          onPress={onPress}
        >
          <Text className="text-white text-sm" weight="bold">
            Подробнее
          </Text>
        </MyTouchableOpacity>
      </View>
    </View>
  );
};
