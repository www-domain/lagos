// src/redux/slices/changePasswordSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChangePasswordState {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  otp?: string;
  email?: string;
  isPasswordChanged?: boolean;
}

const initialState: ChangePasswordState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  otp: '',
  email: '',
  isPasswordChanged: false,
};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    setCurrentPassword: (state, action: PayloadAction<string>) => {
      state.currentPassword = action.payload;
    },
    setNewPassword: (state, action: PayloadAction<string>) => {
      state.newPassword = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setOTP: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    confirmPasswordChange: (state) => {
      if (state.newPassword === state.confirmPassword) {
        state.isPasswordChanged = true;
      } else {
        state.isPasswordChanged = false;
      }
    },
  },
});

export const { setCurrentPassword, setNewPassword, setConfirmPassword, setOTP, setEmail, confirmPasswordChange } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;