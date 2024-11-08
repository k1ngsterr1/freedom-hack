import { NavigationContainer } from "@react-navigation/native";
import React, { useRef } from "react";
import { StatusBar } from "react-native";
import { AuthStack } from "./AuthStack";

export const RootNavigator = () => {
  const routeNameRef = useRef<string | null>(null);
  const navigationRef = useRef<any>(null);

  const handleStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute?.()?.name;

    if (previousRouteName !== currentRouteName) {
      console.log(
        `Navigation from ${previousRouteName} to ${currentRouteName}`
      );
    }

    routeNameRef.current = currentRouteName;
  };

  return (
    <>
      <StatusBar />
      <NavigationContainer
        ref={navigationRef}
        onStateChange={handleStateChange}
      >
        <AuthStack />
      </NavigationContainer>
    </>
  );
};
