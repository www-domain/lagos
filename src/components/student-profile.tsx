import React, { useEffect, useState } from "react";
import { ArrowLeft, Ban } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import { student } from "@/helpers/constants/image.constant";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  getStudentDetails,
  getTrainingDuration,
} from "@/services/student.service";
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

export function StudentProfile() {
  const navigate = useNavigate();
  const { studentID } = useParams();
  console.log("first", studentID);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentDetails", studentID],
    queryFn: () => getStudentDetails(studentID!),
    enabled: !!studentID,
  });

  const userDetails = data?.data;

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
              Students
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
                    STUDENT PROFILE
                  </div>

                  {/* Profile Details */}
                  <div className="bg-[#F2F9FF] grid md:grid-cols-3 gap-4 p-4 border rounded-md">
                    <div>
                      <div className="text-xs text-gray-500">Full name</div>
                      <div className="font-semibold text-sm">
                        {userDetails?.application?.firstName} {""}{" "}
                        {userDetails?.application?.lastName}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Student ID</div>
                      <div className="font-semibold text-sm">
                        {userDetails?.studentNo || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        Registration Date
                      </div>
                      <div className="font-semibold text-sm">
                        {new Date(userDetails?.createdAt).toDateString() ||
                          "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Level</div>
                      <div className="font-semibold text-sm capitalize">
                        {userDetails?.application?.courseLevel}
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
                          userDetails.graduated
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >
                        {userDetails.graduated ? "Completed" : "Ongoing"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Permit</div>
                      <div className="font-semibold text-sm">
                        Learner’s Permit
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        Certificate Number
                      </div>
                      <div className="font-semibold text-sm">
                        {userDetails?.certificateNo || "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {/* <div className="flex justify-end">
                <button className="bg-[#813232] hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center">
                  Suspend
                  <Ban className="ml-2 h-4 w-4" />
                </button>
              </div> */}
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
                              {userDetails?.application?.firstName || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Surname</div>
                            <div className="font-semibold text-sm">
                              {userDetails?.application?.lastName || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Middle name
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.application?.middleName || "N/A"}
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-xs text-gray-500">
                              Mother's Maiden Name
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.application?.maidenName || "N/A"}
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
                              {userDetails?.application?.email || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Phone Number
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.application?.phone || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Address</div>
                            <div className="font-semibold text-sm">
                              {userDetails?.application?.address || "N/A"}
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
                              {userDetails?.application?.nationalityId
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
                              {userDetails?.application?.stateOfOriginId
                                ? getStateName(
                                    userDetails?.application?.stateOfOriginId
                                  )
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              LGA of Origin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.application?.lgaOfOriginId
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
                              {userDetails?.application?.dateOfBirth || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Gender at Birth
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.application?.genderId
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
                              {userDetails?.application?.placeOfBirth || "N/A"}
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
                              {userDetails?.application?.occupationId
                                ? getOccupationName(
                                    userDetails?.application?.occupationId
                                  )
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Marital Status
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.application?.maritalStatusId
                                ? getMaritalStatusName(
                                    userDetails?.application?.maritalStatusId
                                  )
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Blood Group
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.application?.bloodGroupId
                                ? getBloodGroupName(
                                    userDetails?.application?.bloodGroupId
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
                              {userDetails?.application?.nextOfKinName || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Relationship with Next of Kin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.application?.nextOfKinRelationshipId
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
                              {userDetails?.application?.nextOfKinPhone ||
                                "N/A"}
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-xs text-gray-500">
                              Nationality of Next of Kin
                            </div>
                            <div className="font-semibold text-sm">
                              {userDetails?.application?.nextOfKinNationalityId
                                ? getCountryName(
                                    userDetails?.application
                                      ?.nextOfKinNationalityId
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
