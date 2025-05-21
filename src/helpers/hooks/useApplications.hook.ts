import { useQuery } from "@tanstack/react-query";
import { TAB_TYPE } from "@/lib/utils";
import { getApplicationListApi } from "@/services/application.service";
import { IApplication } from "@/types";

interface IApplicationResponse {
  result: IApplication[];
  pagination: Record<string, any>;
}

interface Props {
  activeTab: TAB_TYPE;
  search?: string;
  page?: number;
}

export function useApplications({ activeTab, search, page }: Props) {
  const status =
    activeTab === TAB_TYPE.ACKNOWLEDGED_APPLICATIONS
      ? 1
      : activeTab === TAB_TYPE.PENDING_APPLICATIONS
      ? 0
      : null;

  return useQuery({
    queryKey: ["applications", { activeTab, search, page }],
    queryFn: async () => {
      const { data }: { data: IApplicationResponse } =
        await getApplicationListApi({
          regStatus:status,
          search,
          page,
        });
      return data;
    },
  });
}
