import { request } from "@/helpers/axios.helper";

interface FetchApplicationListParams {
  regStatus: number | null;
  search?: string;
  page?: number;
}
// Get Application List
export const getApplicationListApi = async (
  params: FetchApplicationListParams
) => {
  try {
    const { data } = await request.get("/driving-school/applications/list", {
      params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// Get Admin Applications Statistics: CARD
export const getApplicationStatistics = async () => {
  const { data } = await request.get("/driving-school/applications/stats");
  return data;
};

// View Applications details
export const getApplicationDetails = async (applicationNo: string) => {
  const { data } = await request.post(`/driving-school/applications/details`, 
     { applicationId: applicationNo },
);
  return data;
};
