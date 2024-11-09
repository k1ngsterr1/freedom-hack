import { NavigationContainer } from "@react-navigation/native";
import React, { useRef } from "react";
import { StatusBar } from "react-native";
import { AuthStack } from "./AuthStack";
import { HRStack } from "./HRStack"; // Import HRStack component
import { useUserStore } from "src/entites/UserType/model/user-type-store";

export const RootNavigator = () => {
  const routeNameRef = useRef<string | null>(null);
  const navigationRef = useRef<any>(null);

  const { selectedType } = useUserStore(); // Access selectedType from the store

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
        {selectedType === "HR" ? <HRStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};
