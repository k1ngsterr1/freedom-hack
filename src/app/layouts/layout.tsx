import { BottomTab } from "@features/ui/BottomTab/bottom-tab";
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
        className="flex-1 bg-white h-[100vh]  "
      >
        <View className="w-full flex items-center justify-center mt-12">
          {isLogo && (
            <Text className="text-text text-xl" weight="regular">
              Freedom <Text className="text-primary">Hire</Text>
            </Text>
          )}
        </View>
        {isHeader && (
          <View className="w-[90%] m-auto flex flex-row items-center justify-between">
            <View className="bg-primary w-[38px] h-[38px] flex items-center justify-center rounded-lg">
              <Text className="text-white text-xl">F</Text>
            </View>
            <View className="flex flex-col items-end">
              <Text className="text-text text-bold text-2xl">Добрый день!</Text>
              <Text className="text-primary text-base">Ruslan Makhmatov</Text>
            </View>
          </View>
        )}
        <View className="flex h-[81vh]  flex-col items-center justify-center w-[95%] m-auto px-4 ">
          {children}
          {isBottomTab && <BottomTab />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
