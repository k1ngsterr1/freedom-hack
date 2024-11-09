import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";

export interface Question {
  id: number;
  text: string;
  options: string[];
}

interface TestTabProps {
  questions: Question[];
  onComplete: (answers: { [key: number]: string }) => void;
  allowManualNext?: boolean;
}

export const TestTab: React.FC<TestTabProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleAnswer = (questionId: number, answer: string) => {
    setSelectedOption(answer);
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const handleSubmit = () => {
    onComplete(answers);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <ScrollView className="flex-1">
      <View className="mb-4 bg-gray-200 h-2 rounded-full">
        <View
          style={{ width: `${progress}%` }}
          className="bg-primary h-2 rounded-full"
        />
      </View>

      <View className="mb-6">
        <Text className="text-lg font-semibold text-text mb-4">
          {questions[currentQuestion].text}
        </Text>
        {questions[currentQuestion].options.map((option, index) => (
          <MyTouchableOpacity
            key={index}
            className={`mb-3 p-4 rounded-xl ${
              selectedOption === option ? "bg-primary" : "bg-gray-100"
            }`}
            onPress={() => handleAnswer(questions[currentQuestion].id, option)}
          >
            <Text
              className={`text-base ${
                selectedOption === option
                  ? "text-white font-semibold"
                  : "text-text"
              }`}
            >
              {option}
            </Text>
          </MyTouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-between mb-6">
        <MyTouchableOpacity
          className="flex-row items-center"
          onPress={() => {
            setCurrentQuestion(Math.max(0, currentQuestion - 1));
            setSelectedOption(
              answers[questions[currentQuestion - 1]?.id] || null
            );
          }}
          disabled={currentQuestion === 0}
        >
          <Feather
            name="chevron-left"
            size={24}
            color={currentQuestion === 0 ? "#ccc" : "#4FB84F"}
          />
          <Text
            className={`ml-2 ${
              currentQuestion === 0 ? "text-gray-400" : "text-primary"
            }`}
          >
            Назад
          </Text>
        </MyTouchableOpacity>
        {currentQuestion === questions.length - 1 ? (
          <MyTouchableOpacity
            className={`px-6 py-3 rounded-full ${
              selectedOption ? "bg-primary" : "bg-gray-300"
            }`}
            onPress={handleSubmit}
            disabled={!selectedOption}
          >
            <Text
              className={`font-semibold ${
                selectedOption ? "text-white" : "text-gray-500"
              }`}
            >
              Завершить тест
            </Text>
          </MyTouchableOpacity>
        ) : (
          <MyTouchableOpacity
            className={`flex-row items-center ${
              selectedOption ? "opacity-100" : "opacity-50"
            }`}
            onPress={handleNextQuestion}
            disabled={!selectedOption}
          >
            <Text className="mr-2 text-primary">Далее</Text>
            <Feather name="chevron-right" size={24} color="#4FB84F" />
          </MyTouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
