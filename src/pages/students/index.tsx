"use client";
import ApprovedApplication from "@/components/application-stage/approved-application";
import AssignedApplication from "@/components/application-stage/assigned-application";
import DeclinedApplication from "@/components/application-stage/declined-application";
import InitiateApplication from "@/components/application-stage/initiate-application";
import PendingApplication from "@/components/application-stage/pending-application";
import QueriedApplication from "@/components/application-stage/queried-application";
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
  bluePeople,
} from "@/helpers/constants/image.constant";
import { ROUTES } from "@/helpers/constants/routes.constant";
import { useStudents } from "@/helpers/hooks/useStudents.hook";
import { useTableSerial } from "@/helpers/hooks/UseTableSerial.hook";
import { TAB_TYPE } from "@/lib/utils";
import { getApplicationStatusService } from "@/services/driving-school-app.service";
import { getStudentStatistics } from "@/services/student.service";
import { useQuery } from "@tanstack/react-query";
import { Eye, MoreHorizontal, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Students() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(TAB_TYPE.ALL_STUDENTS);
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);
  const [activeDropdownId, setActiveDropdownId] = useState<
    number | null | string
  >(null);

  const {
    data,
    isLoading: loadingStudents,
    isError: errorStudents,
  } = useStudents({
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

  // Get student stats
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ["get_students_card_statistics"],
    queryFn: getStudentStatistics,
  });

  if (errorStudents) return <div>Error fetching students</div>

  const { serials } = useTableSerial({
    data: data?.result as any,
    currentPage: currentPaginationIndex,
  });

  const handleTabUpdate = (tab: TAB_TYPE) => {
    setCurrentPaginationIndex(1);
    setActiveTab(tab)
  }

  const { data: applicationStatus } = useQuery({
    queryKey: ["get_application_status"],
    queryFn: getApplicationStatusService,
  });
  console.log({ applicationStatus })
  return (
    <main className="relative isolate">
      <Sidebar>
        <h1 className="text-3xl text-gray-700 font-bold">Students</h1>

        {activeTab === TAB_TYPE.ALL_STUDENTS && (
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
                  title="Registered Students"
                  value={stats?.data?.totalRegisteredStudents}
                  showCurrency={false}
                  change={1.7}
                  image={redPeople}
                  backgroundColour="bg-[#FFD6D4]"
                />
                <MetricCard
                  title="Ongoing Students"
                  value={stats?.data?.ongoingStudents}
                  showCurrency={false}
                  change={1.3}
                  image={yellowPeople}
                  backgroundColour="bg-[#FFF5D0]"
                />
                <MetricCard
                  title="Certified Students"
                  value={stats?.data?.certifiedStudents}
                  showCurrency={false}
                  change={1.7}
                  image={greenPeople}
                  backgroundColour="bg-[#CFFFDA]"
                />
              </>
            )}
          </div>
        )}

        {activeTab === TAB_TYPE.ONGOING && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadingStats ? (
              <MetricCardSkeleton />
            ) : (
              <TransparentMetricCard
                title="Ongoing Students"
                value={stats?.data?.ongoingStudents}
                image={bluePeople}
                backgroundColour="bg-transparent"
              />
            )}
          </div>
        )}

        {activeTab === TAB_TYPE.COMPLETED && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadingStats ? (
              <MetricCardSkeleton />
            ) : (
              <TransparentMetricCard
                title="Certified Students"
                value={stats?.data?.certifiedStudents}
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
                placeholder="Search by Student ID..."
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
                    navigate(`${ROUTES.STUDENTS}${ROUTES.STUDENT_VALIDATION}`)
                  }
                  className="bg-[#107BC0] text-white text-sm px-4 py-2 rounded-sm flex items-center"
                >
                  <Plus className="h-4 w-4" />
                  Register Student
                </button>
              </div>
            </div>
            <>
              {loadingStudents ? (
                <TableSkeleton />
              ) : (
                <>
                  <div className="mt-4 mb-4 border-b">
                    <button
                      className={`mr-4 pb-2 ${activeTab === TAB_TYPE.ALL_STUDENTS
                        ? "border-b-2 border-black text-sm font-medium"
                        : "text-sm"
                        }`}
                      onClick={() => { handleTabUpdate(TAB_TYPE.ALL_STUDENTS) }}
                    >
                      All Students
                    </button>
                    <button
                      className={`mr-4 pb-2 ${activeTab === TAB_TYPE.ONGOING
                        ? "border-b-2 border-black text-sm font-medium"
                        : "text-sm"
                        }`}
                      onClick={() => handleTabUpdate(TAB_TYPE.ONGOING)}
                    >
                      Ongoing
                    </button>
                    <button
                      className={`mr-4 pb-2 ${activeTab === TAB_TYPE.COMPLETED
                        ? "border-b-2 border-black text-sm font-medium"
                        : "text-sm"
                        }`}
                      onClick={() => handleTabUpdate(TAB_TYPE.COMPLETED)}
                    >
                      Completed
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
                        <th className="p-2 border-b font-normal">STATUS</th>
                        <th className="p-2 border-b font-normal">ACTION</th>
                      </tr>
                    </thead>
                    {activeTab === TAB_TYPE.ALL_STUDENTS && (
                      <tbody>
                        {data?.result?.map((student, index) => (
                          <tr key={student.id} className="border-b text-sm">
                            <td className="p-2">
                              <input type="checkbox" />
                            </td>
                            <td className="p-2"> {serials[index]}</td>
                            <td className="p-2">
                              {student?.application?.firstName} {""}
                              {student?.application?.lastName}
                            </td>
                            <td className="p-2">{student?.studentNo}</td>
                            <td className="p-2">
                              {student?.application?.phone}
                            </td>
                            <td className="p-2">
                              {student?.application?.email}
                            </td>
                            <td className="p-2">
                              {new Date(
                                student?.application?.createdAt
                              ).toDateString()}
                            </td>
                            <td className="p-2">
                              <span className="flex items-center">
                                <Status status={student.graduated ? "completed" : "ongoing"} />
                              </span>

                            </td>
                            <td className="p-2">
                              <div className="relative">
                                {/* Button to toggle dropdown */}
                                <button
                                  onClick={() =>
                                    toggleDropdown(student.studentNo)
                                  }
                                  className="p-1 rounded-full hover:bg-gray-200"
                                >
                                  <MoreHorizontal size={16} />
                                </button>

                                {/* Dropdown menu */}
                                {activeDropdownId === student.studentNo && (
                                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
                                    <Link
                                      to={`${ROUTES.STUDENTS}/${student.studentNo}`}
                                      className=" px-4 py-2 text-sm text-white bg-[#1E73BE] border rounded-md flex items-center"
                                      onClick={closeDropdown}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>View</span>
                                    </Link>
                                  </div>
                                )}

                                {/* Close dropdown when clicking outside */}
                                {activeDropdownId === student.studentNo && (
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

                    {activeTab === TAB_TYPE.ONGOING && (
                      <tbody>
                        {data?.result?.map((student, index) => (
                          <tr key={student.id} className="border-b text-sm">
                            <td className="p-2">
                              <input type="checkbox" />
                            </td>
                            <td className="p-2">{serials[index]}</td>
                            <td className="p-2">
                              {" "}
                              {student?.application?.firstName} {""}
                              {student?.application?.lastName}
                            </td>
                            <td className="p-2">{student?.studentNo}</td>
                            <td className="p-2">
                              {student?.application?.phone}
                            </td>
                            <td className="p-2">
                              {student?.application?.email}
                            </td>
                            <td className="p-2">
                              {new Date(
                                student?.application?.createdAt
                              ).toDateString()}
                            </td>
                            <td className="p-2">
                              <span className="flex items-center">
                                <Status status={student.graduated ? "completed" : "ongoing"} />
                              </span>
                            </td>
                            <td className="p-2">
                              <div className="relative">
                                {/* Button to toggle dropdown */}
                                <button
                                  onClick={() =>
                                    toggleDropdown(student.studentNo)
                                  }
                                  className="p-1 rounded-full hover:bg-gray-200"
                                >
                                  <MoreHorizontal size={16} />
                                </button>

                                {/* Dropdown menu */}
                                {activeDropdownId === student.studentNo && (
                                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
                                    <Link
                                      to={`${ROUTES.STUDENTS
                                        }/${encodeURIComponent(
                                          student.studentNo
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
                                {activeDropdownId === student.studentNo && (
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

                    {activeTab === TAB_TYPE.COMPLETED && (
                      <tbody>
                        {data?.result?.map((student, index) => (
                          <tr key={student.id} className="border-b text-sm">
                            <td className="p-2">
                              <input type="checkbox" />
                            </td>
                            <td className="p-2">{serials[index]}</td>
                            <td className="p-2">
                              {student?.application?.firstName} {""}
                              {student?.application?.lastName}
                            </td>
                            <td className="p-2">{student?.studentNo}</td>
                            <td className="p-2">
                              {student?.application?.phone}
                            </td>
                            <td className="p-2">
                              {student?.application?.email}
                            </td>
                            <td className="p-2">
                              {new Date(
                                student?.application?.createdAt
                              ).toDateString()}
                            </td>
                            <td className="p-2">
                              <span className="flex items-center">
                                <Status status={student.graduated ? "completed" : "ongoing"} />
                              </span>
                            </td>
                            <td className="p-2">
                              <div className="relative">
                                {/* Button to toggle dropdown */}
                                <button
                                  onClick={() =>
                                    toggleDropdown(student.studentNo)
                                  }
                                  className="p-1 rounded-full hover:bg-gray-200"
                                >
                                  <MoreHorizontal size={16} />
                                </button>

                                {/* Dropdown menu */}
                                {activeDropdownId === student.studentNo && (
                                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
                                    <Link
                                      to={`${ROUTES.STUDENTS}/${student.studentNo}`}
                                      className=" px-4 py-2 text-sm text-white bg-[#1E73BE] border rounded-md flex items-center"
                                      onClick={closeDropdown}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>View</span>
                                    </Link>
                                  </div>
                                )}

                                {/* Close dropdown when clicking outside */}
                                {activeDropdownId === student.studentNo && (
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
        {applicationStatus?.data?.status === 6 && <DeclinedApplication />}
        {applicationStatus?.data?.status === 5 && <AssignedApplication />}
        {applicationStatus?.data?.status === 3 && <InitiateApplication />}
        {applicationStatus?.data?.status === 2 && <QueriedApplication />}
        {applicationStatus?.data?.status === 1 && <ApprovedApplication />}
        {applicationStatus?.data?.status === 0 && <PendingApplication />}

        {/* {applicationStatus?.data?.status === 3 && <DeclinedApplication />}
        {applicationStatus?.data?.status === 3 && <AssignedApplication />}
        {applicationStatus?.data?.status === 3 && <InitiateApplication />}
        {applicationStatus?.data?.status === 3 && <QueriedApplication />}
        {applicationStatus?.data?.status === 3 && <ApprovedApplication />}
        {applicationStatus?.data?.status === 3 && <PendingApplication />} */}
      </Sidebar>
    </main>
  );
}
