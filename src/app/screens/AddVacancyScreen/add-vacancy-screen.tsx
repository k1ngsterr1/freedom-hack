import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";
import { axiosInstance } from "@shared/lib/hooks/useInterceptor";

interface VacancyTextareaProps {
  description: string;
  onChangeText: (value: string) => void;
}

const VacancyTextarea: React.FC<VacancyTextareaProps> = ({
  description,
  onChangeText,
}) => (
  <View className="mb-4">
    <Text className="text-base font-semibold text-text mb-2">Описание</Text>
    <TextInput
      className="bg-white p-3 rounded-xl text-text"
      value={description}
      onChangeText={onChangeText}
      placeholder="Введите описание вакансии"
      multiline
      numberOfLines={4}
      textAlignVertical="top"
      style={{ minHeight: 100 }}
    />
  </View>
);

interface Vacancy {
  title: string;
  description: string;
  hard_skills: string[];
  soft_skills: string[];
  formatOfWork: string[];
  employmentType: string;
  salary: [number, number];
  task: string;
  additional: string[];
  contacts: string[];
}

const AddVacancyScreen: React.FC = () => {
  const [vacancy, setVacancy] = useState<Vacancy>({
    title: "",
    description: "",
    hard_skills: [],
    soft_skills: [],
    formatOfWork: [],
    employmentType: "",
    salary: [0, 0],
    task: "",
    additional: [],
    contacts: [],
  });

  const [newSkill, setNewSkill] = useState<{ hard: string; soft: string }>({
    hard: "",
    soft: "",
  });

  const handleInputChange = (field: keyof Vacancy, value: string) => {
    setVacancy((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field: keyof Vacancy, value: string) => {
    setVacancy((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSalaryChange = (index: number, value: string) => {
    const newSalary = [...vacancy.salary];
    newSalary[index] = parseInt(value) || 0;
    setVacancy((prev) => ({ ...prev, salary: newSalary as [number, number] }));
  };

  const addSkill = (type: "hard" | "soft") => {
    if (newSkill[type].trim()) {
      setVacancy((prev) => ({
        ...prev,
        [`${type}_skills`]: [
          ...prev[`${type}_skills` as keyof Vacancy],
          newSkill[type].trim(),
        ] as string[],
      }));
      setNewSkill((prev) => ({ ...prev, [type]: "" }));
    }
  };

  const removeSkill = (type: "hard" | "soft", skillToRemove: string) => {
    setVacancy((prev) => ({
      ...prev,
      [`${type}_skills`]: (
        prev[`${type}_skills` as keyof Vacancy] as string[]
      ).filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/api/vacancies/add", vacancy);
      console.log("Vacancy submitted successfully:", response.data);
      // Optionally, navigate to a success page or show a success message here
    } catch (error) {
      console.error("Error submitting vacancy:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const renderSkillTabs = (skills: string[], type: "hard" | "soft") => (
    <View className="flex-row flex-wrap mt-2">
      {skills.map((skill, index) => (
        <View
          key={index}
          className="bg-primary rounded-full px-3 py-1 mr-2 mb-2 flex-row items-center"
        >
          <Text className="text-white mr-2">{skill}</Text>
          <TouchableOpacity onPress={() => removeSkill(type, skill)}>
            <Feather name="x" size={16} color="white" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <Layout isHR isHeader isBack isScroll>
      <View className="flex-1 w-full">
        <Text className="text-2xl font-bold text-text mb-6">
          Добавить вакансию
        </Text>

        {/* Vacancy Title Input */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-text mb-2">
            Название вакансии
          </Text>
          <TextInput
            className="bg-white p-3 rounded-xl text-text"
            value={vacancy.title}
            onChangeText={(value) => handleInputChange("title", value)}
            placeholder="Введите название вакансии"
          />
        </View>

        {/* Vacancy Description Input */}
        <VacancyTextarea
          description={vacancy.description}
          onChangeText={(value) => handleInputChange("description", value)}
        />

        {/* Hard Skills Input */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-text mb-2">
            Hard Skills
          </Text>
          <View className="flex-row">
            <TextInput
              className="bg-white p-3 rounded-xl text-text flex-1 mr-2"
              value={newSkill.hard}
              onChangeText={(value) =>
                setNewSkill((prev) => ({ ...prev, hard: value }))
              }
              placeholder="Добавить Hard Skill"
            />
            <MyTouchableOpacity
              className="bg-primary p-3 rounded-xl"
              onPress={() => addSkill("hard")}
            >
              <Feather name="plus" size={24} color="white" />
            </MyTouchableOpacity>
          </View>
          {renderSkillTabs(vacancy.hard_skills, "hard")}
        </View>

        {/* Soft Skills Input */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-text mb-2">
            Soft Skills
          </Text>
          <View className="flex-row">
            <TextInput
              className="bg-white p-3 rounded-xl text-text flex-1 mr-2"
              value={newSkill.soft}
              onChangeText={(value) =>
                setNewSkill((prev) => ({ ...prev, soft: value }))
              }
              placeholder="Добавить Soft Skill"
            />
            <MyTouchableOpacity
              className="bg-primary p-3 rounded-xl"
              onPress={() => addSkill("soft")}
            >
              <Feather name="plus" size={24} color="white" />
            </MyTouchableOpacity>
          </View>
          {renderSkillTabs(vacancy.soft_skills, "soft")}
        </View>

        {/* Other Fields for Format of Work, Employment Type, Salary, etc. */}
        {/* Similar structure for other input fields */}

        {/* Submit Button */}
        <MyTouchableOpacity
          className="bg-primary py-3 px-6 rounded-full items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-semibold">Добавить вакансию</Text>
        </MyTouchableOpacity>
      </View>
    </Layout>
  );
};

export default AddVacancyScreen;
