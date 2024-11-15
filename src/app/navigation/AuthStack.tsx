import { CVUploadScreen } from "@app/screens/CVScreen/CV-screen";
import { HomeScreen } from "@app/screens/HomeScreen/home-screen";
import HRProfileScreen from "@app/screens/HRProfileScreen/HR-Profile-Screen";
import { EnhancedLoadingScreen } from "@app/screens/LoadingScreen/loading-screen";
import { LoginScreen } from "@app/screens/LoginScreen/login-screen";
import { RegistrationScreen } from "@app/screens/RegistrationScreen/registration-screen";
import SearchScreen from "@app/screens/SearchScreen/search-screen";
import { StartScreen } from "@app/screens/StartScreen/start-screen";
import { TestScreen } from "@app/screens/TestScreen/test-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens

const Stack = createNativeStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Start"
  >
    <Stack.Screen name="Start" component={StartScreen} />
    <Stack.Screen name="Registration" component={RegistrationScreen} />
    <Stack.Screen name="CVScreen" component={CVUploadScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Loading" component={EnhancedLoadingScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Test" component={TestScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
  </Stack.Navigator>
);
