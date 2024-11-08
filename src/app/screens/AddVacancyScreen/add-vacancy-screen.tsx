import React, { useState } from "react";
import { View, ScrollView, TextInput } from "react-native";
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

  const handleSubmit = () => {
    console.log("Submitting vacancy:", vacancy);
    // Here you would typically send the data to your backend
  };

  return (
    <Layout isHR isScroll isBack isHeader>
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
              Hard Skills (через запятую)
            </Text>
            <TextInput
              className="bg-white p-3 rounded-xl text-text"
              value={vacancy.hard_skills.join(", ")}
              onChangeText={(value) =>
                handleArrayInputChange("hard_skills", value)
              }
              placeholder="Например: JavaScript, React, Node.js"
            />
          </View>

          <View className="mb-4">
            <Text className="text-base font-semibold text-text mb-2">
              Soft Skills (через запятую)
            </Text>
            <TextInput
              className="bg-white p-3 rounded-xl text-text"
              value={vacancy.soft_skills.join(", ")}
              onChangeText={(value) =>
                handleArrayInputChange("soft_skills", value)
              }
              placeholder="Например: Коммуникабельность, Работа в команде"
            />
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
            className="bg-primary py-4 px-6 rounded-full items-center"
            onPress={handleSubmit}
          >
            <Text className="text-white text-lg" weight="bold">
              Добавить вакансию
            </Text>
          </MyTouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default AddVacancyScreen;
