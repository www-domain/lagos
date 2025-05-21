import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface UploadedFile {
  id: number;
  fileName: string;
  bucketKey: string;
  bucketName: string;
  mimeType: string;
  checksum: string;
  createdAt: string;
  documentType: string;
}

interface UploadState {
  uploadedFiles: UploadedFile[];
}

const initialState: UploadState = {
  uploadedFiles: [],
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    saveUploadedDocument: (state, action: PayloadAction<UploadedFile>) => {
      if (!state.uploadedFiles) {
        state.uploadedFiles = [];
      }
      const index = state?.uploadedFiles?.findIndex(
        (file) => file.documentType === action.payload.documentType
      );
      if (index !== -1) {
        state.uploadedFiles[index] = action.payload;
      } else {
        state.uploadedFiles.push(action.payload);
      }
    },
    clearUploadedDocuments: (state) => {
      state.uploadedFiles = [];
    },
  },
});

export const { saveUploadedDocument, clearUploadedDocuments } =
  uploadSlice.actions;
export const selectUploadedFiles = (state: RootState) =>
  state.uploadStore.uploadedFiles;
export default uploadSlice.reducer;
