import React, { useState } from "react";
import { View, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";
import { UserTypeSelector } from "@features/ui/UserTypeSelector/user-type-selector";
import { useCreateAccount } from "@shared/lib/hooks/useCreateAccount";

export const RegistrationScreen = () => {
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    registerAccount,
  } = useCreateAccount();
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLoginNavigation = () => {
    navigation.navigate("Login" as never);
  };

  return (
    <Layout isLogo>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 w-full"
      >
        <View
          style={{
            width: "100%",
            flexGrow: 1,
            justifyContent: "center",
            padding: 5,
          }}
        >
          <View className="w-[320px] m-auto mt-32 rounded-3xl">
            <Text
              className="w-full text-text text-3xl text-center mb-8"
              weight="bold"
            >
              Регистрация в{" "}
              <Text className="text-primary" weight="bold">
                Freedom Hire
              </Text>
            </Text>
            <UserTypeSelector />
            <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-3">
              <Feather name="user" size={16} color="#045433" className="mr-2" />
              <TextInput
                className="flex-1 h-12 text-text mb-[5px] ml-2 text-base"
                placeholder="Полное имя"
                placeholderTextColor="#6B7280"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
            <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-3">
              <Feather name="mail" size={16} color="#045433" className="mr-2" />
              <TextInput
                className="flex-1 h-12 text-text mb-[5px] ml-2 text-base"
                placeholder="Электронная почта"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-3">
              <Feather name="lock" size={16} color="#045433" className="mr-2" />
              <TextInput
                className="flex-1 h-12 ml-2 mb-[5px] text-text text-base"
                placeholder="Пароль"
                placeholderTextColor="#6B7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <MyTouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#045433"
                />
              </MyTouchableOpacity>
            </View>

            <View className="flex-row items-center border border-gray-200 rounded-xl mb-4 px-3">
              <Feather name="lock" size={16} color="#045433" className="mr-2" />
              <TextInput
                className="flex-1 h-12 ml-2 mb-[5px] text-text text-base"
                placeholder="Подтвердите пароль"
                placeholderTextColor="#6B7280"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <MyTouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#045433"
                />
              </MyTouchableOpacity>
            </View>

            {/* Display error message */}
            {error ? (
              <Text className="text-red-500 text-center mb-4">{error}</Text>
            ) : null}

            <MyTouchableOpacity
              className="w-full h-[50px] items-center justify-center rounded-full bg-primary mt-6"
              onPress={registerAccount}
            >
              <Text className="text-lg text-white" weight="bold">
                Зарегистрироваться
              </Text>
            </MyTouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-center mt-16">
          <Text className="text-text text-base">Уже есть аккаунт? </Text>
          <MyTouchableOpacity
            onPress={() => {
              navigation.navigate("Login" as never);
            }}
          >
            <Text className="text-primary text-base" weight="bold">
              Войти
            </Text>
          </MyTouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};
