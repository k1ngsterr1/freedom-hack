import React, { useState } from "react";
import { View, Switch } from "react-native";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Animated, {
  FadeInDown,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserData } from "@shared/lib/hooks/useUserData";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "kk", name: "Қазақша", flag: "🇰🇿" },
];

export const EnhancedSettingsScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/men/1.jpg"
  );
  const { userData } = useUserData();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const imageScale = useSharedValue(1);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: imageScale.value }],
    };
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
      imageScale.value = withSpring(1.2, {}, () => {
        imageScale.value = withSpring(1);
      });
    }
  };

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared, user logged out.");
    } catch (error) {
      console.error("Error clearing AsyncStorage during logout:", error);
    }
  };

  const renderLanguageOption = (
    lang: { code: string; name: string; flag: string },
    index: number
  ) => (
    <Animated.View
      key={lang.code}
      entering={FadeInRight.delay(index * 100).duration(400)}
    >
      <MyTouchableOpacity
        className={`flex-row items-center justify-between p-4 border-b border-gray-200 ${
          selectedLanguage === lang.code ? "bg-[#4FB84F] bg-opacity-10" : ""
        }`}
        onPress={() => setSelectedLanguage(lang.code)}
      >
        <View className="flex-row items-center">
          <Text className="text-2xl mr-3">{lang.flag}</Text>
          <Text
            className={`text-lg ${
              selectedLanguage === lang.code ? "text-white" : "text-black"
            }`}
          >
            {lang.name}
          </Text>
        </View>
        {selectedLanguage === lang.code && (
          <Feather
            name="check"
            size={20}
            color={selectedLanguage === lang.code ? "#FFFFFF" : "#045433"}
          />
        )}
      </MyTouchableOpacity>
    </Animated.View>
  );

  return (
    <Layout isHeader isBottomTab isScroll isBack>
      <View className="flex-1 w-full">
        <View className=" pt-12 pb-20 rounded-b-3xl">
          <Animated.View
            className="items-center"
            entering={FadeInDown.duration(600)}
          >
            <MyTouchableOpacity onPress={pickImage}>
              <Animated.Image
                source={{ uri: profileImage }}
                className="w-32 h-32 rounded-full border-4 border-white"
                style={animatedImageStyle}
              />
              <View className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md">
                <Feather name="camera" size={20} color="#045433" />
              </View>
            </MyTouchableOpacity>
            <Text className="text-2xl font-bold text-primary mt-4">
              {userData?.username}
            </Text>
            <Text className="text-base text-primary">{userData?.email}</Text>
          </Animated.View>
        </View>
        <View className="">
          <Animated.View
            className="bg-white rounded-2xl shadow-md overflow-hidden mb-6"
            entering={FadeInDown.delay(300).duration(600)}
          >
            <View className="p-4 border-b border-gray-200">
              <Text className="text-xl font-semibold text-gray-800">
                Language
              </Text>
            </View>
            {languages.map(renderLanguageOption)}
          </Animated.View>

          <Animated.View
            className="bg-white rounded-2xl shadow-md overflow-hidden mb-6"
            entering={FadeInDown.delay(450).duration(600)}
          >
            <View className="p-4 border-b border-gray-200">
              <Text className="text-xl font-semibold text-gray-800">
                Preferences
              </Text>
            </View>
            <View className="p-4 flex-row justify-between items-center">
              <Text className="text-lg text-gray-800">Dark Mode</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#4FB84F" }}
                thumbColor={isDarkMode ? "#045433" : "#4FB84F"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsDarkMode}
                value={isDarkMode}
              />
            </View>
            <View className="p-4 flex-row justify-between items-center border-t border-gray-200">
              <Text className="text-lg text-gray-800">Notifications</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#4FB84F" }}
                thumbColor={isNotificationsEnabled ? "#045433" : "#4FB84F"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsNotificationsEnabled}
                value={isNotificationsEnabled}
              />
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).duration(600)}>
            <MyTouchableOpacity
              className="bg-red-500 py-4 px-6 rounded-xl items-center shadow-md mb-8"
              onPress={handleLogout}
            >
              <Text className="text-white font-bold text-lg">Logout</Text>
            </MyTouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </Layout>
  );
};
