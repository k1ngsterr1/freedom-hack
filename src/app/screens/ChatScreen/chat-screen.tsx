import React, { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import { Ionicons } from "@expo/vector-icons";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  senderName: string;
  timestamp: Date;
}

const initialMessages: Message[] = [];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const currentUserName = "Вы";

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      senderName: currentUserName,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Layout isBack isHeader isChat isNoMarginBottom>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4">
          {messages.map((message) => (
            <View
              key={message.id}
              style={{
                alignItems:
                  message.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: 10,
              }}
            >
              {/* Контейнер для имени и сообщения */}
              <View
                style={{
                  maxWidth: "80%", // Ограничиваем максимальную ширину сообщения
                  backgroundColor:
                    message.sender === "user" ? "#4FB84F" : "#E5E5E5",
                  padding: 8,
                  borderRadius: 12,
                }}
              >
                {/* Имя отправителя */}
                <Text
                  className="text-xs text-gray-500 mb-1"
                  style={{
                    alignSelf: "flex-start",
                    color: message.sender === "user" ? "white" : "black",
                  }}
                >
                  {message.senderName}
                </Text>

                {/* Текст сообщения */}
                <Text
                  style={{
                    color: message.sender === "user" ? "white" : "black",
                  }}
                >
                  {message.text}
                </Text>
              </View>

              {/* Время сообщения */}
              <Text
                className="text-xs text-gray-500 mt-1"
                style={{
                  alignSelf:
                    message.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {formatTime(message.timestamp)}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View className="flex-row w-full items-center p-2">
          <TextInput
            className="flex-1 bg-gray-200 rounded-full px-4 py-4 mr-2"
            placeholder="Введите сообщение..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={28} color="#4FB84F" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}
