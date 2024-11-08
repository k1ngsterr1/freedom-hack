import React from "react";
import { View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";

interface VacancyCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  logoUrl: string;
  onPress: () => void;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({
  title,
  company,
  location,
  salary,
  logoUrl,
  onPress,
}) => {
  return (
    <MyTouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-4 shadow-md w-full"
      accessibilityRole="button"
      accessibilityLabel={`Vacancy for ${title} at ${company}`}
    >
      <View className="flex-row items-center mb-3">
        <Image
          source={{ uri: logoUrl }}
          className="w-12 h-12 rounded-full mr-3"
          accessibilityIgnoresInvertColors
        />
        <View className="flex-1">
          <Text className="text-text text-lg" weight="bold" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-secondary text-sm" weight="medium">
            {company}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center mb-2">
        <Feather name="map-pin" size={16} color="#045433" className="mr-2" />
        <Text className="text-text text-sm" weight="regular">
          {location}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Feather
          name="dollar-sign"
          size={16}
          color="#045433"
          className="mr-2"
        />
        <Text className="text-text text-sm" weight="regular">
          {salary}
        </Text>
      </View>
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
    </MyTouchableOpacity>
  );
};
