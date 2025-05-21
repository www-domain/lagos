import React, { useEffect, useState } from "react";
import { ArrowLeft, Ban, Plus } from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Sidebar from "@/components/sidebar";
import { student } from "@/helpers/constants/image.constant";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ROUTES } from "@/helpers/constants/routes.constant";
import { useQuery } from "@tanstack/react-query";
import { getPermitsDetails } from "@/services/permit.service";
import { StudentProfileSkeleton } from "./ui/student-profile-skeleton";
import {
  getBloodGroupName,
  getCountryName,
  getGenderName,
  getLgaName,
  getMaritalStatusName,
  getOccupationName,
  getPermitTypeName,
  getRelationshipName,
  getStateName,
} from "@/helpers/methods.helper";
import {
  getStudentDetails,
  getTrainingDuration,
} from "@/services/student.service";

export function PermitProfile() {
  const navigate = useNavigate();
  const { studentID } = useParams();

  const [searchParams] = useSearchParams();
  const permit = searchParams.get("permit");

  const {
    data: permitData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["permitDetails", studentID],
    queryFn: () => getPermitsDetails(studentID!),
    enabled: !!studentID && permit === "true",
  });

  const {
    data: studentData,
    isLoading: isStudentLoading,
    isError: isStudentError,
  } = useQuery({
    queryKey: ["studentDetails", studentID],
    queryFn: () => getStudentDetails(studentID!),
    enabled: !!studentID && (!permit || permit === "false"),
  });
  const userDetails = permit === "true" ? permitData?.data : studentData?.data;

  const trainingID = userDetails?.application?.trainingDurationId;
  const {
    data: trainingDurationData,
    isLoading: isTrainingDurationLoading,
    isError: isTrainingDurationError,
  } = useQuery({
    queryKey: ["trainingDuration", trainingID],
    queryFn: () => getTrainingDuration(trainingID!),
    enabled: !!trainingID,
  });
  const duration = trainingDurationData?.data?.find(
    (duration: any) => duration.id === trainingID
  );

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
              Permits
            </Link>
          </div>
          {isLoading ? (
            <StudentProfileSkeleton />
          ) : isError ? (
            <div>Error loading student details.</div>
          ) : (
            <>
              <div className="mt-12 flex gap-4 items-start">
                {/* Picture Section */}
                <div className="w-56 h-72 aspect-square relative rounded-lg overflow-hidden">
                  <img
                    src={
                      userDetails?.student?.application?.applicantFiles?.find(
                        (file: { documentType: string }) =>
                          file.documentType === "face"
                      )?.file?.presignedUrl ||
                      userDetails?.application?.applicantFiles?.find(
                        (file: { documentType: string }) =>
                          file.documentType === "face"
                      )?.file?.presignedUrl ||
                      student
                    }
                    alt="License holder photo"
                    className="object-cover"
                  />
                </div>

                {/* Profile Section */}
                <div className="flex-1 space-y-4 mt-2">
                  {/* Profile Header */}
                  <div className="bg-[#1E73BE] text-sm w-48 text-center text-white px-4 py-2 rounded-md inline-block">
                    STUDENT PROFILE
                  </div>

                  {/* Profile Details */}
                  <div className="bg-[#F2F9FF] grid md:grid-cols-3 gap-4 p-4 border rounded-md">
                    <div>
                      <div className="text-xs text-gray-500">Full name</div>
                      <div className="font-semibold text-sm">
                        {userDetails?.application?.firstName ||
                          userDetails?.firstName}{" "}
                        {userDetails?.application?.lastName ||
                          userDetails?.lastName}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Student ID</div>
                      <div className="font-semibold text-sm">
                        {" "}
                        {userDetails?.student?.studentNo ||
                          userDetails?.studentNo ||
                          "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        Registration Date
                      </div>
                      <div className="font-semibold text-sm">
                        {userDetails?.application?.createdAt
                          ? new Date(
                              userDetails.application.createdAt
                            ).toDateString()
                          : userDetails?.createdAt
                          ? new Date(userDetails.createdAt).toDateString()
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Level</div>
                      <div className="font-semibold text-sm capitalize">
                        {" "}
                        {userDetails?.student?.application?.courseLevel ||
                          userDetails?.application?.courseLevel ||
                          "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="font-semibold text-sm">
                        {isTrainingDurationLoading
                          ? "Loading..."
                          : duration?.durationText}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <div
                        className={`font-semibold flex items-center text-sm ${
                          userDetails?.application?.graduated
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >
                        {userDetails?.application?.graduated
                          ? "Completed"
                          : "Ongoing"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Permit</div>
                      <div className="font-semibold text-sm">
                        {userDetails?.permitClassId
                          ? getPermitTypeName(userDetails?.permitClassId)
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        Certificate Number
                      </div>
                      <div className="font-semibold text-sm">
                        {userDetails?.student?.certificateNo ||
                          userDetails?.certificateNo ||
                          "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        navigate(`${ROUTES.PERMITS}${ROUTES.ISSUE_PERMIT}`)
                      }
                      className="bg-[#28A745] text-white px-4 py-2 rounded-sm flex items-center"
                    >
                      <Plus className="mr-2 h-4 w-4 font-bold" />
                      Issue Permit
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <Card className="mt-0.4 border-none">
                  <CardContent className="mt-6">
                    <div className="space-y-6">
                      <div className="">
                        <h3 className="w-64 pl-6 text-sm text-white font-semibold p-2 rounded-md mb-4 bg-[#1C252C]">
                          BASIC DETAILS
                        </h3>
                        <div className="border rounded-lg grid md:grid-cols-3 gap-4 p-4 bg-[#F2F9FF]">
                          <div>
                            <div className="text-xs text-gray-500">
                              First name
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.firstName ||
                                userDetails?.application?.firstName ||
                                "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Surname</div>
                            <div className="font-semibold text-sm">
                              {userDetails?.lastName ||
                                userDetails?.application?.lastName ||
                                "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Middle name
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.middleName ||
                                userDetails?.application?.middleName ||
                                "N/A"}
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-xs text-gray-500">
                              Mother's Maiden Name
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.maidenName ||
                                userDetails?.application?.maidenName ||
                                "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="w-64 pl-6 text-sm text-white font-semibold p-2 rounded-md mb-4 bg-[#1C252C]">
                          CONTACT INFORMATION
                        </h3>
                        <div className="border rounded-lg grid md:grid-cols-3 gap-4 p-4 bg-[#F2F9FF]">
                          <div>
                            <div className="text-xs text-gray-500">
                              Email Address
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.email ||
                                userDetails?.application?.email}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Phone Number
                            </div>
                            <div className="font-semibold text-xs">
                              {userDetails?.phone ||
                                userDetails?.application?.phone ||
                                "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Address</div>
                            <div className="font-semibold text-sm">
                              {userDetails?.address ||
                                userDetails?.application?.address ||
                                "N/A"}
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
                                : userDetails?.application?.nationalityId
                                ? getCountryName(
                                    userDetails?.application?.nationalityId
                                  )
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              State of Origin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.stateId
                                ? getStateName(userDetails?.stateId)
                                : userDetails?.application?.stateOfOriginId
                                ? getStateName(
                                    userDetails?.application?.stateOfOriginId
                                  )
                                : "N/A"}{" "}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              LGA of Origin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.lgaId
                                ? getLgaName(userDetails?.lgaId)
                                : userDetails?.application?.lgaOfOriginId
                                ? getLgaName(
                                    userDetails?.application?.lgaOfOriginId
                                  )
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
                              {userDetails?.dateOfBirth ||
                                userDetails?.application?.dateOfBirth ||
                                "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Gender at Birth
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.genderId
                                ? getGenderName(userDetails.genderId)
                                : userDetails?.application?.genderId
                                ? getGenderName(
                                    userDetails.application.genderId
                                  )
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Place of Birth
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.student?.application
                                ?.placeOfBirth ||
                                userDetails?.application?.placeOfBirth ||
                                "N/A"}
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
                            <div className="font-semibold text-sm">
                              {userDetails?.student?.application?.occupationId
                                ? getOccupationName(
                                    userDetails.student.application.occupationId
                                  )
                                : userDetails?.application?.occupationId
                                ? getOccupationName(
                                    userDetails.application.occupationId
                                  )
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Marital Status
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.student?.application
                                ?.maritalStatusId
                                ? getMaritalStatusName(
                                    userDetails.student.application
                                      .maritalStatusId
                                  )
                                : userDetails?.application?.maritalStatusId
                                ? getMaritalStatusName(
                                    userDetails.application.maritalStatusId
                                  )
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Blood Group
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.student?.application?.bloodGroupId
                                ? getBloodGroupName(
                                    userDetails.student.application.bloodGroupId
                                  )
                                : userDetails?.application?.bloodGroupId
                                ? getBloodGroupName(
                                    userDetails.application.bloodGroupId
                                  )
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
                              {userDetails?.student?.application
                                ?.nextOfKinName ||
                                userDetails?.application?.nextOfKinName ||
                                "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Relationship with Next of Kin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.student?.application
                                ?.nextOfKinRelationshipId
                                ? getRelationshipName(
                                    userDetails.student.application
                                      .nextOfKinRelationshipId
                                  )
                                : userDetails?.application
                                    ?.nextOfKinRelationshipId
                                ? getRelationshipName(
                                    userDetails.application
                                      .nextOfKinRelationshipId
                                  )
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Phone Number of Next of Kin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.student?.application
                                ?.nextOfKinPhone ||
                                userDetails?.application?.nextOfKinPhone ||
                                "N/A"}
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-xs text-gray-500">
                              Nationality of Next of Kin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.student?.application
                                ?.nextOfKinNationalityId
                                ? getCountryName(
                                    userDetails.student.application
                                      .nextOfKinNationalityId
                                  )
                                : userDetails?.application
                                    ?.nextOfKinNationalityId
                                ? getCountryName(
                                    userDetails.application
                                      .nextOfKinNationalityId
                                  )
                                : "N/A"}
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
