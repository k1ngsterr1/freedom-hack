import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";
import { useLogin } from "@shared/lib/hooks/useLogin";
import { useUserStore } from "src/entites/UserType/model/user-type-store";

export const LoginScreen = () => {
  const {
    login,
    setLogin,
    isLogged,
    password,
    setPassword,
    error,
    loginFunction,
  } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { selectedType } = useUserStore();

  useEffect(() => {
    if (selectedType === "HR") {
      navigation.navigate("HRProfile" as never);
    } else if (selectedType) {
      navigation.navigate("Home" as never);
    }
  }, [isLogged]);

  const handleLogin = async () => {
    await loginFunction();
  };

  const handleRegistrationNavigation = () => {
    navigation.navigate("Registration" as never);
  };

  return (
    <Layout isLogo>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center p-5"
      >
        <View className="mt-32 rounded-3xl">
          <Text className="text-text text-3xl text-center mb-8" weight="bold">
            Войти в{" "}
            <Text className="text-primary" weight="bold">
              Freedom Hire
            </Text>
          </Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-3">
            <Feather name="mail" size={16} color="#045433" />
            <TextInput
              className="flex-1 h-12 text-text mb-[5px] ml-2 text-base"
              placeholder="Электронная почта"
              placeholderTextColor="#6B7280"
              value={login}
              onChangeText={setLogin}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-3">
            <Feather name="lock" size={16} color="#045433" />
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

          {error ? (
            <Text className="text-red-500 text-center mb-4">{error}</Text>
          ) : null}

          <MyTouchableOpacity
            className="w-full h-[50px] items-center justify-center rounded-full bg-primary mt-6"
            onPress={handleLogin}
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
          <MyTouchableOpacity onPress={handleRegistrationNavigation}>
            <Text className="text-primary text-base" weight="bold">
              Зарегистрироваться
            </Text>
          </MyTouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};
