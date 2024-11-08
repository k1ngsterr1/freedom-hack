import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Layout } from "@app/layouts/layout";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import StartIllustration from "@shared/illustrations/start-illustration";
import { Question, TestTab } from "src/entites/TestTab/test-tab";

export const TestScreen = () => {
  const navigation = useNavigation();

  const questions: Question[] = [
    {
      id: 1,
      text: "Как вы предпочитаете проводить свободное время?",
      options: [
        "В одиночестве",
        "С друзьями",
        "Занимаясь хобби",
        "Путешествуя",
      ],
    },
    {
      id: 2,
      text: "Как вы реагируете на стрессовые ситуации?",
      options: [
        "Сохраняю спокойствие",
        "Ищу поддержки",
        "Становлюсь раздражительным",
        "Анализирую ситуацию",
      ],
    },
    {
      id: 3,
      text: "Какой стиль работы вам ближе?",
      options: ["Структурированный", "Гибкий", "Командный", "Индивидуальный"],
    },
    {
      id: 4,
      text: "Насколько вы склонны к риску?",
      options: [
        "Избегаю риска",
        "Рискую, но осторожно",
        "Риск - часть моей жизни",
        "Все зависит от ситуации",
      ],
    },
    {
      id: 5,
      text: "Какую роль вы чаще занимаете в команде?",
      options: ["Лидер", "Инициатор", "Поддерживающий", "Исполнитель"],
    },
    {
      id: 6,
      text: "Как вы принимаете важные решения?",
      options: [
        "Опираюсь на логику",
        "Следую интуиции",
        "Советуюсь с другими",
        "Взвешиваю плюсы и минусы",
      ],
    },
    {
      id: 7,
      text: "Что вас больше мотивирует на работе?",
      options: [
        "Стабильность и безопасность",
        "Признание и похвала",
        "Возможность учиться и развиваться",
        "Достижение результатов",
      ],
    },
    {
      id: 8,
      text: "Как вы реагируете на изменения?",
      options: [
        "Адаптируюсь быстро",
        "Нуждаюсь во времени на привыкание",
        "Предпочитаю стабильность",
        "Инициирую изменения",
      ],
    },
    {
      id: 9,
      text: "Какой рабочий темп вам комфортен?",
      options: [
        "Медленный и размеренный",
        "Средний",
        "Быстрый и интенсивный",
        "Разный, в зависимости от задач",
      ],
    },
    {
      id: 10,
      text: "Как вы относитесь к критике?",
      options: [
        "Принимаю и анализирую",
        "Стараюсь избегать",
        "Завишу от мнения других",
        "Использую как возможность для улучшения",
      ],
    },
    {
      id: 11,
      text: "Что вас больше всего привлекает в новом проекте?",
      options: [
        "Сложность задачи",
        "Новые знания и навыки",
        "Командная работа",
        "Конечный результат",
      ],
    },
    {
      id: 12,
      text: "Как вы предпочитаете получать обратную связь?",
      options: [
        "Прямую и конкретную",
        "Общую и конструктивную",
        "Только в случае необходимости",
        "Часто и регулярно",
      ],
    },
    {
      id: 13,
      text: "Какой тип лидерства вам импонирует?",
      options: [
        "Автократичный",
        "Демократичный",
        "Либеральный",
        "Ситуационный",
      ],
    },
    {
      id: 14,
      text: "Как вы реагируете на конфликтные ситуации?",
      options: [
        "Стараюсь избегать",
        "Ищу компромисс",
        "Смело иду на конфликт",
        "Решаю проблему конструктивно",
      ],
    },
    {
      id: 15,
      text: "Какой подход к выполнению задач вы предпочитаете?",
      options: [
        "Стратегический",
        "Творческий",
        "Систематический",
        "Оперативный",
      ],
    },
  ];

  const handleTestComplete = (answers: { [key: number]: string }) => {
    console.log("Test completed with answers:", answers);
    // Here you would typically send the answers to your backend or process them
    // For now, we'll just navigate back to the main screen
    navigation.goBack();
  };

  return (
    <Layout isLogo isBottomTab>
      <TestTab questions={questions} onComplete={handleTestComplete} />
    </Layout>
  );
};
