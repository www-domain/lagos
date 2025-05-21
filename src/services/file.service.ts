import { request } from "@/helpers/axios.helper";
import axios, { AxiosProgressEvent } from "axios";

type UploadFile = {
  fileName: string;
  mimeType: string;
  base64Image: string;
  documentType: string;
  onUploadProgress?: (progressEvent: any) => void; // Add progress callback
};

export const UploadFiletoS3 = async (params: UploadFile) => {
  const { onUploadProgress, ...uploadData } = params; // Destructure to separate config
  const { data } = await request.post("/files", uploadData, {
    onUploadProgress,
  });
  return data;
};
