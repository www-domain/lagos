import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PermitState {
  data: any | null; 
  permitReferenceData: any,
  issuePermitData: any,
  year:any,
  permitType:any
}

const initialState: PermitState = {
  data: null,
  permitReferenceData: null,
  year:null,
  permitType:null,
  issuePermitData:null,
};

const permitStore = createSlice({
  name: "permit",
  initialState,
  reducers: {
    setPermitData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setPermitReferenceData(state, action: PayloadAction<any>) {
      state.permitReferenceData= action.payload;
    },
    setIssuePermitData(state, action: PayloadAction<any>) {
      state.issuePermitData= action.payload;
    },
    setPermitType: (state, action: PayloadAction<number>) => {
      state.permitType = action.payload;
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
  },
});

export const { setPermitData,setPermitReferenceData,setPermitType,setYear ,setIssuePermitData} = permitStore.actions;
export default permitStore.reducer;
