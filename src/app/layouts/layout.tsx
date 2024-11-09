import React from "react";
import { SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import { BottomTab } from "@features/ui/BottomTab/bottom-tab";
import { FiltersTabs } from "@features/ui/FiltersTab/filters-tab";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import { VacancyFilterPanel } from "@features/ui/VacancyFilterTab/vacancy-filter-tab";
import { useUserData } from "@shared/lib/hooks/useUserData";

interface ILayout {
  children: React.ReactNode;
  isTab?: boolean;
  isHeader?: boolean;
  isLogo?: boolean;
  isBottomTab?: boolean;
  isScroll?: boolean;
  isHR?: boolean;
  isChat?: boolean;
  isBack?: boolean;
  isNoMarginBottom?: boolean;
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
  isNoMarginBottom = false,
  isBottomTab,
  isScroll = false,
  isHR = false,
  isBack = false,
  isChat = false,
}) => {
  const { userData } = useUserData();
  const navigation = useNavigation();

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
        <View
          className={`w-[90%]  m-auto flex flex-row items-center justify-between ${
            !isBack && "flex-row-reverse"
          } `}
        >
          {isBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" size={32} color="#045433" />
            </TouchableOpacity>
          )}
          {!isBack && (
            <MyTouchableOpacity
              onPress={() => navigation.navigate("AllChatsScreen" as never)}
            >
              <Feather name="message-circle" size={32} color="#045433" />
            </MyTouchableOpacity>
          )}
          <View
            className={`flex flex-col ${!isBack ? "items-start" : "items-end"}`}
          >
            <Text className="text-text text-bold text-2xl">
              {isChat ? (
                <MyTouchableOpacity
                  onPress={() => navigation.navigate("AllChatsScreen" as never)}
                >
                  <Feather name="message-circle" size={32} color="#045433" />
                </MyTouchableOpacity>
              ) : isHR ? (
                "HR панель"
              ) : (
                "Добрый день!"
              )}
            </Text>
            {!isChat && (
              <Text className="text-primary text-base">
                {userData?.username}
              </Text>
            )}
          </View>
        </View>
      )}
      <View
        className={`w-full  flex h-[81vh] flex-col m-auto ${
          isScroll ? "mt-8" : ""
        } ${isHR ? "mt-0" : ""} px-4 pt-3`}
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
              paddingBottom: isNoMarginBottom ? 0 : isTab ? 140 : 64,
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
      <VacancyFilterPanel />
    </SafeAreaView>
  );
};
