"use client";
import ReusableTable from "@/components/ReusableTable";
import Sidebar from "@/components/sidebar";
import PaginationComponent from "@/components/ui/pagination";
import { CONSTANT_VALUES } from "@/helpers/constants.helper";
import { ROUTES } from "@/helpers/constants/routes.constant";
import useDebounce from "@/helpers/hooks/useDebounce";
import { useTableSerial } from "@/helpers/hooks/UseTableSerial.hook";
import { getInspectionListApi } from "@/services/inspection.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Eye, MoreHorizontal, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Inspection() {
  const [search, setSearch] = useState("");
  const debouncedSearchQuery = useDebounce(search, 1000);
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  const { data: inspectionData, isLoading: isFetchingInspectionData,  } =
    useQuery({
      queryKey: ["inspectionData", { search: debouncedSearchQuery, page: currentPaginationIndex }],
      queryFn: () =>
        getInspectionListApi({
          resultPerPage: CONSTANT_VALUES.apiRecordListSize,
          page: currentPaginationIndex,
          search:debouncedSearchQuery
        }),
      placeholderData: keepPreviousData,
    });

  const { serials } = useTableSerial({
    data: inspectionData?.result,
    currentPage: currentPaginationIndex,
  });

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-menu")) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const columns = [
    {
      label: <span>S/N</span>,
      key: (data: any) => <div className="font-semibold">{data?.id}</div>,
    },
    {
      label: <span>NAME</span>,
      key: (data: any) => <div className="font-semibold text-xs">{data?.name || "N/A"}</div>,
    },
    {
      label: <span>COMMENT</span>,
      key: (data: any) => <div className="font-semibold text-xs ">{data?.comment || "N/A"}</div>,
    },
    {
      label: <span>DATE</span>,
      key: (data: any) => <div className="font-semibold text-xs">{new Date(data?.createdAt).toDateString() || "N/A"}</div>,
    },
    {
      label: <span>STATUS</span>,
      key: (data: any) => <div className="font-semibold text-xs uppercase">{data?.status || "N/A"}</div>,
    },
  ];

  return (
    <main className="relative isolate">
      <Sidebar>
        <h1 className="text-3xl text-gray-700 font-bold">Inspection</h1>

        <div className="my-4 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 border rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <ReusableTable
          columns={columns}
          data={inspectionData || []}
          serials={serials}
          loading={isFetchingInspectionData}
          isEmpty={!isFetchingInspectionData && !inspectionData?.length}
          renderActions={(data) => (
            <div className="relative dropdown-menu">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdownId(activeDropdownId === data.id ? null : data.id);
                }}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <MoreHorizontal size={16} />
              </button>
              {activeDropdownId === data.id && (
                <div className="right-4 mt-2 w-28 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <Link
                    to={`${ROUTES.STUDENTS}/${data.id}`}
                    className="px-4 py-2 text-sm text-white bg-[#1E73BE] border rounded-md flex items-center"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        />

        <div className="flex justify-end mt-4">
          <PaginationComponent
            maxPages={Math.ceil((inspectionData?.data?.pagination?.total || 0) / CONSTANT_VALUES.apiRecordListSize)}
            getCurrentPage={setCurrentPaginationIndex}
            page={currentPaginationIndex}
          />
        </div>
      </Sidebar>
    </main>
  );
}
