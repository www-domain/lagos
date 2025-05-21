import { request } from "@/helpers/axios.helper";

export const userProfileApi = async () => {
  try {
    const { data } = await request.get("/users/me");
    return data;
  } catch (error) {
    throw error;
  }
};

export const drivingSchoolProfileApi = async (id: number) => {
  try {
    const { data } = await request.get(`/driving-school/single/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
