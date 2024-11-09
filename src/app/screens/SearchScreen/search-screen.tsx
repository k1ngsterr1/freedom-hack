import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Layout } from "@app/layouts/layout";
import { Ionicons } from "@expo/vector-icons";
import { useUserStackStore } from "src/entites/FilterTab/model/filter-tab-store";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import { useNavigation } from "@react-navigation/native";
import { VacancyCard } from "@features/ui/VacancyCard/vacancy-card";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");
  const { toggleOpenClose } = useUserStackStore();

  return (
    <Layout isHeader isNoMarginBottom={true} isBack>
      <View className="flex-1 w-full mt-4">
        <View className="flex-row items-center mb-4">
          <TextInput
            className="flex-1 bg-gray-200 rounded-full px-4 py-3.5 mr-2"
            placeholder="Поиск"
            value={keyword}
            onChangeText={setKeyword}
          />
          <MyTouchableOpacity className="bg-primary rounded-full p-2">
            <Ionicons name="search" size={24} color="white" />
          </MyTouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between mb-4">
          {/* <View className="flex-row">
            {renderSortButton("mostValuable", "Самые ценные")}
            {renderSortButton("leastValuable", "Менее ценные")}
          </View> */}

          <MyTouchableOpacity
            className="  bg-gray-200 rounded-full p-2"
            onPress={toggleOpenClose}
          >
            <Ionicons name="options" size={24} color="black" />
          </MyTouchableOpacity>
        </View>
        <VacancyCard
          onPress={() => console.log("lol")}
          title="Frontend Developer"
          company="TechCorp"
          location="Москва, Россия"
          salary="120,000 - 180,000 ₽"
          logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL1oD3nncXjZG556ZfoYW1u3rUd0XH8hG3ng&s"
        />
        <VacancyCard
          onPress={() => console.log("lol")}
          title="Frontend Developer"
          company="TechCorp"
          location="Москва, Россия"
          salary="120,000 - 180,000 ₽"
          logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL1oD3nncXjZG556ZfoYW1u3rUd0XH8hG3ng&s"
        />
        <VacancyCard
          onPress={() => console.log("lol")}
          title="Frontend Developer"
          company="TechCorp"
          location="Москва, Россия"
          salary="120,000 - 180,000 ₽"
          logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL1oD3nncXjZG556ZfoYW1u3rUd0XH8hG3ng&s"
        />
      </View>
    </Layout>
  );
}
