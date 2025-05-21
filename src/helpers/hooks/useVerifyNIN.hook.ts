import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import {} from "@/helpers/axios.helper";
import { verifyNinApi } from "@/services/auth.service";
import { toast } from "sonner";

interface props {
  nin: string;
}
export function useVerifyNIN(options?:UseMutationOptions<any,unknown,props>) {
  return useMutation({
    mutationFn: async ({nin}:props) => {
      if (!nin || nin.length < 11) throw new Error("Invalid NIN");
      const data  = await verifyNinApi(nin);
      return data;
    },
    ...options
  });
}
