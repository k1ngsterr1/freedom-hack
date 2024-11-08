import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import StartIllustration from "@shared/illustrations/start-illustration";

export const StartScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation(); // Get the navigation object

  const handlePress = () => {
    navigation.navigate("Login" as never);
  };

  return (
    <Layout isLogo>
      <View className="h-[80vh] relative flex items-center justify-center ">
        <StartIllustration />
        <Text className="text-text text-3xl text-center mt-8" weight="bold">
          Добро пожаловать в{" "}
          <Text className="text-primary" weight="bold">
            Freedom Hire!
          </Text>
        </Text>
        <Text className="text-text text-base text-center mt-4" weight="regular">
          Откройте мир талантов и найдите идеального кандидата для своей
          команды!
        </Text>
        <MyTouchableOpacity
          className="w-[280px] h-[50px] items-center justify-center rounded-full bg-primary text-white mt-8"
          onPress={handlePress} // Add the onPress handler
        >
          <Text className="text-lg text-white ">Начать</Text>
        </MyTouchableOpacity>
      </View>
    </Layout>
  );
};
