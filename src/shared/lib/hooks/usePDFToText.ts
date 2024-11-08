import { useState } from "react";
import * as FileSystem from "expo-file-system";
import { axiosInstance } from "./useInterceptor";

interface UsePDFToTextResult {
  uploadStatus: "idle" | "uploading" | "success" | "error";
  convertAndUploadPDF: (fileUri: string, fileName: string) => Promise<void>;
}

export const usePDFToText = (): UsePDFToTextResult => {
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const convertAndUploadPDF = async (fileUri: string, fileName: string) => {
    setUploadStatus("uploading");

    console.log("lol");

    try {
      const pdfConversionUrl = "https://api.pdf.co/v1/pdf/convert/to/text";

      // Convert PDF to text
      const pdfConversionResponse = await FileSystem.uploadAsync(
        pdfConversionUrl,
        fileUri,
        {
          fieldName: "file",
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            "x-api-key":
              "erlanzh.gg@gmail.com_93o4fU1vv05iDXvtd6pDQhyVeBwWgniWTt8xkzRZwXBxqUbeLNaPWF6zdfvnLJV7", // replace with your actual API key
          },
        }
      );

      if (
        pdfConversionResponse.status >= 200 &&
        pdfConversionResponse.status < 300
      ) {
        const { body: textContent } = JSON.parse(pdfConversionResponse.body);

        // Send the extracted text to the second endpoint using axiosInstance
        const addPdfUrl = "/application/add-pdf"; // Base URL is already set in axiosInstance
        const textUploadResponse = await axiosInstance.post(addPdfUrl, {
          text: textContent,
        });

        if (textUploadResponse.status === 200) {
          setUploadStatus("success");
        } else {
          setUploadStatus("error");
          console.error("Error in sending text content to add-pdf endpoint");
        }
      } else {
        setUploadStatus("error");
        console.error("Error converting PDF to text");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("error");
    }
  };

  return {
    uploadStatus,
    convertAndUploadPDF,
  };
};
