import { CVUploadScreen } from "@app/screens/CVScreen/CV-screen";
import { HomeScreen } from "@app/screens/HomeScreen/home-screen";
import { LoginScreen } from "@app/screens/LoginScreen/login-screen";
import { RegistrationScreen } from "@app/screens/RegistrationScreen/registration-screen";
import { EnhancedSettingsScreen } from "@app/screens/SettingsScreen/settings-screen";
import { StartScreen } from "@app/screens/StartScreen/start-screen";
import { TestScreen } from "@app/screens/TestScreen/test-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens

const Stack = createNativeStackNavigator();

export const UserStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Start"
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Test" component={TestScreen} />
    <Stack.Screen name="Settings" component={EnhancedSettingsScreen} />
  </Stack.Navigator>
);
