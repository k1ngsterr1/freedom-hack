import React from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import { useNavigation } from "@react-navigation/native";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  avatar: string;
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Анна Смирнова",
    lastMessage: "Отлично, до встречи завтра!",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unreadCount: 0,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "2",
    name: "Иван Петров",
    lastMessage: "Можешь прислать резюме?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 2,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "3",
    name: "HR отдел",
    lastMessage: "Новый кандидат на позицию разработчика",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unreadCount: 5,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "4",
    name: "Техподдержка",
    lastMessage: "Проблема решена. Если возникнут вопросы, обращайтесь.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

export default function AllChatsScreen() {
  const navigation = useNavigation();

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days}д`;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) {
      return `${hours}ч`;
    }

    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes > 0) {
      return `${minutes}м`;
    }

    return "Сейчас";
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      className="flex-row w-full items-center p-4 border-b border-gray-200"
      onPress={() => navigation.navigate("ChatScreen", { chatId: item.id })}
    >
      <Image
        source={{ uri: item.avatar }}
        className="w-12 h-12 rounded-full mr-4"
      />
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-lg">{item.name}</Text>
          <Text className="text-gray-500 text-xs">
            {formatTime(item.timestamp)}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-gray-600 text-sm flex-1 mr-2" numberOfLines={1}>
            {item.lastMessage.length > 16
              ? `${item.lastMessage.slice(0, 24)}...`
              : item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View className="bg-primary rounded-full w-6 h-6 items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout isHeader isBack>
      <FlatList
        data={mockChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        className="flex-1 w-full"
      />
    </Layout>
  );
}
