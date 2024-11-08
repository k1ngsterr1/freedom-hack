import React, { useState } from "react";
import { View, ScrollView, TextInput, Image } from "react-native";
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";

interface Resume {
  id: number;
  name: string;
  position: string;
  matchPercentage: number;
  photoUrl: string;
  skills: string[];
}

const mockResumes: Resume[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Senior React Native Developer",
    matchPercentage: 95,
    photoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    skills: ["React Native", "JavaScript", "TypeScript"],
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "React Native Expert",
    matchPercentage: 88,
    photoUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    skills: ["React Native", "Redux", "Node.js"],
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: "Mobile Developer",
    matchPercentage: 82,
    photoUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    skills: ["React Native", "iOS", "Android"],
  },
  {
    id: 4,
    name: "Emily Brown",
    position: "Frontend Developer",
    matchPercentage: 78,
    photoUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    id: 5,
    name: "Alex Wilson",
    position: "Full Stack Developer",
    matchPercentage: 75,
    photoUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    skills: ["React Native", "Node.js", "MongoDB"],
  },
];

export const ResumeRecommendationScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredResumes, setFilteredResumes] = useState(mockResumes);

  const filters = [
    "React Native",
    "JavaScript",
    "TypeScript",
    "Redux",
    "Node.js",
    "iOS",
    "Android",
    "React",
    "CSS",
    "MongoDB",
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterResumes(query, selectedFilters);
  };

  const toggleFilter = (filter: string) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(updatedFilters);
    filterResumes(searchQuery, updatedFilters);
  };

  const filterResumes = (query: string, filters: string[]) => {
    const filtered = mockResumes.filter((resume) => {
      const matchesSearch =
        resume.name.toLowerCase().includes(query.toLowerCase()) ||
        resume.position.toLowerCase().includes(query.toLowerCase());
      const matchesFilters =
        filters.length === 0 ||
        filters.every((filter) => resume.skills.includes(filter));
      return matchesSearch && matchesFilters;
    });
    setFilteredResumes(filtered);
  };

  const renderResumeCard = (resume: Resume) => (
    <MyTouchableOpacity
      key={resume.id}
      className="bg-white rounded-xl p-4 mb-4 flex-row items-center"
    >
      <Image
        source={{ uri: resume.photoUrl }}
        className="w-16 h-16 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-text">{resume.name}</Text>
        <Text className="text-sm text-secondary mb-1">{resume.position}</Text>
        <View className="flex-row flex-wrap">
          {resume.skills.slice(0, 3).map((skill, index) => (
            <View
              key={index}
              className="bg-primary bg-opacity-20 rounded-full px-2 py-1 mr-1 mb-1"
            >
              <Text className="text-white text-xs">{skill}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className="bg-primary bg-opacity-20 rounded-full px-3 py-1">
        <Text className="text-white font-semibold">
          {resume.matchPercentage}%
        </Text>
      </View>
    </MyTouchableOpacity>
  );

  return (
    <Layout isHR isHeader isBack>
      <View className="flex-1 w-full p-4">
        <Text className="text-2xl font-bold text-text mb-4">
          Рекомендации резюме
        </Text>
        <View className="mb-4">
          <View className="flex-row items-center bg-white rounded-full px-4 py-2">
            <Feather name="search" size={20} color="#045433" />
            <TextInput
              className="flex-1 ml-2 text-text"
              placeholder="Поиск по имени или должности"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {filters.map((filter) => (
            <MyTouchableOpacity
              key={filter}
              className={`h-[40px] mb-4 mr-2 py-2 px-4 flex items-center justify-center rounded-full ${
                selectedFilters.includes(filter) ? "bg-primary" : "bg-gray-200"
              }`}
              onPress={() => toggleFilter(filter)}
            >
              <Text
                className={`text-center ${
                  selectedFilters.includes(filter) ? "text-white" : "text-text"
                }`}
              >
                {filter}
              </Text>
            </MyTouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredResumes.map(renderResumeCard)}
        </ScrollView>
      </View>
    </Layout>
  );
};
