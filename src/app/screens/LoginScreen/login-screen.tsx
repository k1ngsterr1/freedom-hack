import React, { useState } from "react";
import { View, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login" as never); // Navigate to the Login screen
  };

  const handleHome = () => {
    navigation.navigate("Home" as never); // Navigate to the Login screen
  };

  const handleRegistration = () => {
    navigation.navigate("Registration" as never); // Navigate to the Login screen
  };

  return (
    <Layout isLogo>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center p-5"
      >
        <View className="mt-32 rounded-3xl ">
          <Text className="text-text text-3xl text-center mb-8" weight="bold">
            Войти в{" "}
            <Text className="text-primary" weight="bold">
              Freedom Hire
            </Text>
          </Text>

          <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-3">
            <Feather name="mail" size={16} color="#045433" className="mr-2" />
            <TextInput
              className="flex-1 h-12 text-text mb-[5px] ml-2 text-base "
              placeholder="Электронная почта"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-3">
            <Feather name="lock" size={16} color="#045433" className="mr2" />
            <TextInput
              className="flex-1 h-12 ml-2 mb-[5px] text-text text-base"
              placeholder="Пароль"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <MyTouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#045433"
              />
            </MyTouchableOpacity>
          </View>

          <MyTouchableOpacity
            className="w-full h-[50px] items-center justify-center rounded-full bg-primary mt-6"
            onPress={handleHome}
          >
            <Text className="text-lg text-white" weight="bold">
              Войти
            </Text>
          </MyTouchableOpacity>

          <MyTouchableOpacity
            className="mt-4"
            onPress={() => {
              /* Navigate to forgot password screen */
            }}
          >
            <Text className="text-secondary text-base text-center">
              Забыли пароль?
            </Text>
          </MyTouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-5">
          <Text className="text-text text-base">Нет аккаунта? </Text>
          <MyTouchableOpacity onPress={handleRegistration}>
            <Text className="text-primary text-base" weight="bold">
              Зарегистрироваться
            </Text>
          </MyTouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};
