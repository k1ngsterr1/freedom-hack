import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "@app/layouts/layout";
import { Question, TestTab } from "src/entites/TestTab/test-tab";
import { View } from "react-native";
import Text from "@shared/ui/Text/text";

export const ProfessionalSkillsTestScreen = () => {
  const navigation = useNavigation();

  const questions: Question[] = [
    {
      id: 1,
      text: "Как вы оцениваете свои навыки коммуникации?",
      options: [
        "Отлично, легко общаюсь с любыми людьми",
        "Хорошо, но иногда испытываю трудности",
        "Средне, предпочитаю письменное общение",
        "Нуждаюсь в улучшении навыков коммуникации",
      ],
    },
    {
      id: 2,
      text: "Насколько вы владеете навыками тайм-менеджмента?",
      options: [
        "Отлично планирую и распределяю время",
        "Хорошо, но иногда не успеваю выполнить все задачи",
        "Средне, часто испытываю трудности с планированием",
        "Нуждаюсь в улучшении навыков тайм-менеджмента",
      ],
    },
    {
      id: 3,
      text: "Как вы оцениваете свои лидерские качества?",
      options: [
        "Отлично, часто беру на себя роль лидера",
        "Хорошо, могу руководить, когда это необходимо",
        "Средне, предпочитаю быть частью команды",
        "Нуждаюсь в развитии лидерских навыков",
      ],
    },
    {
      id: 4,
      text: "Насколько вы способны работать в команде?",
      options: [
        "Отлично, легко нахожу общий язык с коллегами",
        "Хорошо, но иногда возникают разногласия",
        "Средне, предпочитаю индивидуальную работу",
        "Нуждаюсь в улучшении навыков командной работы",
      ],
    },
    {
      id: 5,
      text: "Как вы оцениваете свои навыки решения проблем?",
      options: [
        "Отлично, быстро нахожу эффективные решения",
        "Хорошо, но иногда требуется помощь коллег",
        "Средне, часто испытываю трудности с решением сложных задач",
        "Нуждаюсь в улучшении навыков решения проблем",
      ],
    },
    {
      id: 6,
      text: "Насколько вы владеете навыками презентации?",
      options: [
        "Отлично, уверенно выступаю перед любой аудиторией",
        "Хорошо, но иногда испытываю волнение",
        "Средне, предпочитаю небольшие группы слушателей",
        "Нуждаюсь в улучшении навыков презентации",
      ],
    },
    {
      id: 7,
      text: "Как вы оцениваете свои навыки работы с технологиями?",
      options: [
        "Отлично, быстро осваиваю новые технологии",
        "Хорошо, но иногда требуется дополнительное обучение",
        "Средне, испытываю трудности с новыми технологиями",
        "Нуждаюсь в улучшении технических навыков",
      ],
    },
    {
      id: 8,
      text: "Насколько вы способны к критическому мышлению?",
      options: [
        "Отлично анализирую информацию и делаю выводы",
        "Хорошо, но иногда упускаю важные детали",
        "Средне, часто полагаюсь на мнение других",
        "Нуждаюсь в развитии навыков критического мышления",
      ],
    },
    {
      id: 9,
      text: "Как вы оцениваете свои навыки управления проектами?",
      options: [
        "Отлично справляюсь с управлением проектами любой сложности",
        "Хорошо, но иногда возникают трудности с крупными проектами",
        "Средне, предпочитаю работать над отдельными задачами",
        "Нуждаюсь в улучшении навыков управления проектами",
      ],
    },
    {
      id: 10,
      text: "Насколько вы владеете навыками письменной коммуникации?",
      options: [
        "Отлично, легко составляю любые виды документов",
        "Хорошо, но иногда требуется проверка",
        "Средне, испытываю трудности с некоторыми видами документов",
        "Нуждаюсь в улучшении навыков письменной коммуникации",
      ],
    },
    {
      id: 11,
      text: "Как вы оцениваете свои навыки адаптации к изменениям?",
      options: [
        "Отлично, быстро адаптируюсь к любым изменениям",
        "Хорошо, но иногда требуется время на привыкание",
        "Средне, предпочитаю стабильность",
        "Нуждаюсь в улучшении навыков адаптации",
      ],
    },
    {
      id: 12,
      text: "Насколько вы владеете навыками принятия решений?",
      options: [
        "Отлично, быстро принимаю эффективные решения",
        "Хорошо, но иногда сомневаюсь в своем выборе",
        "Средне, часто советуюсь с другими",
        "Нуждаюсь в улучшении навыков принятия решений",
      ],
    },
    {
      id: 13,
      text: "Как вы оцениваете свои навыки управления стрессом?",
      options: [
        "Отлично справляюсь со стрессом в любых ситуациях",
        "Хорошо, но иногда требуется время на восстановление",
        "Средне, часто испытываю трудности со стрессом",
        "Нуждаюсь в улучшении навыков управления стрессом",
      ],
    },
    {
      id: 14,
      text: "Насколько вы владеете навыками межкультурной коммуникации?",
      options: [
        "Отлично общаюсь с людьми из разных культур",
        "Хорошо, но иногда возникают недопонимания",
        "Средне, предпочитаю работать в знакомой культурной среде",
        "Нуждаюсь в улучшении навыков межкультурной коммуникации",
      ],
    },
    {
      id: 15,
      text: "Как вы оцениваете свои навыки непрерывного обучения?",
      options: [
        "Отлично, постоянно ищу новые возможности для обучения",
        "Хорошо, регулярно обновляю свои знания",
        "Средне, учусь только когда это необходимо",
        "Нуждаюсь в улучшении навыков непрерывного обучения",
      ],
    },
  ];

  const handleTestComplete = (answers: { [key: number]: string }) => {
    console.log("Professional skills test completed with answers:", answers);
    // Here you would typically send the answers to your backend or process them
    // For now, we'll just navigate back to the main screen
    navigation.goBack();
  };

  return (
    <Layout isBack isHeader>
      <View className="mt-16 items-center justify-center">
        <View className="mb-6">
          <Text className="text-xl font-bold">
            Анализ профессиональных навыков
          </Text>
        </View>
        <TestTab
          questions={questions}
          onComplete={handleTestComplete}
          allowManualNext={true}
        />
      </View>
    </Layout>
  );
};
