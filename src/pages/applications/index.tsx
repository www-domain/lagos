"use client";
import MetricCard from "@/components/metric-card";
import Sidebar from "@/components/sidebar";
import TransparentMetricCard from "@/components/transparent-metric-card";
import { MetricCardSkeleton } from "@/components/ui/metric-card-loader";
import PaginationComponent from "@/components/ui/pagination";
import { Status } from "@/components/ui/status";
import { TableSkeleton } from "@/components/ui/table-loader";
import { CONSTANT_VALUES } from "@/helpers/constants.helper";
import {
  redPeople,
  yellowPeople,
  greenPeople,
  completedBadge,
  ongoingBadge,
  bluePeople,
} from "@/helpers/constants/image.constant";
import { ROUTES } from "@/helpers/constants/routes.constant";
import { useApplications } from "@/helpers/hooks/useApplications.hook";
import { useTableSerial } from "@/helpers/hooks/UseTableSerial.hook";
import { TAB_TYPE } from "@/lib/utils";
import { getApplicationStatistics } from "@/services/application.service";
import { useQuery } from "@tanstack/react-query";
import { Eye, MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Applications() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(TAB_TYPE.ALL_APPLICATIONS);
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);
  const [activeDropdownId, setActiveDropdownId] = useState<
    number | null | string
  >(null);

  const {
    data,
    isLoading: loadingApplications,
    isError: errorApplications,
  } = useApplications({
    activeTab,
    search: searchTerm,
    page: currentPaginationIndex,
  
  });

  const toggleDropdown = (id: number) => {
    setActiveDropdownId((prevId) => (prevId === id ? null : id));
  };
  const closeDropdown = () => {
    setActiveDropdownId(null);
  };

  // Get Applications stats
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ["get_applications_card_statistics"],
    queryFn: getApplicationStatistics,
  });

  if (errorApplications) return <div>Error fetching applications</div>

  const { serials } = useTableSerial({
    data: data?.result as any,
    currentPage: currentPaginationIndex,
  });

  const handleTabUpdate=(tab:TAB_TYPE)=>{
    setCurrentPaginationIndex(1);
    setActiveTab(tab)
  }

  return (
    <main className="relative isolate">
      <Sidebar>
        <h1 className="text-3xl text-gray-700 font-bold">Applications</h1>

        {activeTab === TAB_TYPE.ALL_APPLICATIONS&& (
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
                  title="All Applications"
                  value={stats?.data?.totalApplications}
                  showCurrency={false}
                  change={1.7}
                  image={redPeople}
                  backgroundColour="bg-[#FFD6D4]"
                />
                <MetricCard
                  title="Pending Applications"
                  value={stats?.data?.pendingApplications}
                  showCurrency={false}
                  change={1.3}
                  image={yellowPeople}
                  backgroundColour="bg-[#FFF5D0]"
                />
                <MetricCard
                  title="Acknowledged Applications"
                  value={stats?.data?.acknowledgedApplicaitons}
                  showCurrency={false}
                  change={1.7}
                  image={greenPeople}
                  backgroundColour="bg-[#CFFFDA]"
                />
              </>
            )}
          </div>
        )}

        {activeTab === TAB_TYPE.PENDING_APPLICATIONS && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadingStats ? (
              <MetricCardSkeleton />
            ) : (
              <TransparentMetricCard
                title="Pending Applications"
                value={stats?.data?.pendingApplications}
                image={bluePeople}
                backgroundColour="bg-transparent"
              />
            )}
          </div>
        )}

        {activeTab === TAB_TYPE.ACKNOWLEDGED_APPLICATIONS && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadingStats ? (
              <MetricCardSkeleton />
            ) : (
              <TransparentMetricCard
                title="Acknowledged Applications"
                value={stats?.data?.acknowledgedApplicaitons}
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
                placeholder="Search by Applicant ID..."
                className="w-full p-2 pl-10 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <>
              {loadingApplications ? (
                <TableSkeleton />
              ) : (
                <>
                  <div className="mt-4 mb-4 border-b">
                    <button
                      className={`mr-4 pb-2 ${
                        activeTab === TAB_TYPE.ALL_APPLICATIONS
                          ? "border-b-2 border-black text-sm font-medium"
                          : "text-sm"
                      }`}
                      onClick={() => {handleTabUpdate(TAB_TYPE.ALL_APPLICATIONS)}}
                    >
                      All Applications
                    </button>
                    <button
                      className={`mr-4 pb-2 ${
                        activeTab === TAB_TYPE.PENDING_APPLICATIONS
                          ? "border-b-2 border-black text-sm font-medium"
                          : "text-sm"
                      }`}
                      onClick={() => handleTabUpdate(TAB_TYPE.PENDING_APPLICATIONS)}
                    >
                    Pending
                    </button>
                    <button
                      className={`mr-4 pb-2 ${
                        activeTab === TAB_TYPE.ACKNOWLEDGED_APPLICATIONS
                          ? "border-b-2 border-black text-sm font-medium"
                          : "text-sm"
                      }`}
                      onClick={() => handleTabUpdate(TAB_TYPE.ACKNOWLEDGED_APPLICATIONS)}
                    >
                    Acknowledged
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
                        <th className="p-2 border-b font-normal">APPLICATION ID</th>
                        <th className="p-2 border-b font-normal">
                          PHONE NUMBER
                        </th>
                        <th className="p-2 border-b font-normal">
                          EMAIL ADDRESS
                        </th>
                        <th className="p-2 border-b font-normal">DATE</th>
                        <th className="p-2 border-b font-normal">STATUS</th>
                        <th className="p-2 border-b font-normal">ACTION</th>
                      </tr>
                    </thead>
                    {activeTab === TAB_TYPE.ALL_APPLICATIONS && (
                      <tbody>
                        {data?.result?.map((application, index) => (
                          <tr key={application.id} className="border-b text-sm">
                            <td className="p-2">
                              <input type="checkbox" />
                            </td>
                            <td className="p-2"> {serials[index]}</td>
                            <td className="p-2">
                              {application?.firstName} {""}
                              {application?.lastName}
                            </td>
                            <td className="p-2">{application?.applicationNo}</td>
                            <td className="p-2">
                              {application?.phone}
                            </td>
                            <td className="p-2">
                              {application?.email}
                            </td>
                            <td className="p-2">
                              {new Date(
                                application?.createdAt
                              ).toDateString()}
                            </td>
                            <td className="p-2">
                              <span className="flex items-center">
                              <Status status={application?.status ? "acknowledged" : "pending"} />
                              </span>
                            </td>
                            <td className="p-2">
                              <div className="relative">
                                {/* Button to toggle dropdown */}
                                <button
                                  onClick={() =>
                                    toggleDropdown(application?.applicationNo)
                                  }
                                  className="p-1 rounded-full hover:bg-gray-200"
                                >
                                  <MoreHorizontal size={16} />
                                </button>

                                {/* Dropdown menu */}
                                {activeDropdownId ===application?.applicationNo && (
                                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
                                    <Link
                                    to={`${
                                      ROUTES.APPLICATIONS
                                    }/${encodeURIComponent(
                                      application?.applicationNo 
                                    )}`}
                                      className=" px-4 py-2 text-sm text-white bg-[#1E73BE] border rounded-md flex items-center"
                                      onClick={closeDropdown}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>View</span>
                                    </Link>
                                  </div>
                                )}

                                {/* Close dropdown when clicking outside */}
                                {activeDropdownId ===application?.applicationNo && (
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

                    {activeTab === TAB_TYPE.PENDING_APPLICATIONS && (
                      <tbody>
                        {data?.result?.map((application, index) => (
                          <tr key={application.id} className="border-b text-sm">
                            <td className="p-2">
                              <input type="checkbox" />
                            </td>
                            <td className="p-2">{serials[index]}</td>
                            <td className="p-2">
                              {" "}
                              {application?.firstName} {""}
                              {application?.lastName}
                            </td>
                            <td className="p-2">{application?.applicationNo}</td>
                            <td className="p-2">
                              {application?.phone}
                            </td>
                            <td className="p-2">
                              {application?.email}
                            </td>
                            <td className="p-2">
                              {new Date(
                                application?.createdAt
                              ).toDateString()}
                            </td>
                            <td className="p-2">
                              <span className="flex items-center">
                              <Status status={application?.status ? "acknowledged" : "pending"} />
                              </span>
                            </td>
                            <td className="p-2">
                              <div className="relative">
                                {/* Button to toggle dropdown */}
                                <button
                                  onClick={() =>
                                    toggleDropdown(application?.applicationNo )
                                  }
                                  className="p-1 rounded-full hover:bg-gray-200"
                                >
                                  <MoreHorizontal size={16} />
                                </button>

                                {/* Dropdown menu */}
                                {activeDropdownId ===application?.applicationNo && (
                                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
                                    <Link
                                      to={`${
                                        ROUTES.APPLICATIONS
                                      }/${encodeURIComponent(
                                        application?.applicationNo 
                                      )}`}
                                      className=" px-4 py-2 text-sm text-white bg-[#1E73BE] border rounded-md flex items-center"
                                      onClick={closeDropdown}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>View</span>
                                    </Link>
                                  </div>
                                )}

                                {/* Close dropdown when clicking outside */}
                                {activeDropdownId === application?.applicationNo  && (
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

                    {activeTab === TAB_TYPE.ACKNOWLEDGED_APPLICATIONS && (
                      <tbody>
                        {data?.result?.map((application, index) => (
                          <tr key={application.id} className="border-b text-sm">
                            <td className="p-2">
                              <input type="checkbox" />
                            </td>
                            <td className="p-2">{serials[index]}</td>
                            <td className="p-2">
                              {application?.firstName} {""}
                              {application?.lastName}
                            </td>
                            <td className="p-2">{application?.applicationNo }</td>
                            <td className="p-2">
                              {application?.phone}
                            </td>
                            <td className="p-2">
                              {application?.email}
                            </td>
                            <td className="p-2">
                              {new Date(
                                application?.createdAt
                              ).toDateString()}
                            </td>
                            <td className="p-2">
                              <span className="flex items-center">
                              <Status status={application?.status ? "acknowledged" : "pending"} />
                              </span>
                            </td>
                            <td className="p-2">
                              <div className="relative">
                                {/* Button to toggle dropdown */}
                                <button
                                  onClick={() =>
                                    toggleDropdown(application.applicationNo )
                                  }
                                  className="p-1 rounded-full hover:bg-gray-200"
                                >
                                  <MoreHorizontal size={16} />
                                </button>

                                {/* Dropdown menu */}
                                {activeDropdownId === application?.applicationNo  && (
                                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
                                    <Link
                                     to={`${
                                      ROUTES.APPLICATIONS
                                    }/${encodeURIComponent(
                                      application?.applicationNo 
                                    )}`}
                                      className=" px-4 py-2 text-sm text-white bg-[#1E73BE] border rounded-md flex items-center"
                                      onClick={closeDropdown}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>View</span>
                                    </Link>
                                  </div>
                                )}

                                {/* Close dropdown when clicking outside */}
                                {activeDropdownId === application?.applicationNo && (
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
