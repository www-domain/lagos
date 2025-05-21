"use client";
import MetricCard from "@/components/metric-card";
import Sidebar from "@/components/sidebar";
import TransparentMetricCard from "@/components/transparent-metric-card";
import { MetricCardSkeleton } from "@/components/ui/metric-card-loader";
import PaginationComponent from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/table-loader";
import { CONSTANT_VALUES } from "@/helpers/constants.helper";
import {
  redPeople,
  yellowPeople,
  greenPeople,
  bluePeople,
} from "@/helpers/constants/image.constant";
import { ROUTES } from "@/helpers/constants/routes.constant";
import { usePermit } from "@/helpers/hooks/useInspections.hook";
import { useTableSerial } from "@/helpers/hooks/UseTableSerial.hook";
import { getPermitTypeName } from "@/helpers/methods.helper";
import { TAB_TYPE } from "@/lib/utils";
import { getPermitsStatistics } from "@/services/permit.service";

import { useQuery } from "@tanstack/react-query";
import { Eye, MoreHorizontal, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Permits() {
  const navigate = useNavigate();
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);
  const [activeTab, setActiveTab] = useState(TAB_TYPE.ISSUED_PERMITS);
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = (id: number) => {
    setActiveDropdownId((prevId) => (prevId === id ? null : id));
  };
  const closeDropdown = () => {
    setActiveDropdownId(null);
  };
  const {
    data,
    isLoading: loadingPermits,
    isError: errorPermits,
  } = usePermit({
    activeTab,
    search: searchTerm,
    page: currentPaginationIndex,
  });

  // Get Permits stats
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ["get_permits_card_statistics"],
    queryFn: getPermitsStatistics,
  });

  // Get Table Serial Numbers
  const { serials } = useTableSerial({
    data: data?.result as any,
    currentPage: currentPaginationIndex,
  });

  const handleTabUpdate = (tab: TAB_TYPE) => {
    setCurrentPaginationIndex(1);
    setActiveTab(tab);
  };

  
  

  return (
    <main className="relative isolate">
      <Sidebar>
        <h1 className="text-3xl text-gray-700 font-bold">Permits</h1>

        {activeTab === TAB_TYPE.ISSUED_PERMITS && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadingStats ? (
              <>
                <MetricCardSkeleton />
                <MetricCardSkeleton />
                <MetricCardSkeleton />
              </>
            ) : (
              <>
                <MetricCard
                  title="Issued Permits"
                  value={stats?.data?.totalPermits}
                  showCurrency={false}
                  change={1.7}
                  image={redPeople}
                  backgroundColour="bg-[#FFD6D4]"
                />
                <MetricCard
                  title="Learner's Permits"
                  value={stats?.data?.learnersPermits}
                  showCurrency={false}
                  change={1.3}
                  image={yellowPeople}
                  backgroundColour="bg-[#FFF5D0]"
                />
                <MetricCard
                  title="Cover Notes"
                  value={stats?.data?.coverNotePermits}
                  showCurrency={false}
                  change={1.7}
                  image={greenPeople}
                  backgroundColour="bg-[#CFFFDA]"
                />
              </>
            )}
          </div>
        )}

        {activeTab === TAB_TYPE.LEARNERS_PERMIT && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadingStats ? (
              <MetricCardSkeleton />
            ) : (
              <TransparentMetricCard
                title="Learner's Permit"
                value={stats?.data?.learnersPermits}
                image={bluePeople}
                backgroundColour="bg-transparent"
              />
            )}
          </div>
        )}

        {activeTab === TAB_TYPE.COVER_NOTE && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadingStats ? (
              <MetricCardSkeleton />
            ) : (
              <TransparentMetricCard
                title="Cover Notes"
                value={stats?.data?.coverNotePermits}
                image={bluePeople}
                backgroundColour="bg-transparent"
              />
            )}
          </div>
        )}

        <div className="mt-8">
          <div className="mx-auto">
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 pl-10 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            <div className="flex justify-end mt-8">
              <div>
                {" "}
                <button
                  onClick={() =>
                    navigate(`${ROUTES.PERMITS}${ROUTES.SEARCH_STUDENT}`)
                  }
                  className="bg-[#107BC0] text-white text-sm px-4 py-2 rounded-sm flex items-center"
                >
                  <Plus className="h-4 w-4" />
                  Issue Permit
                </button>
              </div>
            </div>
            <>
              {loadingPermits ? (
                <TableSkeleton />
              ) : (
                <>
                  <div className="mt-4 mb-4 border-b">
                    <button
                      className={`mr-4 pb-2 ${
                        activeTab === TAB_TYPE.ISSUED_PERMITS
                          ? "border-b-2 border-black text-sm font-medium"
                          : "text-sm"
                      }`}
                      onClick={() => {
                        handleTabUpdate(TAB_TYPE.ISSUED_PERMITS);
                      }}
                    >
                      Issued Permits
                    </button>
                    <button
                      className={`mr-4 pb-2 ${
                        activeTab === TAB_TYPE.LEARNERS_PERMIT
                          ? "border-b-2 border-black text-sm font-medium"
                          : "text-sm"
                      }`}
                      onClick={() => {
                        handleTabUpdate(TAB_TYPE.LEARNERS_PERMIT);
                      }}
                    >
                      Learner's Permits
                    </button>
                    <button
                      className={`mr-4 pb-2 ${
                        activeTab === TAB_TYPE.COVER_NOTE
                          ? "border-b-2 border-black text-sm font-medium"
                          : "text-sm"
                      }`}
                      onClick={() => {
                        handleTabUpdate(TAB_TYPE.COVER_NOTE);
                      }}
                    >
                      Cover Notes
                    </button>
                  </div>

                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left text-sm font-light text-[#107BC0]">
                        <th className="p-2 border-b">
                          {" "}
                          <input type="checkbox" />
                        </th>
                        <th className="p-2 border-b font-normal">S/N</th>
                        <th className="p-2 border-b font-normal">NAME</th>
                        <th className="p-2 border-b font-normal">STUDENT ID</th>
                        <th className="p-2 border-b font-normal">
                          PHONE NUMBER
                        </th>
                        <th className="p-2 border-b font-normal">
                          EMAIL ADDRESS
                        </th>
                        <th className="p-2 border-b font-normal">DATE</th>
                        <th className="p-2 border-b font-normal">
                          PERMIT TYPE
                        </th>
                        <th className="p-2 border-b font-normal">ACTION</th>
                      </tr>
                    </thead>
                    {activeTab === TAB_TYPE.ISSUED_PERMITS && (
                      <tbody>
                        {data?.result?.map((permit, index) => (
                          <tr key={permit.id} className="border-b text-sm">
                            <td className="p-2">
                              <input type="checkbox" />
                            </td>
                            <td className="p-2">{serials[index]}</td>
                            <td className="p-2">
                              {" "}
                              {permit?.firstName} {""}
                              {permit?.lastName}
                            </td>
                            <td className="p-2">{permit?.student?.studentNo}</td>
                            <td className="p-2">{permit?.phone}</td>
                            <td className="p-2">{permit?.email}</td>
                            <td className="p-2">
                              {" "}
                              {new Date(permit?.createdAt).toDateString()}
                            </td>
                            <td className="p-2">{permit?.permitClassId? getPermitTypeName(permit?.permitClassId) :"N/A"}</td>
                            <td className="p-2">
                              <div className="relative">
                                {/* Button to toggle dropdown */}
                                <button
                                  onClick={() => toggleDropdown(permit?.permitNo)}
                                  className="p-1 rounded-full hover:bg-gray-200"
                                >
                                  <MoreHorizontal size={16} />
                                </button>

                                {/* Dropdown menu */}
                                {activeDropdownId === permit?.permitNo && (
                                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
                                    <Link
                                      to={`${ROUTES.PERMITS}/${permit?.permitNo}?permit=true`}
                                      className=" px-4 py-2 text-sm text-white bg-[#1E73BE] border rounded-md flex items-center"
                                      onClick={closeDropdown}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>View</span>
                                    </Link>
                                  </div>
                                )}

                                {/* Close dropdown when clicking outside */}
                                {activeDropdownId === permit?.permitNo && (
                                  <div
                                    className="fixed inset-0 z-0"
                                    onClick={closeDropdown}
                                    aria-hidden="true"
                                  ></div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}

                    {activeTab === TAB_TYPE.LEARNERS_PERMIT && (
                      <tbody>
                        {data?.result?.map((permit, index) => (
                          <tr key={permit.id} className="border-b text-sm">
                            <td className="p-2">
                              <input type="checkbox" />
                            </td>
                            <td className="p-2">{serials[index]}</td>
                            <td className="p-2">
                              {permit?.firstName} {""}
                              {permit?.lastName}
                            </td>
                            <td className="p-2">{permit?.student?.studentNo}</td>
                            <td className="p-2">{permit?.phone}</td>
                            <td className="p-2">{permit?.email}</td>
                            <td className="p-2">
                              {" "}
                              {new Date(
                                permit?.createdAt
                              ).toDateString()}
                            </td>
                            <td className="p-2">{permit?.permitClassId? getPermitTypeName(permit?.permitClassId) :"N/A"}</td>
                            <td className="p-2">
                              <div className="relative">
                                {/* Button to toggle dropdown */}
                                <button
                                  onClick={() => toggleDropdown(permit?.permitNo)}
                                  className="p-1 rounded-full hover:bg-gray-200"
                                >
                                  <MoreHorizontal size={16} />
                                </button>

                                {/* Dropdown menu */}
                                {activeDropdownId === permit?.permitNo && (
                                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
                                    <Link
                                      to={`${ROUTES.PERMITS}/${permit?.permitNo}`}
                                      className="px-4 py-2 text-sm text-white bg-[#1E73BE] border rounded-md flex items-center"
                                      onClick={closeDropdown}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>View</span>
                                    </Link>
                                  </div>
                                )}

                                {/* Close dropdown when clicking outside */}
                                {activeDropdownId === permit?.permitNo && (
                                  <div
                                    className="fixed inset-0 z-0"
                                    onClick={closeDropdown}
                                    aria-hidden="true"
                                  ></div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}

                    {activeTab === TAB_TYPE.COVER_NOTE && (
                      <tbody>
                        {data?.result?.map((permit, index) => (
                          <tr key={permit.id} className="border-b text-sm">
                            <td className="p-2">
                              <input type="checkbox" />
                            </td>
                            <td className="p-2">{serials[index]}</td>
                            <td className="p-2">
                              {permit?.firstName} {""}
                              {permit?.lastName}
                            </td>
                            <td className="p-2">{permit?.student?.studentNo}</td>
                            <td className="p-2">{permit?.phone}</td>
                            <td className="p-2">{permit?.email}</td>
                            <td className="p-2">
                              {new Date(permit?.createdAt).toDateString()}
                            </td>
                            <td className="p-2">{permit?.permitClassId? getPermitTypeName(permit?.permitClassId) :"N/A"}</td>
                            <td className="p-2">
                              <div className="relative">
                                {/* Button to toggle dropdown */}
                                <button
                                  onClick={() => toggleDropdown(permit?.permitNo)}
                                  className="p-1 rounded-full hover:bg-gray-200"
                                >
                                  <MoreHorizontal size={16} />
                                </button>

                                {/* Dropdown menu */}
                                {activeDropdownId === permit?.permitNo && (
                                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
                                    <Link
                                      to={`${ROUTES.PERMITS}/${permit?.permitNo}`}
                                      className="px-4 py-2 text-sm text-white bg-[#1E73BE] border rounded-md flex items-center"
                                      onClick={closeDropdown}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>View</span>
                                    </Link>
                                  </div>
                                )}

                                {/* Close dropdown when clicking outside */}
                                {activeDropdownId === permit.permitNo && (
                                  <div
                                    className="fixed inset-0 z-0"
                                    onClick={closeDropdown}
                                    aria-hidden="true"
                                  ></div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                  <div className="flex mt-3 w-full justify-end">
                    <PaginationComponent
                      maxPages={Math.ceil(
                        (data?.pagination?.total || 0) /
                          CONSTANT_VALUES.queryResultsPerPage
                      )}
                      getCurrentPage={setCurrentPaginationIndex}
                      page={currentPaginationIndex}
                    />
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      </Sidebar>
    </main>
  );
}
