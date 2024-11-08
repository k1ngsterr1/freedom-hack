import { BottomTab } from "@features/ui/BottomTab/bottom-tab";
import { FiltersTabs } from "@features/ui/FiltersTab/filters-tab";
import Text from "@shared/ui/Text/text";
import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { useOpenCloseStore } from "src/entites/FilterTab/model/filter-tab-store";

interface ILayout {
  children: React.ReactNode;
  isTab?: boolean;
  isHeader?: boolean;
  isLogo?: boolean;
  isBottomTab?: boolean;
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
}) => {
  const { isOpen } = useOpenCloseStore();

  return (
    <SafeAreaView className="flex-1">
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
      <View className="flex h-[81vh] flex-col items-center justify-center w-[95%] m-auto mt-16 px-4 pt-3">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: isTab ? 140 : 64, // Increased padding when isTab is true
            flexGrow: 1, // Ensures the ScrollView grows with the content
          }}
          style={{ width: "100%" }} // Ensures the ScrollView takes full width
          showsVerticalScrollIndicator={false} // Optional: hides the scroll indicator for a cleaner look
        >
          {children}
        </ScrollView>
        {isBottomTab && <BottomTab />}
      </View>
      <FiltersTabs
        options={filterOptions}
        onFilterChange={() => console.log("LOL")}
      />
    </SafeAreaView>
  );
};
