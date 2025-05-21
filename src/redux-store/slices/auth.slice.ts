import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email?: string;
 drivingSchoolId?: number;
  password: string;
  isLoggedIn: boolean;
  isFirstTime:boolean;
}

const initialState: UserState = {
  email: '',
  password: '',
  isLoggedIn: false,
  isFirstTime:false,
  drivingSchoolId:undefined,
  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Partial<UserState>>) => {
      state.drivingSchoolId = action.payload.drivingSchoolId;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.email = '';
      state.password = '';
      state.drivingSchoolId = undefined;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
    initializeUser: (state, action: PayloadAction<{ email: string; isLoggedIn: boolean ; drivingSchoolId?: number;}>) => {
      state.email = action.payload.email;
      state.drivingSchoolId = action.payload.drivingSchoolId;

      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const { login, logout, initializeUser } = userSlice.actions;
export default userSlice.reducer;