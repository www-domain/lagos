import { request } from "@/helpers/axios.helper";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface FetchPermitListParams {
  permitClassId?: number | null;
  search?: string;
  page?: number;
}

export type IssuePermitParams = {
  permitClassId: number;
  years: number;
  studentNo: string;
  reference: string;
};
// Get Permit List
export const getPermitListApi = async (params: FetchPermitListParams) => {
  try {
    const { data } = await request.get("/permit/list", { params });
    return data;
  } catch (error) {
    throw error;
  }
};

// Get Admin Permits Statistics: CARD
export const getPermitsStatistics = async () => {
  const { data } = await request.get("/permit/stats");
  return data;
};

// View Permits details
export const getPermitsDetails = async (permitNo: string) => {
  const { data } = await request.get(`/permit/details/${permitNo}`);
  return data;
};

//Issue Permit
export const issuePermitApi = async (params: IssuePermitParams) => {
  const { data } = await request.post("/permit/new-issuance",  params );
  return data;
};


export const useIssuePermit = () => {
  return useMutation({
    mutationFn: issuePermitApi,
    onError: (error) => {
      console.error("Error issuing permit:", error);
    },
  });
};
