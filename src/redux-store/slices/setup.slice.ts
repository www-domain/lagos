import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ValidateFacilityForm = {
  numberOfVehicles: string;
  typeOfVehicle: string[] | any;
  vehicleSpecialGadget: string;
  numberOfSimulators: string;
  teachingAids: string;
  trainingRangeLocation: string;
  numberOfClassrooms: string;
  classRoomCapacity: string;
};

export type InstructorForm = {
  totalInstructors: string;
  instructorIDs: string[];
};

export type SupportingDocumentsForm = {
  fileName: string;
};

export type PaymentReferenceForm = {
  paymentReference: string;
};

const initialState = {
  validateFacilityForm: {
    numberOfVehicles: "",
    typeOfVehicle: [],
    vehicleSpecialGadget: "",
    numberOfSimulators: "",
    teachingAids: "",
    trainingRangeLocation: "",
    numberOfClassrooms: "",
    classRoomCapacity: "",
  } as ValidateFacilityForm,

  instructorForm: {
    totalInstructors: "",
    instructorIDs: [],
  } as InstructorForm,

  supportingDocumentsForm: {
    fileName: "",
  } as SupportingDocumentsForm,

  paymentReferenceForm: {
    paymentReference: "",
  } as PaymentReferenceForm,
};

const setupStore = createSlice({
  name: "setupStore",
  initialState,
  reducers: {
    updateValidateFacilityForm: (
      state,
      action: PayloadAction<Partial<ValidateFacilityForm>>
    ) => {
      state.validateFacilityForm = {
        ...state.validateFacilityForm,
        ...action.payload,
      };
    },
    resetValidateFacilityForm: (state) => {
      state.validateFacilityForm = initialState.validateFacilityForm;
    },

    updateInstructorForm: (
      state,
      action: PayloadAction<Partial<InstructorForm>>
    ) => {
      state.instructorForm = {
        ...state.instructorForm,
        ...action.payload,
      };
    },
    resetInstructorForm: (state) => {
      state.instructorForm = initialState.instructorForm;
    },

    updateSupportingDocumentsForm: (
      state,
      action: PayloadAction<Partial<SupportingDocumentsForm>>
    ) => {
      state.supportingDocumentsForm = {
        ...state.supportingDocumentsForm,
        ...action.payload,
      };
    },
    resetSupportingDocumentsForm: (state) => {
      state.supportingDocumentsForm = initialState.supportingDocumentsForm;
    },

    updatePaymentReferenceForm: (
      state,
      action: PayloadAction<Partial<PaymentReferenceForm>>
    ) => {
      state.paymentReferenceForm = {
        ...state.paymentReferenceForm,
        ...action.payload,
      };
    },
    resetPaymentReferenceForm: (state) => {
      state.paymentReferenceForm = initialState.paymentReferenceForm;
    },
  },
});

export const {
  updateValidateFacilityForm,
  resetValidateFacilityForm,
  updateInstructorForm,
  resetInstructorForm,
  updateSupportingDocumentsForm,
  resetSupportingDocumentsForm,
  updatePaymentReferenceForm,
  resetPaymentReferenceForm,
} = setupStore.actions;
export default setupStore.reducer;
