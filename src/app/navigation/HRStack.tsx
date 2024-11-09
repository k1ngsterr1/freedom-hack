import AddVacancyScreen from "@app/screens/AddVacancyScreen/add-vacancy-screen";
import AllChatsScreen from "@app/screens/AllChatsScreen/all-chats-screen";
import { AllScreenVacancies } from "@app/screens/AllVacanciesScreen/all-screen-vacancies";
import CandidateScreen from "@app/screens/CandidateScreen/candidate-screen";
import ChatScreen from "@app/screens/ChatScreen/chat-screen";
import HRProfileScreen from "@app/screens/HRProfileScreen/HR-Profile-Screen";
import InnerVacancyScreen from "@app/screens/InnerVacancyScreen/inner-vacancy-screen";
import PreferableResumesScreen from "@app/screens/PreferableResumes/preferable-resumes-screen";
import { ResumeRecommendationScreen } from "@app/screens/ResumeRecommendations/resume-recommendation-screen";
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
    <Stack.Screen name="InnerVacancy" component={InnerVacancyScreen} />
    <Stack.Screen name="AllVacancies" component={AllScreenVacancies} />
    <Stack.Screen name="Resume" component={ResumeRecommendationScreen} />
    <Stack.Screen name="CandidateScreen" component={CandidateScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
    <Stack.Screen name="AllChatsScreen" component={AllChatsScreen} />
    <Stack.Screen name="AllVacancies" component={AllScreenVacancies} />
    <Stack.Screen
      name="PreferableResumes"
      component={PreferableResumesScreen}
    />
  </Stack.Navigator>
);
