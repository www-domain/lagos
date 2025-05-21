import { request } from "@/helpers/axios.helper";


// Get Inspection List
export const getInspectionListApi = async (params: Record<string, any>) => {
    try {
      const { data } = await request.get("/inspections", { params });
      return data.data.result;
    } catch (error) {
      throw error;
    }
  };