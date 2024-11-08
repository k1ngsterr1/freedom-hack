import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";

export const StartScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation(); // Get the navigation object

  return (
    <Layout isLogo>
      <View className="h-[80vh] relative flex items-center justify-center ">
        <Text>LOL</Text>
      </View>
    </Layout>
  );
};
