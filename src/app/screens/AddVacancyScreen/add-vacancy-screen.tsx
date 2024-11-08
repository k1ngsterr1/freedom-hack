import React, { useState } from "react";
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";

interface Vacancy {
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

  const [newSkill, setNewSkill] = useState({ hard: "", soft: "" });

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
    setVacancy((prev) => ({ ...prev, salary: newSalary }));
  };

  const addSkill = (type: "hard" | "soft") => {
    if (newSkill[type].trim()) {
      setVacancy((prev) => ({
        ...prev,
        [`${type}_skills`]: [...prev[`${type}_skills`], newSkill[type].trim()],
      }));
      setNewSkill((prev) => ({ ...prev, [type]: "" }));
    }
  };

  const removeSkill = (type: "hard" | "soft", skillToRemove: string) => {
    setVacancy((prev) => ({
      ...prev,
      [`${type}_skills`]: prev[`${type}_skills`].filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting vacancy:", vacancy);
    // Here you would typically send the data to your backend
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
        <View className="p-4">
          <Text className="text-2xl font-bold text-text mb-6">
            Добавить вакансию
          </Text>
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

          <View className="mb-4">
            <Text className="text-base font-semibold text-text mb-2">
              Описание
            </Text>
            <TextInput
              className="bg-white p-3 rounded-xl text-text"
              value={vacancy.description}
              onChangeText={(value) => handleInputChange("description", value)}
              placeholder="Введите описание вакансии"
              multiline
              numberOfLines={4}
            />
          </View>

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

          <View className="mb-4">
            <Text className="text-base font-semibold text-text mb-2">
              Формат работы (через запятую)
            </Text>
            <TextInput
              className="bg-white p-3 rounded-xl text-text"
              value={vacancy.formatOfWork.join(", ")}
              onChangeText={(value) =>
                handleArrayInputChange("formatOfWork", value)
              }
              placeholder="Например: Удаленно, Офис, Гибрид"
            />
          </View>

          <View className="mb-4">
            <Text className="text-base font-semibold text-text mb-2">
              Тип занятости
            </Text>
            <TextInput
              className="bg-white p-3 rounded-xl text-text"
              value={vacancy.employmentType}
              onChangeText={(value) =>
                handleInputChange("employmentType", value)
              }
              placeholder="Например: Полная занятость, Частичная занятость"
            />
          </View>

          <View className="mb-4">
            <Text className="text-base font-semibold text-text mb-2">
              Зарплата (от - до)
            </Text>
            <View className="flex-row">
              <TextInput
                className="bg-white p-3 rounded-xl text-text flex-1 mr-2"
                value={vacancy.salary[0].toString()}
                onChangeText={(value) => handleSalaryChange(0, value)}
                placeholder="От"
                keyboardType="numeric"
              />
              <TextInput
                className="bg-white p-3 rounded-xl text-text flex-1 ml-2"
                value={vacancy.salary[1].toString()}
                onChangeText={(value) => handleSalaryChange(1, value)}
                placeholder="До"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-base font-semibold text-text mb-2">
              Тестовое задание
            </Text>
            <TextInput
              className="bg-white p-3 rounded-xl text-text"
              value={vacancy.task}
              onChangeText={(value) => handleInputChange("task", value)}
              placeholder="Введите тестовое задание"
              multiline
              numberOfLines={4}
            />
          </View>

          <View className="mb-4">
            <Text className="text-base font-semibold text-text mb-2">
              Дополнительно (через запятую)
            </Text>
            <TextInput
              className="bg-white p-3 rounded-xl text-text"
              value={vacancy.additional.join(", ")}
              onChangeText={(value) =>
                handleArrayInputChange("additional", value)
              }
              placeholder="Дополнительная информация"
            />
          </View>

          <View className="mb-6">
            <Text className="text-base font-semibold text-text mb-2">
              Контакты (через запятую)
            </Text>
            <TextInput
              className="bg-white p-3 rounded-xl text-text"
              value={vacancy.contacts.join(", ")}
              onChangeText={(value) =>
                handleArrayInputChange("contacts", value)
              }
              placeholder="Например: email@example.com, +7 (999) 123-45-67"
            />
          </View>

          <MyTouchableOpacity
            className="bg-primary py-3 px-6 rounded-full items-center"
            onPress={handleSubmit}
          >
            <Text className="text-white font-semibold">Добавить вакансию</Text>
          </MyTouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default AddVacancyScreen;