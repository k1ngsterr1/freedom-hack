import React from "react";
import { View } from "react-native";
import Text from "@shared/ui/Text/text";
import { Ionicons } from "@expo/vector-icons";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";

interface CandidateCardProps {
  hard_skills: string[];
  soft_skills: string[];
  work_experience: string[];
  formatOfWork: string;
  employmentType: string;
  experience: number;
  salary: number[];
  position: string;
  location: string;
  additional: string[];
  summary: string;
  contacts: string[];
  onContact: () => void; // Added prop for contact action
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  hard_skills,
  soft_skills,
  work_experience,
  formatOfWork,
  employmentType,
  experience,
  salary,
  position,
  location,
  additional,
  summary,
  contacts,
  onContact,
}) => {
  return (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4">
      <Text className="text-2xl font-bold mb-2 text-[#111827]">{position}</Text>
      <View className="flex-row items-center mb-2">
        <Ionicons
          name="location-outline"
          size={16}
          color="#045433"
          style={{ marginRight: 8 }}
        />
        <Text className="text-[#111827]">{location}</Text>
      </View>
      <View className="flex-row items-center mb-2">
        <Ionicons
          name="cash-outline"
          size={16}
          color="#045433"
          style={{ marginRight: 8 }}
        />
        <Text className="text-[#111827]">{salary[0].toLocaleString()} ₸</Text>
      </View>
      <View className="flex-row items-center mb-2">
        <Ionicons
          name="briefcase-outline"
          size={16}
          color="#045433"
          style={{ marginRight: 8 }}
        />
        <Text className="text-[#111827]">{experience} лет опыта</Text>
      </View>
      <View className="flex-row items-center mb-2">
        <Ionicons
          name="time-outline"
          size={16}
          color="#045433"
          style={{ marginRight: 8 }}
        />
        <Text className="text-[#111827]">
          {formatOfWork}, {employmentType}
        </Text>
      </View>

      <Text className="text-lg font-semibold mt-4 mb-2 text-[#111827]">
        Резюме:
      </Text>
      <Text className="text-[#111827] mb-4">{summary}</Text>

      <Text className="text-lg font-semibold mb-2 text-[#111827]">
        Профессиональные навыки:
      </Text>
      <View className="flex-row flex-wrap mb-4">
        {hard_skills.map((skill, index) => (
          <View
            key={index}
            className="bg-[#4FB84F] rounded-full px-3 py-1 mr-2 mb-2"
          >
            <Text className="text-sm text-white">{skill}</Text>
          </View>
        ))}
      </View>

      <Text className="text-lg font-semibold mb-2 text-[#111827]">
        Личные качества:
      </Text>
      <View className="flex-row flex-wrap mb-4">
        {soft_skills.map((skill, index) => (
          <View
            key={index}
            className="bg-[#4FB84F] rounded-full px-3 py-1 mr-2 mb-2"
          >
            <Text className="text-sm text-white">{skill}</Text>
          </View>
        ))}
      </View>

      <Text className="text-lg font-semibold mb-2 text-[#111827]">
        Опыт работы:
      </Text>
      {work_experience.map((exp, index) => (
        <Text key={index} className="text-[#111827] mb-2">
          • {exp}
        </Text>
      ))}

      {additional.length > 0 && (
        <>
          <Text className="text-lg font-semibold mt-4 mb-2 text-[#111827]">
            Дополнительная информация:
          </Text>
          {additional.map((info, index) => (
            <Text key={index} className="text-[#111827] mb-2">
              • {info}
            </Text>
          ))}
        </>
      )}

      <Text className="text-lg font-semibold mt-4 mb-2 text-[#111827]">
        Контактная информация:
      </Text>
      {contacts.map((contact, index) => (
        <Text key={index} className="text-[#045433] mb-1">
          {contact}
        </Text>
      ))}

      <MyTouchableOpacity
        onPress={onContact}
        className="bg-primary mt-2 py-3 px-4 rounded-lg items-center"
      >
        <Text className="text-white font-semibold">Связаться с кандидатом</Text>
      </MyTouchableOpacity>
    </View>
  );
};
