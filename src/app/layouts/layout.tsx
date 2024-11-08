import React from "react";
import { SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import { BottomTab } from "@features/ui/BottomTab/bottom-tab";
import { FiltersTabs } from "@features/ui/FiltersTab/filters-tab";
import Text from "@shared/ui/Text/text";
import { useOpenCloseStore } from "src/entites/FilterTab/model/filter-tab-store";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface ILayout {
  children: React.ReactNode;
  isTab?: boolean;
  isHeader?: boolean;
  isLogo?: boolean;
  isBottomTab?: boolean;
  isScroll?: boolean;
  isHR?: boolean;
  isBack?: boolean; // New prop for displaying back button
}

interface FilterOption {
  id: string;
  label: string;
}

const filterOptions: FilterOption[] = [
  { id: "fulltime", label: "Полный день" },
  { id: "parttime", label: "Частичная занятость" },
  { id: "remote", label: "Удаленная работа" },
  { id: "contract", label: "Контракт" },
  { id: "internship", label: "Стажировка" },
];

export const Layout: React.FC<ILayout> = ({
  children,
  isTab,
  isHeader,
  isLogo,
  isBottomTab,
  isScroll = false,
  isHR = false,
  isBack = false,
}) => {
  const navigation = useNavigation();
  const { isOpen } = useOpenCloseStore();

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex items-center justify-center mt-4">
        {isLogo && (
          <Text className="text-text text-xl" weight="regular">
            Freedom <Text className="text-primary">Hire</Text>
          </Text>
        )}
      </View>
      {isHeader && (
        <View className="w-[90%] m-auto flex flex-row items-center justify-between">
          {isBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" size={24} color="#045433" />
            </TouchableOpacity>
          )}
          {!isBack && (
            <View className="bg-primary w-[38px] h-[38px] flex items-center justify-center rounded-lg">
              <Text className="text-white text-xl">F</Text>
            </View>
          )}

          <View className="flex flex-col items-end mt-4">
            <Text className="text-text text-bold text-xl">
              {isHR ? "HR панель" : "Добрый день!"}
            </Text>
            <Text className="text-primary text-base">Ruslan Makhmatov</Text>
          </View>
        </View>
      )}
      <View
        className={`flex h-[81vh] flex-col m-auto ${isScroll ? "mt-8" : ""} ${
          isHR ? "mt-0" : ""
        } px-4 pt-3`}
      >
        {isScroll ? (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: isTab ? 140 : 64,
              flexGrow: 1,
            }}
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View
            style={{
              width: "100%",
              paddingBottom: isTab ? 140 : 64,
              flexGrow: 1,
            }}
            className="flex flex-col items-center justify-center"
          >
            {children}
          </View>
        )}
        {isBottomTab && <BottomTab />}
      </View>
      <FiltersTabs
        options={filterOptions}
        onFilterChange={() => console.log("LOL")}
      />
    </SafeAreaView>
  );
};
