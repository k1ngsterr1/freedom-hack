import AddVacancyScreen from "@app/screens/AddVacancyScreen/add-vacancy-screen";
import { HomeScreen } from "@app/screens/HomeScreen/home-screen";
import HRProfileScreen from "@app/screens/HRProfileScreen/HR-Profile-Screen";
import { LoginScreen } from "@app/screens/LoginScreen/login-screen";
import { RegistrationScreen } from "@app/screens/RegistrationScreen/registration-screen";
import { StartScreen } from "@app/screens/StartScreen/start-screen";
import { TestScreen } from "@app/screens/TestScreen/test-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens

const Stack = createNativeStackNavigator();

export const HRStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="HRProfile"
  >
    <Stack.Screen name="HRProfile" component={HRProfileScreen} />
    <Stack.Screen name="AddVacancy" component={AddVacancyScreen} />
  </Stack.Navigator>
);
