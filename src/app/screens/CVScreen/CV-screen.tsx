import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { usePDFToText } from "@shared/lib/hooks/usePDFToText";

export const CVUploadScreen: React.FC = () => {
  const { uploadStatus, convertAndUploadPDF } = usePDFToText();
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentResult | null>(null);

  const pickDocument = async () => {
    console.log("kek lol");

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      setSelectedFile(result);
      console.log("result:", selectedFile);
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const handleUpload = () => {
    console.log("kek lol2");
    convertAndUploadPDF(selectedFile.uri, selectedFile.name);
  };

  return (
    <Layout isHeader>
      <View className="flex-1 w-full p-4">
        <Text className="text-2xl font-bold text-text mb-6">
          Upload Your CV
        </Text>

        <TouchableOpacity
          className="bg-white border-2 border-dashed border-primary rounded-xl p-8 items-center justify-center mb-6"
          onPress={pickDocument}
        >
          <Feather name="upload-cloud" size={48} color="#045433" />
          <Text className="text-primary mt-4 text-center">
            {selectedFile && selectedFile.type === "success"
              ? `Selected: ${selectedFile.name}`
              : "Tap to select a PDF file"}
          </Text>
        </TouchableOpacity>

        {selectedFile && (
          <TouchableOpacity
            className={`bg-primary py-3 px-6 rounded-full items-center mb-4 ${
              uploadStatus === "uploading" ? "opacity-50" : ""
            }`}
            onPress={handleUpload}
            disabled={uploadStatus === "uploading"}
          >
            <Text className="text-white font-semibold">
              {uploadStatus === "uploading" ? "Uploading..." : "Upload CV"}
            </Text>
          </TouchableOpacity>
        )}

        {uploadStatus === "success" && (
          <View className="bg-green-100 p-4 rounded-xl mb-4">
            <Text className="text-green-800">CV uploaded successfully!</Text>
          </View>
        )}

        {uploadStatus === "error" && (
          <View className="bg-red-100 p-4 rounded-xl mb-4">
            <Text className="text-red-800">
              Error uploading CV. Please try again.
            </Text>
          </View>
        )}
      </View>
    </Layout>
  );
};
