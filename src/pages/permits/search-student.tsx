"use client";
import Sidebar from "@/components/sidebar";
import { ProfileSkeleton } from "@/components/ui/profile-loader";
import { ROUTES } from "@/helpers/constants/routes.constant";
import useDebounce from "@/helpers/hooks/useDebounce";
import { setPermitData } from "@/redux-store/slices/permit.slice";
import { useIssuePermit } from "@/services/permit.service";
import { getStudentDetails } from "@/services/student.service";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Eye, MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function SearchStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchTerm, 300);
  const [isVisible, setIsVisible] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [queryEnabled, setQueryEnabled] = useState(false);

  const toggleDropdown = (id: number) => {
    setActiveDropdownId((prevId) => (prevId === id ? null : id));
  };

  const closeDropdown = () => {
    setActiveDropdownId(null);
  };

  const togglePopup = () => {
    setIsVisible(true);
    setQueryEnabled(true);
  };

  // Search student by ID query
  const { data: searchResults, isLoading: isSearching, isError, error } = useQuery({
    queryKey: ["search_student", debouncedSearchQuery],
    queryFn: () => getStudentDetails(debouncedSearchQuery),
    enabled: !!debouncedSearchQuery && queryEnabled,
  });

 

   
  const student = searchResults?.data; 
  if (student) {
    dispatch(setPermitData(student));
  }

  return (
    <main className="relative isolate">
      <Sidebar>
        <Link
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-lg hover:text-gray-900"
          to="#"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Permits
        </Link>

        <div className="mt-8">
          <p className="text-sm mb-2">Search by Student ID</p>
          <div className="flex">
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-96 text-sm p-2 border rounded-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ height: "45px" }}
              />
            </div>
            <div className="ml-2">
              <button
                onClick={togglePopup}
                className="bg-[#1E73BE] text-white text-sm px-6 py-3 rounded-sm flex items-center"
                disabled={searchTerm.trim() === ""}
              >
                Search
                <Search className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>

          {isVisible && (
            <div className="mt-16 w-full rounded-md">
              <h2 className="mb-4 text-md text-[#292C2A]">Search Result</h2>

              {/* Loading State */}
              {isSearching && <ProfileSkeleton />}

              {/* Error Handling */}
              {isError && (
                <p className="text-red-500">Error: {error?.message || "Something went wrong"}</p>
              )}

              {/* Display Student Data */}
              {!isSearching && !isError && student ? (
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="grid grid-cols-6 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-xs text-[#656565]">Name</p>
                      <p className="font-semibold">
                        {student?.application?.firstName} {student?.application?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#656565]">Student ID</p>
                      <p className="font-semibold">{student?.studentNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#656565]">Registration Date</p>
                      <p className="font-semibold">{new Date(student?.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#656565]">Mother's Maiden Name</p>
                      <p className="font-semibold">{student?.application?.maidenName || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#656565]">Status</p>
                      <p className={`font-medium ${student?.isActive ? "text-green-600" : "text-red-600"}`}>
                        {student?.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#656565]">Action</p>
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(student.studentNo )}
                          className="p-1 rounded-full hover:bg-gray-200"
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {activeDropdownId === student.studentNo && (
                          <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
                            <Link
                              to={`${ROUTES.PERMITS}/${student.studentNo}?permit=${student?.permit === null ? "false" : "true"}`}
                              className="px-4 py-2 text-sm text-white bg-[#1E73BE] border rounded-md flex items-center"
                              onClick={closeDropdown}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </Link>
                          </div>
                        )}

                        {activeDropdownId === student.studentNo  && (
                          <div
                            className="fixed inset-0 z-0"
                            onClick={closeDropdown}
                            aria-hidden="true"
                          ></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                !isSearching && !isError  && <p className="text-gray-500">No results found.</p>
              )}
            </div>
          )}
        </div>
      </Sidebar>
    </main>
  );
}
