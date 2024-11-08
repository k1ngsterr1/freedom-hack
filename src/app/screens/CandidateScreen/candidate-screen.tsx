import React, { useState } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Ionicons } from "@expo/vector-icons";

interface Candidate {
  id: number;
  name: string;
  position: string;
  photoUrl: string;
  age: number;
  city: string;
  email: string;
  phone: string;
  skills: string[];
  education: string[];
  experience: string[];
  systemRecommendations: {
    softSkills: number;
    hardSkills: number;
  };
  completedTasks: {
    id: number;
    title: string;
    score: number;
  }[];
}

const mockCandidate: Candidate = {
  id: 1,
  name: "Иван Иванов",
  position: "Senior React Native Developer",
  photoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  age: 32,
  city: "Москва",
  email: "ivan.ivanov@email.com",
  phone: "+7 (123) 456-7890",
  skills: [
    "React Native",
    "JavaScript",
    "TypeScript",
    "Redux",
    "Git",
    "Node.js",
  ],
  education: [
    "Магистр компьютерных наук, МГУ, 2015",
    "Бакалавр прикладной математики, МФТИ, 2013",
  ],
  experience: [
    "Senior React Native Developer, Tech Corp, 2018-настоящее время",
    "Mobile Developer, App Studio, 2015-2018",
  ],
  systemRecommendations: {
    softSkills: 85,
    hardSkills: 92,
  },
  completedTasks: [
    { id: 1, title: "Алгоритмическая задача", score: 95 },
    { id: 2, title: "Тест на знание React Native", score: 88 },
  ],
};

export default function Component() {
  const [status, setStatus] = useState("Новый");

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

  const renderSection = (
    title: string,
    items: string[],
    icon: React.ReactNode
  ) => (
    <View className="mb-6">
      <View className="flex-row items-center mb-2">
        {icon}
        <Text className="text-lg font-semibold text-text ml-2">{title}:</Text>
      </View>
      {items.map((item, index) => (
        <Text key={index} className="text-base text-text ml-6">
          • {item}
        </Text>
      ))}
    </View>
  );

  const changeStatus = () => {
    if (status === "Новый") {
      setStatus("Отобран");
    } else if (status === "Отобран") {
      setStatus("Отклонен");
    } else {
      setStatus("Новый");
    }
  };

  return (
    <Layout isBack isHeader isScroll>
      <View className="px-4">
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: mockCandidate.photoUrl }}
            className="w-24 h-24 rounded-full mr-4"
          />
          <View>
            <Text className="text-2xl font-bold text-text">
              {mockCandidate.name}
            </Text>
            <Text className="text-lg text-secondary">
              {mockCandidate.position}
            </Text>
            <Text className="text-base text-secondary">
              {mockCandidate.age} лет, {mockCandidate.city}
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="mail" size={20} color="#4FB84F" />
            <Text className="text-base text-text ml-2">
              {mockCandidate.email}
            </Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="call" size={20} color="#4FB84F" />
            <Text className="text-base text-text ml-2">
              {mockCandidate.phone}
            </Text>
          </View>
          <View className="">
            <Text className="text-base text-text ml-2">
              Дата публикования: {status}
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-2">Навыки:</Text>
          {renderSkillTags(mockCandidate.skills)}
        </View>

        {renderSection(
          "Образование",
          mockCandidate.education,
          <Ionicons name="school" size={20} color="#4FB84F" />
        )}
        {renderSection(
          "Опыт работы",
          mockCandidate.experience,
          <Ionicons name="briefcase" size={20} color="#4FB84F" />
        )}

        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-2">
            Рекомендации системы:
          </Text>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-base text-text">Soft skills:</Text>
              <Text className="text-xl font-bold text-primary">
                {mockCandidate.systemRecommendations.softSkills}%
              </Text>
            </View>
            <View>
              <Text className="text-base text-text">Hard skills:</Text>
              <Text className="text-xl font-bold text-primary">
                {mockCandidate.systemRecommendations.hardSkills}%
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-2">
            Выполненные задания:
          </Text>
          {mockCandidate.completedTasks.map((task) => (
            <View key={task.id} className="flex-row justify-between mb-2">
              <Text className="text-base text-text">{task.title}</Text>
              <Text className="text-base font-semibold text-primary">
                {task.score}%
              </Text>
            </View>
          ))}
        </View>

        <MyTouchableOpacity
          className="bg-primary py-3 px-6 rounded-full items-center mb-4"
          onPress={changeStatus}
        >
          <Text className="text-white font-semibold text-lg">
            Отправить запрос на интервью
          </Text>
        </MyTouchableOpacity>
      </View>
    </Layout>
  );
}
