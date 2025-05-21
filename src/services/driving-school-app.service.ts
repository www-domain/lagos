import { request } from "@/helpers/axios.helper";

export type CompleteRegistrationPayload = {
  totalVehicles: number;
  vehicleTypes: string[];
  specialGadgets: string;
  totalSimulators: number;
  teachingAids: string;
  trainingRange: string;
  totalClassrooms: number;
  classRoomCapacity: string;
  totalInstructors: number;
  instructorIDs: string[];
  docType: string;
  docFile: string;
};
export const validateInstructorService = async (payload: {
  index: number;
  id: string;
}) => {
  try {
    const { data } = await request.get(`/instructors/validate/${payload?.id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const completeRegistrationService = async (
  payload: CompleteRegistrationPayload
) => {
  try {
    const { data } = await request.post(
      `/driving-school/complete-application`,
      {
        ...payload,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// /users/driving-school-application

export const getApplicationStatusService = async () => {
  const { data } = await request.get(`/users/driving-school-application`);
  return data;
};
