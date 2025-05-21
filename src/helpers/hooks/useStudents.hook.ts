import { useQuery } from "@tanstack/react-query";
import { TAB_TYPE } from "@/lib/utils";
import { getStudentListApi } from "@/services/student.service";
import { IStudent } from "@/types";

interface IStudentResponse {
  result: IStudent[];
  pagination: Record<string, any>;
}
interface props {
  activeTab: TAB_TYPE;
  search?: string;
  page?: number;
}
export function useStudents({ activeTab, search, page }: props) {
  const graduated =
    activeTab === TAB_TYPE.COMPLETED
      ? 1
      : activeTab === TAB_TYPE.ONGOING
      ? 0
      : null;
  return useQuery({
    queryKey: ["students", { activeTab, search, page }],
    queryFn: async () => {
      const {
        data,
      }: {
        data: IStudentResponse;
      } = await getStudentListApi({
        graduated,
        search,
        page,
      });
      return data
    },

  });
}
