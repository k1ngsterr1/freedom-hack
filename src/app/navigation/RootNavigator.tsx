import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStack } from "./AuthStack";
import { HRStack } from "./HRStack";
import { UserStack } from "./UserStack";
import { useUserStore } from "src/entites/UserType/model/user-type-store";

export const RootNavigator = () => {
  const routeNameRef = useRef<string | null>(null);
  const navigationRef = useRef<any>(null);

  const { selectedType, setSelectedType } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data and set initial role/authentication
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        const parsedData = data ? JSON.parse(data) : null;

        if (parsedData && parsedData.user) {
          setIsAuthenticated(true);
          setSelectedType(parsedData.user.role);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [setSelectedType]);

  // Watch for changes in selectedType and isAuthenticated
  useEffect(() => {
    if (!isLoading) {
      navigationRef.current?.resetRoot({
        index: 0,
        routes: [
          {
            name: !isAuthenticated
              ? "AuthStack"
              : selectedType === "HR"
              ? "HRStack"
              : "UserStack",
          },
        ],
      });
    }
  }, [selectedType, isAuthenticated, isLoading]);

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

  if (isLoading) {
    return null; // Optionally add a loading spinner here
  }

  return (
    <>
      <StatusBar />
      <NavigationContainer
        ref={navigationRef}
        onStateChange={handleStateChange}
      >
        {!isAuthenticated ? (
          <AuthStack />
        ) : selectedType === "HR" ? (
          <HRStack />
        ) : (
          <UserStack />
        )}
      </NavigationContainer>
    </>
  );
};
