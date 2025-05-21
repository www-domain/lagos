import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { REGISTRATION_STEPS } from "@/lib/utils"

export interface StudentState {
  middleName: string
  title: string
  mothersMaidenName: string
  phoneNumber: string
  address: string
  lgaOfOrigin: string
  placeOfBirth: string
  occupation: string
  maritalStatus: string
  bloodGroup: string
  nameOfNextOfKin: string
  relationshipWithNextOfKin: string
  phoneNumberOfNextOfKin: string
  nationalityOfNextOfKin: string
  level: string
  duration: string
  permitType: string
  registrationStep: string
  nationality:string
}

const initialState: StudentState = {
  middleName: "",
  title: "",
  mothersMaidenName: "",
  phoneNumber: "",
  address: "",
  lgaOfOrigin: "",
  placeOfBirth: "",
  occupation: "",
  maritalStatus: "",
  nationality:"",
  bloodGroup: "",
  nameOfNextOfKin: "",
  relationshipWithNextOfKin: "",
  phoneNumberOfNextOfKin: "",
  nationalityOfNextOfKin: "",
  level: "",
  duration: "",
  permitType: "",
  registrationStep: REGISTRATION_STEPS.STUDENT_INFORMATION,
}

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updateStudentInfo: (state, action: PayloadAction<Partial<StudentState>>) => {
      return { ...state, ...action.payload }
    },
    setRegistrationStep: (state, action: PayloadAction<string>) => {
      state.registrationStep = action.payload
    },
  },
})

export const { updateStudentInfo, setRegistrationStep } = studentSlice.actions
export default studentSlice.reducer

