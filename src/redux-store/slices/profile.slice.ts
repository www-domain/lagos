import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    profileData: any; 
}

const initialState: ProfileState = {
    profileData: null,
   
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileData(state, action: PayloadAction<any>) {
            state.profileData= action.payload;
          },
      
    },
});

export const {  setProfileData } = profileSlice.actions;

export default profileSlice.reducer;