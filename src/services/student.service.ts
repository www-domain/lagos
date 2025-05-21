import { request } from "@/helpers/axios.helper";

interface FetchStudentListParams{
    graduated?:number|null;
    search?:string
    page?:number;
}
// Get Student List
export const getStudentListApi = async (params:FetchStudentListParams) => {
    try {
      const { data } = await request.get("/driving-school/students", { params });
      return data;
    } catch (error) {
      throw error;
    }
  };


  // Get Admin Students Statistics: CARD
export const getStudentStatistics = async () => {
    const { data } = await request.get("/driving-school/students/stats");
    return data;
  };

  // View Students details
  export const getStudentDetails = async (studentNo: string) => {
    const { data } = await request.post(`/driving-school/students/details/${studentNo}`);
    return data;
  };

  // Get training Duration
  export const getTrainingDuration= async (id: number) => {
    const { data } = await request.get(`/driving-school/training-duration/${id}`);
    return data;
  };


  export const registerStudent = async (studentInfo: any) => {
    const { data } = await request.post("/driving-school/students/register", studentInfo);
    return data;
  };
  


