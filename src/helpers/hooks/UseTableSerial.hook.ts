import { useMemo } from "react";
import { CONSTANT_VALUES } from "../constants.helper";
 
type Props = {
  data: Record<string, any>[];
  currentPage: number;
  pageSize?: number;
};
 
// * Generate table serial numbers for records, being consistent across table paginations
export const useTableSerial = ({
  data,
  currentPage,
  pageSize = CONSTANT_VALUES.apiRecordListSize,
}: Props) => {
  const serials = useMemo(() => {
    const offset = (currentPage - 1) * pageSize;
    return data?.map((_: any, index: number) => index + offset + 1);
  }, [currentPage, data, pageSize]);
 
  return { serials };
};