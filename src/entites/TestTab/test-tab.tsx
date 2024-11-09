import React, { useState } from "react";
import { View, ScrollView, Modal } from "react-native";
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

const CompletionPopup: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View
      className="flex-1 justify-center items-center bg-opacity-50"
      style={{ backgroundColor: "(rgba(0, 0, 0, 0.4))" }}
    >
      <View className="bg-white p-6 rounded-2xl w-5/6 max-w-sm">
        <Text className="text-2xl font-bold mb-4 text-center">Спасибо!</Text>
        <Text className="text-base mb-6 text-center">
          Благодарим вас за прохождение теста. Ваши ответы помогут нам лучше
          понять ваши навыки и предпочтения.
        </Text>
        <MyTouchableOpacity
          className="bg-primary py-3 px-6 rounded-full self-center"
          onPress={onClose}
        >
          <Text className="text-white font-semibold">Закрыть</Text>
        </MyTouchableOpacity>
      </View>
    </View>
  </Modal>
);

export const TestTab: React.FC<TestTabProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

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
    setShowCompletionPopup(true);
  };

  const handleClosePopup = () => {
    setShowCompletionPopup(false);
    onComplete(answers);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <ScrollView className="flex-1 w-full">
      <View className="w-full mb-4 bg-gray-200 h-2 rounded-full">
        <View
          style={{ width: `${progress}%` }}
          className="bg-primary h-2 rounded-full"
        />
      </View>
      <View className="mb-6 w-full min-h-[100px]">
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
      <View className="flex-row justify-between mb-6 w-full">
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
            className={`flex-row items-center`}
            onPress={handleNextQuestion}
            disabled={!selectedOption}
          >
            <Text
              className={` ${
                selectedOption ? "text-primary" : "text-gray-400"
              } mr-2 `}
            >
              Далее
            </Text>
            <Feather
              name="chevron-right"
              size={24}
              color={selectedOption ? "#4FB84F" : "#9CA3AF"}
            />
          </MyTouchableOpacity>
        )}
      </View>
      <CompletionPopup
        visible={showCompletionPopup}
        onClose={handleClosePopup}
      />
    </ScrollView>
  );
};
