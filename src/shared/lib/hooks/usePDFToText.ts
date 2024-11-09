import { useState } from "react";
import { axiosInstance } from "./useInterceptor";
import axios from "axios";

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

    try {
      const pdfUploadUrl = "https://api.pdf.co/v1/file/upload";
      const pdfConversionUrl = "https://api.pdf.co/v1/pdf/convert/to/text";

      console.log("[PDF Upload] Starting upload process");

      // Step 1: Upload PDF to PDF.co to get a temporary file URL
      let fileUrl = "";
      try {
        const formData = new FormData();
        formData.append("file", {
          uri: fileUri,
          type: "application/pdf",
          name: fileName,
        } as any);

        const uploadResponse = await axios.post(pdfUploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key":
              "erlanzh.gg@gmail.com_93o4fU1vv05iDXvtd6pDQhyVeBwWgniWTt8xkzRZwXBxqUbeLNaPWF6zdfvnLJV7", // Replace with your actual API key
          },
        });

        if (uploadResponse?.data?.url) {
          fileUrl = uploadResponse.data.url;
          console.log(
            `[PDF Upload] File uploaded successfully. File URL: ${fileUrl}`
          );
        } else {
          throw new Error("Upload failed: No URL returned from PDF.co");
        }
      } catch (error: any) {
        console.error("[PDF Upload] Upload failed:", error.message || error);
        setUploadStatus("error");
        return;
      }

      // Step 2: Convert the uploaded PDF to text using the file URL
      console.log("[PDF Conversion] Starting conversion process");

      let textFileUrl = "";
      try {
        const conversionResponse = await axios.post(
          pdfConversionUrl,
          { url: fileUrl },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "erlanzh.gg@gmail.com_93o4fU1vv05iDXvtd6pDQhyVeBwWgniWTt8xkzRZwXBxqUbeLNaPWF6zdfvnLJV7", // Replace with your actual API key
            },
          }
        );

        if (conversionResponse?.data?.url) {
          textFileUrl = conversionResponse.data.url;
          console.log(
            "[PDF Conversion] Conversion successful. Text file URL:",
            textFileUrl
          );
        } else {
          throw new Error(
            "Conversion failed: No text file URL returned from PDF.co"
          );
        }
      } catch (error: any) {
        console.error(
          "[PDF Conversion] Conversion failed:",
          error.message || error
        );
        setUploadStatus("error");
        return;
      }

      let textContent = "";
      try {
        const textResponse = await axios.get(textFileUrl, {
          responseType: "text", // Ensure response is returned as text
        });
        textContent = textResponse.data;
        console.log("[Text Fetch] Fetched text content:", textContent);
      } catch (error: any) {
        console.error(
          "[Text Fetch] Failed to fetch text content:",
          error.message || error
        );
        setUploadStatus("error");
        return;
      }

      // Step 4: Send the extracted text to your backend endpoint
      try {
        const addPdfUrl = "/applications/add-pdf";
        const textUploadResponse = await axiosInstance.post(addPdfUrl, {
          text: textContent,
        });

        if (textUploadResponse.status === 200) {
          setUploadStatus("success");
          console.log(
            "[Text Upload] Text content successfully uploaded to backend"
          );
        } else {
          throw new Error("Text upload failed: Non-200 response status");
        }
      } catch (error: any) {
        console.error(
          "[Text Upload] Text upload failed:",
          error.message || error
        );
        setUploadStatus("error");
      }
    } catch (error: any) {
      console.error(
        "[Error] Unexpected error during PDF processing:",
        error.message || error
      );
      setUploadStatus("error");
    }
  };

  return {
    uploadStatus,
    convertAndUploadPDF,
  };
};
