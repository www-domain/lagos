import { useState } from "react";
import ErrorHandler from "../error.helper";
import { UploadFiletoS3 } from "@/services/file.service";

type uploadProps = {
  base64File: string;
  documentType: string;
  fileName: string;
  mimeType: uploadMimeType;
};

export type uploadMimeType =
  | "application/pdf"
  | "image/jpeg"
  | "image/png"
  | "image/jpg";

export const useFileUploader = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // Progress in percentage (0-100)

  const upload = async ({
    base64File,
    documentType,
    fileName,
    mimeType,
  }: uploadProps) => {
    try {
      setLoading(true);
      setProgress(0); // Reset progress at the start

      const response = await UploadFiletoS3({
        base64Image: base64File,
        documentType,
        fileName,
        mimeType,
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      return response;
    } catch (error) {
      ErrorHandler.parser(error as any);
      throw error; // Re-throw for caller to handle
    } finally {
      setLoading(false);
      setProgress(100); // Ensure progress reaches 100% when complete
    }
  };

  return { upload, loading, progress };
};