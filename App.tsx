import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { RootNavigator } from "@app/navigation/RootNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Use useFonts hook for font loading
  const [fontsLoaded] = useFonts({
    "SF-Pro-Display-Black": require("./assets/fonts/sf-pro-display/SF-Pro-Display-Black.otf"),
    "SF-Pro-Display-BlackItalic": require("./assets/fonts/sf-pro-display/SF-Pro-Display-BlackItalic.otf"),
    "SF-Pro-Display-Bold": require("./assets/fonts/sf-pro-display/SF-Pro-Display-Bold.otf"),
    "SF-Pro-Display-BoldItalic": require("./assets/fonts/sf-pro-display/SF-Pro-Display-BoldItalic.otf"),
    "SF-Pro-Display-Heavy": require("./assets/fonts/sf-pro-display/SF-Pro-Display-Heavy.otf"),
    "SF-Pro-Display-HeavyItalic": require("./assets/fonts/sf-pro-display/SF-Pro-Display-HeavyItalic.otf"),
    "SF-Pro-Display-Light": require("./assets/fonts/sf-pro-display/SF-Pro-Display-Light.otf"),
    "SF-Pro-Display-LightItalic": require("./assets/fonts/sf-pro-display/SF-Pro-Display-LightItalic.otf"),
    "SF-Pro-Display-Medium": require("./assets/fonts/sf-pro-display/SF-Pro-Display-Medium.otf"),
    "SF-Pro-Display-MediumItalic": require("./assets/fonts/sf-pro-display/SF-Pro-Display-MediumItalic.otf"),
    "SF-Pro-Display-Regular": require("./assets/fonts/sf-pro-display/SF-Pro-Display-Regular.otf"),
    "SF-Pro-Display-RegularItalic": require("./assets/fonts/sf-pro-display/SF-Pro-Display-RegularItalic.otf"),
    "SF-Pro-Display-Semibold": require("./assets/fonts/sf-pro-display/SF-Pro-Display-Semibold.otf"),
    "SF-Pro-Display-SemiboldItalic": require("./assets/fonts/sf-pro-display/SF-Pro-Display-SemiboldItalic.otf"),
    "SF-Pro-Display-Thin": require("./assets/fonts/sf-pro-display/SF-Pro-Display-Thin.otf"),
    "SF-Pro-Display-ThinItalic": require("./assets/fonts/sf-pro-display/SF-Pro-Display-ThinItalic.otf"),
    "SF-Pro-Display-Ultralight": require("./assets/fonts/sf-pro-display/SF-Pro-Display-Ultralight.otf"),
    "SF-Pro-Display-UltralightItalic": require("./assets/fonts/sf-pro-display/SF-Pro-Display-UltralightItalic.otf"),
  });

  useEffect(() => {
    const prepareApp = async () => {
      setIsLoading(false);
    };

    prepareApp();
  }, []);

  if (!fontsLoaded) {
    return null; // Add a loader or placeholder if needed
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigator />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
