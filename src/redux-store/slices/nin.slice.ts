import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NinState {
  data: any;
  email: string | null; 
  nin: string; 
  referenceData: any,

}

const initialState: NinState = {
  data: null,
  email: null, 
  nin:"",
  referenceData: null,
};

const ninStore = createSlice({
  name: 'nin',
  initialState,
  reducers: {
    setNinData: (state: NinState, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setEmail: (state: NinState, action: PayloadAction<string | null>) => {
      state.email = action.payload; 

    },
    setNin: (state, action: PayloadAction<string>) => {
      state.nin = action.payload; 
    },
    setReferenceData(state, action: PayloadAction<any>) {
      state.referenceData = action.payload;
    },
    
  },
});

export const { setNinData, setEmail, setNin, setReferenceData,  } = ninStore.actions;

export default ninStore.reducer;
