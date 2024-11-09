import React, { useState } from "react";
import { View, TouchableOpacity, Image, Dimensions } from "react-native";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { usePDFToText } from "@shared/lib/hooks/usePDFToText";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export const CVUploadScreen: React.FC = () => {
  const { uploadStatus, convertAndUploadPDF } = usePDFToText();
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentResult | null>(null);
  const navigation = useNavigation();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const document = result.assets[0];
        setSelectedFile(document);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      convertAndUploadPDF(selectedFile.uri, selectedFile.name);
    }
  };

  return (
    <Layout isHeader>
      <View className="flex-1 w-full p-6">
        <Text className="text-3xl font-bold text-text mb-8 text-center">
          Upload Your CV
        </Text>

        <TouchableOpacity
          className="bg-white border-2 border-dashed border-primary rounded-2xl p-8 items-center justify-center mb-6 shadow-md"
          onPress={pickDocument}
        >
          <View className="bg-primary bg-opacity-10 rounded-full p-4 mb-4">
            <Feather name="upload-cloud" size={48} color="#045433" />
          </View>
          <Text className="text-primary text-lg font-semibold text-center">
            {selectedFile
              ? `Selected: ${selectedFile.name}`
              : "Tap to select a PDF file"}
          </Text>
          {!selectedFile && (
            <Text className="text-secondary text-sm mt-2 text-center">
              Supported format: PDF
            </Text>
          )}
        </TouchableOpacity>

        {selectedFile && (
          <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
            <TouchableOpacity
              className={`bg-primary py-4 px-6 rounded-full items-center mb-4 shadow-lg ${
                uploadStatus === "uploading" ? "opacity-50" : ""
              }`}
              onPress={handleUpload}
              disabled={uploadStatus === "uploading"}
            >
              <Text className="text-white font-bold text-lg">
                {uploadStatus === "uploading" ? "Uploading..." : "Upload CV"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {uploadStatus === "success" && (
          <Animated.View
            className="bg-green-100 p-4 rounded-xl mb-4 flex-row items-center"
            entering={FadeInDown}
            exiting={FadeOutDown}
          >
            <Feather
              name="check-circle"
              size={24}
              color="#059669"
              className="mr-2"
            />
            <Text className="text-green-800 font-semibold">
              CV uploaded successfully!
            </Text>
          </Animated.View>
        )}

        {uploadStatus === "error" && (
          <Animated.View
            className="bg-red-100 p-4 rounded-xl mb-4 flex-row items-center"
            entering={FadeInDown}
            exiting={FadeOutDown}
          >
            <Feather
              name="alert-circle"
              size={24}
              color="#DC2626"
              className="mr-2"
            />
            <Text className="text-red-800 font-semibold">
              Error uploading CV. Please try again.
            </Text>
          </Animated.View>
        )}

        <TouchableOpacity
          className="mt-4 py-2 px-4 rounded-full border border-primary"
          onPress={() => navigation.navigate("Home" as never)}
        >
          <Text className="text-primary text-center">Пропустить</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};
