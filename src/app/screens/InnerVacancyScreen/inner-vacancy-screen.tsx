import React from "react";
import { View, Image } from "react-native";
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { useNavigation } from "@react-navigation/native";

interface Vacancy {
  id: number;
  title: string;
  description: string;
  hard_skills: string[];
  soft_skills: string[];
  formatOfWork: string[];
  employmentType: string;
  salary: number[];
  task: string;
  additional: string[];
  contacts: string[];
}

interface Resume {
  id: number;
  name: string;
  position: string;
  matchPercentage: number;
  photoUrl: string;
}

const mockVacancy: Vacancy = {
  id: 1,
  title: "Senior React Native Developer",
  description:
    "We are looking for an experienced React Native developer to join our team and work on exciting mobile projects.",
  hard_skills: ["React Native", "JavaScript", "TypeScript", "Redux"],
  soft_skills: ["Communication", "Team player", "Problem-solving"],
  formatOfWork: ["Remote", "Hybrid"],
  employmentType: "Full-time",
  salary: [120000, 180000],
  task: "Create a simple React Native app that fetches and displays data from an API.",
  additional: ["Flexible working hours", "Health insurance"],
  contacts: ["hr@company.com", "+1 (123) 456-7890"],
};

const mockResumes: Resume[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Senior React Native Developer",
    matchPercentage: 95,
    photoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "React Native Expert",
    matchPercentage: 88,
    photoUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: "Mobile Developer",
    matchPercentage: 82,
    photoUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const InnerVacancyScreen: React.FC = () => {
  const navigation = useNavigation();
  const renderSkillTags = (skills: string[]) => (
    <View className="flex-row flex-wrap mt-2">
      {skills.map((skill, index) => (
        <View
          key={index}
          className="bg-primary bg-opacity-20 rounded-full px-3 py-1 mr-2 mb-2"
        >
          <Text className="text-white">{skill}</Text>
        </View>
      ))}
    </View>
  );

  const renderResumeCard = (resume: Resume) => (
    <MyTouchableOpacity
      onPress={() =>
        navigation.navigate("CandidateScreen", { resumeId: resume.id })
      }
      key={resume.id}
      className="bg-white rounded-xl p-4 mb-4 flex-row items-center"
    >
      <Image
        source={{ uri: resume.photoUrl }}
        className="w-16 h-16 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-text">{resume.name}</Text>
        <Text className="text-sm text-secondary">{resume.position}</Text>
      </View>
      <View className="bg-primary bg-opacity-20 rounded-full px-3 py-1">
        <Text className="text-white font-semibold">
          {resume.matchPercentage}% match
        </Text>
      </View>
    </MyTouchableOpacity>
  );

  return (
    <Layout isHR isHeader isBack isBottomTab isScroll>
      <View className="mt-4 w-full">
        <Text className="text-2xl font-bold text-text mb-2">
          {mockVacancy.title}
        </Text>
        <Text className="text-lg text-secondary mb-4">
          {mockVacancy.salary[0]} - {mockVacancy.salary[1]} ₽
        </Text>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-2">Описание</Text>
          <Text className="text-base text-text">{mockVacancy.description}</Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-2">
            Hard Skills
          </Text>
          {renderSkillTags(mockVacancy.hard_skills)}
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-2">
            Soft Skills
          </Text>
          {renderSkillTags(mockVacancy.soft_skills)}
        </View>
        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-2">
            Формат работы:
          </Text>
          <Text className="text-base text-text">
            {mockVacancy.formatOfWork.join(", ")}
          </Text>
        </View>
        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-2">
            Тип занятости:
          </Text>
          <Text className="text-base text-text">
            {mockVacancy.employmentType}
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-2">
            Тестовое задание:
          </Text>
          <Text className="text-base text-text">{mockVacancy.task}</Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-2">
            Дополнительно:
          </Text>
          <Text className="text-base text-text">
            {mockVacancy.additional.join(", ")}
          </Text>
        </View>

        <View className="mb-8">
          <Text className="text-lg font-semibold text-text mb-2">
            Контакты:
          </Text>
          {mockVacancy.contacts.map((contact, index) => (
            <Text key={index} className="text-base text-text">
              {contact}
            </Text>
          ))}
        </View>

        <View className="mb-6">
          <Text className="text-xl font-bold text-text mb-4">
            Рекомендуемые кандидаты:
          </Text>
          {mockResumes.map(renderResumeCard)}
        </View>
      </View>
    </Layout>
  );
};

export default InnerVacancyScreen;
