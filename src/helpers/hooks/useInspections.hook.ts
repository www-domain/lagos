import { useQuery } from "@tanstack/react-query";
import { TAB_TYPE } from "@/lib/utils";
import { IPermit } from "@/types";
import { getPermitListApi } from "@/services/permit.service";

interface IPermitResponse {
  result: IPermit[];
  pagination: Record<string, any>;
}
interface props {
  activeTab: TAB_TYPE;
  search?: string;
  page?: number;
}
export function usePermit({ activeTab, search, page }: props) {
  const permitClassId =
    activeTab === TAB_TYPE.LEARNERS_PERMIT
      ? 1
      : activeTab === TAB_TYPE.COVER_NOTE
      ? 2
      : null;
  return useQuery({
    queryKey: ["permits-", { activeTab, search, page }],
    queryFn: async () => {
      const {
        data,
      }: {
        data: IPermitResponse;
      } = await getPermitListApi({
        permitClassId,
        search,
        page,
      });
      return data
    },

  });
}
