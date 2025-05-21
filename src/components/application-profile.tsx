import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import { student } from "@/helpers/constants/image.constant";
import { Card, CardContent } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { getTrainingDuration } from "@/services/student.service";
import { StudentProfileSkeleton } from "./ui/student-profile-skeleton";
import {
  getBloodGroupName,
  getCountryName,
  getGenderName,
  getLgaName,
  getMaritalStatusName,
  getOccupationName,
  getRelationshipName,
  getStateName,
} from "@/helpers/methods.helper";
import { getApplicationDetails } from "@/services/application.service";

export function ApplicationProfile() {
  const navigate = useNavigate();
  const { applicationID } = useParams();
  console.log("first", applicationID);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["applicationDetails", applicationID],
    queryFn: () => getApplicationDetails(applicationID!),
    enabled: !!applicationID,
  });

  const userDetails = data?.data;

  return (
    <main className="relative isolate">
      <Sidebar>
        <div className="">
          <div className="mb-6">
            <Link
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-lg hover:text-gray-900"
              to={""}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Applications
            </Link>
          </div>
          {isLoading ? (
            <StudentProfileSkeleton />
          ) : isError ? (
            <div>Error loading application details.</div>
          ) : (
            <>
              <div className="mt-12 flex gap-4 items-start">
                {/* Picture Section */}
                <div className="w-56 h-72 aspect-square relative rounded-lg overflow-hidden">
                  <img
                    src={
                      userDetails?.application?.applicantFiles?.find(
                        (file: { documentType: string }) =>
                          file.documentType === "face"
                      )?.file?.presignedUrl || student
                    }
                    alt="License holder photo"
                    className="object-cover"
                  />
                </div>

                {/* Profile Section */}
                <div className="flex-1 space-y-4 mt-2">
                  {/* Profile Header */}
                  <div className="bg-[#1E73BE] text-xs w-48 text-center text-white px-4 py-2 rounded-md inline-block">
                    APPLICATION PROFILE
                  </div>

                  {/* Profile Details */}
                  <div className="bg-[#F2F9FF] grid md:grid-cols-3 gap-4 p-4 border rounded-md">
                    <div>
                      <div className="text-xs text-gray-500">First Name</div>
                      <div className="font-semibold text-sm">
                        {userDetails?.firstName}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Surname</div>
                      <div className="font-semibold text-sm">
                        {userDetails?.lastName || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Middle Name</div>
                      <div className="font-semibold text-sm">
                        {userDetails?.middleName || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Gender</div>
                      <div className="font-semibold text-sm ">
                        {userDetails?.genderId
                          ? getGenderName(userDetails?.genderId)
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Date of Birth</div>
                      <div className="font-semibold text-sm">
                        {userDetails?.dateOfBirth || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        State of origin
                      </div>
                      <div className="font-semibold flex items-center text-sm ">
                        {userDetails?.stateOfOriginId
                          ? getStateName(userDetails?.stateOfOriginId)
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        {" "}
                        Appication Date{" "}
                      </div>
                      <div className="font-semibold text-sm">
                        {new Date(userDetails.createdAt).toDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        Application ID
                      </div>
                      <div className="font-semibold text-sm">
                        {userDetails?.applicationNo || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="text-xs text-gray-500">Status</div>
                        <div
                          className={`font-semibold flex items-center text-sm ${
                            userDetails.staus
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        >
                          {userDetails.status ? "Acknowledged" : "Pending"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Card className="mt-0.4 border-none">
                  <CardContent className="mt-6">
                    <div className="space-y-6">
                      <div className="">
                        <h3 className="w-64 pl-6 text-sm text-white font-semibold p-2 rounded-md mb-4 bg-[#5C6D80]">
                          BASIC DETAILS
                        </h3>
                        <div className="border rounded-lg grid md:grid-cols-3 gap-4 p-4 bg-[#F2F9FF]">
                          <div>
                            <div className="text-xs text-gray-500">
                              First name
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.firstName || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Surname</div>
                            <div className="font-semibold text-sm">
                              {userDetails?.lastName || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Middle name
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.middleName || "N/A"}
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-xs text-gray-500">
                              Mother's Maiden Name
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.maidenName || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="w-64 pl-6 text-sm text-white font-semibold p-2 rounded-md mb-4 bg-[#5C6D80]">
                          CONTACT INFORMATION
                        </h3>
                        <div className="border rounded-lg grid md:grid-cols-3 gap-4 p-4 bg-[#F2F9FF]">
                          <div>
                            <div className="text-xs text-gray-500">
                              Email Address
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.email || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Phone Number
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.phone || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Address</div>
                            <div className="font-semibold text-sm">
                              {userDetails?.address || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="w-64 pl-6 text-sm text-white font-semibold p-2 rounded-md mb-4 bg-[#5C6D80]">
                          INFORMATION OF ORIGIN
                        </h3>
                        <div className="border rounded-lg grid md:grid-cols-3 gap-4 p-4 bg-[#F2F9FF]">
                          <div>
                            <div className="text-xs text-gray-500">
                              Nationality
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.nationalityId
                                ? getCountryName(userDetails?.nationalityId)
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              State of Origin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.stateOfOriginId
                                ? getStateName(userDetails?.stateOfOriginId)
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              LGA of Origin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.lgaOfOriginId
                                ? getLgaName(userDetails?.lgaOfOriginId)
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="w-64 pl-6 text-sm text-white font-semibold p-2 rounded-md mb-4 bg-[#5C6D80]">
                          INFORMATION OF BIRTH
                        </h3>
                        <div className="border rounded-lg grid md:grid-cols-3 gap-4 p-4 bg-[#F2F9FF]">
                          <div>
                            <div className="text-xs text-gray-500">
                              Date of Birth
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.dateOfBirth || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Gender at Birth
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.genderId
                                ? getGenderName(userDetails?.genderId)
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Place of Birth
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.placeOfBirth || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="w-64 pl-6 text-sm text-white font-semibold p-2 rounded-md mb-4 bg-[#5C6D80]">
                          OTHER INFORMATION
                        </h3>
                        <div className="border rounded-lg grid md:grid-cols-3 gap-4 p-4 bg-[#F2F9FF]">
                          <div>
                            <div className="text-xs text-gray-500">
                              Occupation
                            </div>
                            <div className="font-semibold text-sm capitalize">
                              {userDetails?.occupationId
                                ? getOccupationName(userDetails?.occupationId)
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Marital Status
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.maritalStatusId
                                ? getMaritalStatusName(
                                    userDetails?.maritalStatusId
                                  )
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Blood Group
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.bloodGroupId
                                ? getBloodGroupName(userDetails?.bloodGroupId)
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="w-64 pl-6 text-sm text-white font-semibold p-2 rounded-md mb-4 bg-[#5C6D80]">
                          NEXT OF KIN INFORMATION
                        </h3>
                        <div className="border rounded-lg grid md:grid-cols-3 gap-4 p-4 bg-[#F2F9FF]">
                          <div>
                            <div className="text-xs text-gray-500">
                              Name of Next of Kin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.nextOfKinName || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Relationship with Next of Kin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.nextOfKinRelationshipId
                                ? getRelationshipName(
                                    userDetails?.nextOfKinRelationshipId
                                  )
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Phone Number of Next of Kin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.nextOfKinPhone || "N/A"}
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-xs text-gray-500">
                              Nationality of Next of Kin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.nextOfKinNationalityId
                                ? getCountryName(
                                    userDetails?.nextOfKinNationalityId
                                  )
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="w-64 pl-6 text-sm text-white font-semibold p-2 rounded-md mb-4 bg-[#5C6D80]">
                          DRIVING SCHOOL DETAILS
                        </h3>
                        <div className="border rounded-lg grid md:grid-cols-3 gap-4 p-4 bg-[#F2F9FF]">
                          <div>
                            <div className="text-xs text-gray-500">School</div>
                            <div className="font-semibold text-sm">
                              {userDetails?.drivingSchool?.name}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">LGA</div>
                            <div className="font-semibold text-sm">
                              {userDetails?.lgaOfOriginId
                                ? getLgaName(userDetails?.lgaOfOriginId)
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Duration
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.trainingDuration?.durationText ||
                                "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </Sidebar>
    </main>
  );
}
