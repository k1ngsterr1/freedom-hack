import Text from "@shared/ui/Text/text";
import React from "react";
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";

interface ILayout {
  children: React.ReactNode;
  isTab?: boolean;
  isHeader?: boolean;
  isPlan?: boolean;
  isLogo?: boolean;
  isBottomTab?: boolean;
}

export const Layout: React.FC<ILayout> = ({
  children,
  isTab,
  isHeader,
  isLogo,
  isPlan,
  isBottomTab,
}) => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        contentContainerStyle={{ paddingBottom: isTab ? 80 : 0 }}
        className="flex-1 bg-white"
      >
        <View className="w-full flex items-center justify-center mt-12">
          {isLogo && <Text className="text-dark text-xl"></Text>}
        </View>
        <View className="flex flex-col items-center justify-center  px-4">
          {children}
          {isBottomTab && <></>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
