// Import all necessary screens
import { CVUploadScreen } from "@app/screens/CVScreen/CV-screen";
import { HomeScreen } from "@app/screens/HomeScreen/home-screen";
import HRProfileScreen from "@app/screens/HRProfileScreen/HR-Profile-Screen";
import { EnhancedLoadingScreen } from "@app/screens/LoadingScreen/loading-screen";
import { LoginScreen } from "@app/screens/LoginScreen/login-screen";
import { RegistrationScreen } from "@app/screens/RegistrationScreen/registration-screen";
import SearchScreen from "@app/screens/SearchScreen/search-screen";
import { StartScreen } from "@app/screens/StartScreen/start-screen";
import { EnhancedSettingsScreen } from "@app/screens/SettingsScreen/settings-screen";
import AddVacancyScreen from "@app/screens/AddVacancyScreen/add-vacancy-screen";
import AllChatsScreen from "@app/screens/AllChatsScreen/all-chats-screen";
import { AllScreenVacancies } from "@app/screens/AllVacanciesScreen/all-screen-vacancies";
import CandidateScreen from "@app/screens/CandidateScreen/candidate-screen";
import ChatScreen from "@app/screens/ChatScreen/chat-screen";
import InnerVacancyScreen from "@app/screens/InnerVacancyScreen/inner-vacancy-screen";
import { ResumeRecommendationScreen } from "@app/screens/ResumeRecommendations/resume-recommendation-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import PreferableResumesScreen from "@app/screens/PreferableResumes/preferable-resumes-screen";
import { RecommendedVacanciesScreen } from "@app/screens/RecommendedVacancies/recommended-vacancies-screen";
import { CustomJobSeekerDashboard } from "@app/screens/ChartScreen/ChartScreen";
import { WorkStyleTestScreen } from "@app/screens/TestScreens/work-style-screen";
import { PersonalityTypeTestScreen } from "@app/screens/TestScreens/personality-type-screen";
import { ProfessionalSkillsTestScreen } from "@app/screens/TestScreens/analysis-professional-skills-screen";
import VacancyDetailScreen from "@app/screens/InnerVacancySearchScreen/inner-vacancy-search-screen";

// Create the stack navigator
const Stack = createNativeStackNavigator();

export const RootNavigator = () => (
  <>
    <StatusBar />
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Start"
      >
        {/* Auth Screens */}
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="CVScreen" component={CVUploadScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Loading" component={EnhancedLoadingScreen} />

        {/* User Screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={CustomJobSeekerDashboard} />
        <Stack.Screen name="Settings" component={EnhancedSettingsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />

        {/* HR Screens */}
        <Stack.Screen name="HRProfile" component={HRProfileScreen} />
        <Stack.Screen name="AddVacancy" component={AddVacancyScreen} />
        <Stack.Screen name="InnerVacancy" component={InnerVacancyScreen} />
        <Stack.Screen name="AllVacancies" component={AllScreenVacancies} />
        <Stack.Screen name="Resume" component={ResumeRecommendationScreen} />
        <Stack.Screen name="CandidateScreen" component={CandidateScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="AllChatsScreen" component={AllChatsScreen} />
        <Stack.Screen
          name="PreferableResumes"
          component={PreferableResumesScreen}
        />
        <Stack.Screen
          name="RecommendedVacancies"
          component={RecommendedVacanciesScreen}
        />
        <Stack.Screen name="WorkStyleTest" component={WorkStyleTestScreen} />
        <Stack.Screen
          name="PersonalityTypeTest"
          component={PersonalityTypeTestScreen}
        />
        <Stack.Screen
          name="ProfessionalSkillsTestScreen"
          component={ProfessionalSkillsTestScreen}
        />
        <Stack.Screen
          name="InnerVacancySearchScreen"
          component={VacancyDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);
