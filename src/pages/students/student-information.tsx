"use client";
import Sidebar from "@/components/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import InputField from "@/components/ui/input";
import DropdownSelect from "@/components/ui/select";
import {
  bloodGroups,
  genders,
  INPUT_NAMES,
  levelOptions,
  maritalStatuses,
  occupations,
  permitTypes,
  REGISTRATION_STEPS,
  relationships,
  salutations,
  trainingDuration,
} from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import states from "../../lib/nationality-data.lib/states.lib.json";
import {
  addressError,
  bloodGroupError,
  durationError,
  levelError,
  lgaError,
  maritalStatusError,
  mothersMaidenNameError,
  nameOfNextOfKinError,
  nationalityOfNextOfKinError,
  occupationError,
  phoneError,
  phoneNumberOfNextOfKinError,
  placeOfBirthError,
  relationshipWithNextOfKinError,
  titleError,
} from "@/helpers/constants/message.constant";
import { RegistrationConfirmationModal } from "@/components/registration-confirmation";
import { ROUTES } from "@/helpers/constants/routes.constant";
import { stepFour, stepThree } from "@/helpers/constants/image.constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-store";
import {
  getCountryName,
  getLgaName,
  getLGAsByStateName,
  getStateId,
} from "@/helpers/methods.helper";
import { useDropdownOptions } from "@/helpers/hooks/useDropdownOptions";
import { countries } from "@/lib/nationality-data.lib/countries";
import { updateStudentInfo } from "@/redux-store/slices/student.slice";
import { registerStudent } from "@/services/student.service";
import { useMutation } from "@tanstack/react-query";
import { UploadedFile } from "@/redux-store/slices/upload.slice";
import { format, isValid, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import BtnLoader from "@/components/ui/BtnLoader";

export default function StudentInformation() {
  const {
    occupationOptions,
    relationshipOptions,
    maritalStatusOptions,
    bloodGroupOptions,
    permitTypeOptions,
    titleNameOptions,
    countryOptions,
    trainingDurationOptions,
  } = useDropdownOptions(
    occupations,
    relationships,
    maritalStatuses,
    bloodGroups,
    permitTypes,
    salutations,
    countries,
    trainingDuration
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ninData = useSelector((state: RootState) => state.ninStore.data);
  const [middleName, setMiddleName] = useState("");
  const [title, setTitle] = useState("");
  const [mothersMaidenName, setMothersMaidenName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [stateName, setStateName] = useState<string>("ENUGU");
  const [stateID, setStateID] = useState<string | null>(null);
  const [lga, setLGA] = useState("");
  const [lgaOfOrigin, setLGAOfOrigin] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const countryId = 1;
  const countryName = getCountryName(countryId);
  const [occupation, setOccupation] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [nameOfNextOfKin, setNameOfNextKin] = useState("");
  const [relationshipWithNextOfKin, setRelationshipWithNextOfKin] =
    useState("");
  const [phoneNumberOfNextOfKin, setPhoneNumberOfNextOfKin] = useState("");
  const [nationalityOfNextOfKin, setNationalityOfNextKin] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [permitType, setPermitType] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const email = useSelector((state: RootState) => state.ninStore.email);
  const nin = useSelector((state: RootState) => state.ninStore.nin);
  const drivingSchoolId = useSelector(
    (state: RootState) => state.authStore.drivingSchoolId
  );
  const uploadedFiles = useSelector(
    (state: RootState) => state.uploadStore.uploadedFiles
  );
  const referenceData = useSelector(
    (state: RootState) => state.ninStore.referenceData
  );

  const formattedFiles = uploadedFiles?.map((file: UploadedFile) => ({
    fileId: file.id,
    documentType: file.documentType,
  }));
  const studentInfo = useSelector((state: RootState) => state.student);
  const [registrationStep, setRegistrationStep] = useState(
    REGISTRATION_STEPS.STUDENT_INFORMATION
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const genderMapping: { [key: string]: string } = {
    m: "Male",
    F: "Female",
  };
  const formatBirthdate = (dob: string | undefined): string => {
    if (!dob) return "";

    try {
      // Ensure input format is correct
      const parsedDate = parse(dob, "dd-MM-yyyy", new Date());

      if (!isValid(parsedDate)) {
        console.error("Invalid date format:", dob);
        return "";
      }

      // Convert to required format
      return format(parsedDate, "dd-MM-yyyy");
    } catch (error) {
      console.error("Date parsing error:", error);
      return "";
    }
  };

  // ✅ Format birthdate before passing to the mutation
  const formattedDateOfBirth = formatBirthdate(ninData?.dob);
  const lgaOptions =
    getLGAsByStateName(ninData?.state_orgin)?.map((lga) => ({
      label: lga.name,
      value: lga.id,
    })) || [];

  useEffect(() => {
    //get state ID based on name
    if (stateName.trim() !== "") {
      const matchedState = states.find(
        (s) =>
          s.State_Name && s.State_Name.toLowerCase() === stateName.toLowerCase()
      );
      setStateID(matchedState ? matchedState.State_ID : null);
    } else {
      setStateID(null);
    }
  }, [stateName]);

  const validationSchema = [
    { field: INPUT_NAMES.TITLE, value: title, errorMessage: titleError },
    {
      field: INPUT_NAMES.MOTHERS_MAIDEN_NAME,
      value: mothersMaidenName,
      errorMessage: mothersMaidenNameError,
    },
    {
      field: INPUT_NAMES.PHONE_NUMBER,
      value: phoneNumber,
      errorMessage: phoneError,
    },
    { field: INPUT_NAMES.ADDRESS, value: address, errorMessage: addressError },
    { field: INPUT_NAMES.LGA, value: lgaOfOrigin, errorMessage: lgaError },
    {
      field: INPUT_NAMES.PLACE_OF_BIRTH,
      value: placeOfBirth,
      errorMessage: placeOfBirthError,
    },
    {
      field: INPUT_NAMES.OCCUPATION,
      value: occupation,
      errorMessage: occupationError,
    },
    {
      field: INPUT_NAMES.MARITAL_STATUS,
      value: maritalStatus,
      errorMessage: maritalStatusError,
    },
    {
      field: INPUT_NAMES.BLOOD_GROUP,
      value: bloodGroup,
      errorMessage: bloodGroupError,
    },
    {
      field: INPUT_NAMES.NAME_OF_NEXT_OF_KIN,
      value: nameOfNextOfKin,
      errorMessage: nameOfNextOfKinError,
    },
    {
      field: INPUT_NAMES.RELATIONSHIP_WITH_NEXT_OF_KIN,
      value: relationshipWithNextOfKin,
      errorMessage: relationshipWithNextOfKinError,
    },
    {
      field: INPUT_NAMES.PHONE_NUMBER_OF_NEXT_OF_KIN,
      value: phoneNumberOfNextOfKin,
      errorMessage: phoneNumberOfNextOfKinError,
    },
    {
      field: INPUT_NAMES.NATIONALITY_OF_NEXT_OF_KIN,
      value: nationalityOfNextOfKin,
      errorMessage: nationalityOfNextOfKinError,
    },
  ];

  const handleInformationSubmission = () => {
    const newErrors: Record<string, string> = {};

    validationSchema.forEach(({ field, value, errorMessage }) => {
      if (!value) {
        toast.error(errorMessage);
        newErrors[field] = errorMessage;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setRegistrationStep(REGISTRATION_STEPS.COURSE_INFORMATION);
      dispatch(
        updateStudentInfo({
          phoneNumber,
          address,
          middleName,
          title,
          mothersMaidenName,
          lgaOfOrigin,
          placeOfBirth,
          occupation,
          maritalStatus,
          bloodGroup,
          nameOfNextOfKin,
          relationshipWithNextOfKin,
          phoneNumberOfNextOfKin,
          nationalityOfNextOfKin,
        })
      );
    }
  };

  const {
    mutate: registeringStudent,
    isPending: isRegistering,
    isError: errorRegistering,
  } = useMutation({
    mutationFn: () =>
      registerStudent({
        titleId: Number(studentInfo.title),
        drivingSchoolId,
        email,
        lastName: ninData?.lastname,
        firstName: ninData?.firstname,
        middleName: studentInfo?.middleName ?? "",
        phone: studentInfo?.phoneNumber,
        maidenName: studentInfo?.mothersMaidenName,
        genderId: genders.find(
          (gender) =>
            gender.name.toLowerCase() ===
            genderMapping[ninData?.gender?.toLowerCase()]?.toLowerCase()
        )?.id,
        dateOfBirth: formattedDateOfBirth,
        maritalStatusId: Number(studentInfo?.maritalStatus),
        stateOfOriginId: getStateId(ninData?.state_orgin),
        address: studentInfo?.address,
        nationalityId: Number(countryId),
        lgaOfOriginId: Number(studentInfo?.lgaOfOrigin),
        nextOfKinRelationshipId: Number(studentInfo?.relationshipWithNextOfKin),
        nextOfKinNationalityId: Number(studentInfo?.nationalityOfNextOfKin),
        nin: nin,
        courseLevel: studentInfo?.level,
        nextOfKinPhone: studentInfo?.phoneNumberOfNextOfKin,
        nextOfKinName: studentInfo?.nameOfNextOfKin,
        bloodGroupId: Number(studentInfo?.bloodGroup),
        placeOfBirth: getLgaName(Number(studentInfo?.placeOfBirth)),
        trainingDurationId: Number(studentInfo.duration),
        occupationId: Number(studentInfo?.occupation),
        files: formattedFiles,
        reference: String(referenceData?.reference),
      }),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Student registered successfully");
        dispatch(updateStudentInfo(data));
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Registration failed");
    },
  });

  const handleSubmit = () => {
    if (!level) {
      toast.error(levelError);
      return;
    }
    if (!duration) {
      toast.error(durationError);
      return;
    }
    dispatch(updateStudentInfo({ level, duration, permitType }));
    registeringStudent(undefined, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          setIsConfirmationModalOpen(true);
        } else {
          toast.error(data.message);
          setIsConfirmationModalOpen(false);
        }
      },
      onError: (error) => {
        toast.error("Registration failed: " + error.message);
      },
    });
  };

  return (
    <main className="relative isolate">
      <Sidebar>
        <RegistrationConfirmationModal
          open={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(true)}
          onSubmit={() => navigate(ROUTES.STUDENTS, { replace: true })}
        />

        <Link
          onClick={() => navigate(-1)}
          className=" inline-flex items-center text-lg hover:text-gray-900"
          to={""}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Students
        </Link>

        <div className="mt-8">
          <div className="mx-auto">
            <Card className="mt-0.4 border rounded-md shadow">
              <CardContent className="mt-6">
                <div className="mt-4">
                  <p className="font-[#292C2A] text-lg">Register Student</p>
                  <p className="mt-2 font-light text-sm">
                    Complete the steps to register a new student
                  </p>
                </div>

                {registrationStep ===
                  REGISTRATION_STEPS.STUDENT_INFORMATION && (
                  <>
                    <div>
                      <div className="mt-8 mb-4">
                        <img src={stepThree} alt="Step Three" className="" />
                      </div>
                      <div className="space-y-6">
                        <div className="mt-8">
                          <h3 className="w-64 text-md text-[#107BC0] font-normal p-2 rounded-md mb-4 bg-[#E5F5FF]">
                            Basic Information
                          </h3>
                          <div className="border-none grid md:grid-cols-3 gap-8 p-4">
                            <div>
                              <div className="text-sm font-semibold">
                                Full name
                              </div>
                              <div className="font-light text-md text-[#292C2A]">
                                {ninData?.lastname} {""} {ninData?.firstname}
                              </div>
                            </div>
                            <div className="font-semibold">
                              <DropdownSelect
                                name={INPUT_NAMES.TITLE}
                                placeholder="Select an option"
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                options={titleNameOptions}
                              />
                            </div>
                            <div className="font-semibold">
                              <InputField
                                label="Middle Name(Optional)"
                                name={INPUT_NAMES.MIDDLE_NAME}
                                type="text"
                                placeholder="Enter student’s middle name"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                              />
                            </div>
                            <div className="font-semibold">
                              <InputField
                                label="Mother's Maiden Name"
                                name={INPUT_NAMES.MOTHERS_MAIDEN_NAME}
                                type="text"
                                placeholder="Enter mother's maiden name"
                                value={mothersMaidenName}
                                onChange={(e) =>
                                  setMothersMaidenName(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="w-64 pl-6 text-md text-[#107BC0] font-normal p-2 rounded-md mb-4 bg-[#E5F5FF]">
                            Contact Information
                          </h3>
                          <div className="border-none grid md:grid-cols-3 gap-8 p-4">
                            <div>
                              <div className="text-sm font-semibold">
                                Email Address
                              </div>
                              <div className="font-light text-md text-[#292C2A]">
                                {email ? email : "No email found"}
                              </div>
                            </div>
                            <div className="font-semibold">
                              <InputField
                                label="Phone Number"
                                name={INPUT_NAMES.PHONE_NUMBER}
                                type="text"
                                placeholder="Enter student's phone number"
                                value={phoneNumber}
                                maxLength={11}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  setPhoneNumber(value);
                                }}
                              />
                            </div>
                            <div className="font-semibold">
                              <InputField
                                label="Address"
                                name={INPUT_NAMES.ADDRESS}
                                type="text"
                                placeholder="Enter student's address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="w-64 pl-6 text-md text-[#107BC0] font-normal p-2 rounded-md mb-4 bg-[#E5F5FF]">
                            Information of Origin
                          </h3>
                          <div className="border-none grid md:grid-cols-3 gap-8 p-4">
                            <div>
                              <div className="text-sm font-semibold">
                                Nationality
                              </div>
                              <div className="font-light text-md text-[#292C2A]">
                                {countryName || "Unknown"}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold">
                                State of Origin
                              </div>
                              <div className="font-light text-md text-[#292C2A]">
                                {ninData?.state_orgin}
                              </div>
                            </div>
                            <div className="font-semibold">
                              <DropdownSelect
                                name={INPUT_NAMES.LGA}
                                placeholder="Select an option"
                                label="Local Government of Origin"
                                value={lgaOfOrigin}
                                onChange={(e) => setLGAOfOrigin(e.target.value)}
                                options={lgaOptions}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="w-64 pl-6 text-md text-[#107BC0] font-normal p-2 rounded-md mb-4 bg-[#E5F5FF]">
                            Information of birth
                          </h3>
                          <div className="border-none grid md:grid-cols-3 gap-8 p-4">
                            <div>
                              <div className="text-sm font-semibold">
                                Date of Birth
                              </div>
                              <div className="font-light text-md text-[#292C2A]">
                                {ninData?.dob}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold">
                                Gender at Birth
                              </div>
                              <div className="font-light text-md text-[#292C2A]">
                                {genderMapping[ninData?.gender.toLowerCase()] ||
                                  "Unknown"}
                              </div>
                            </div>
                            <div className="font-semibold">
                              <DropdownSelect
                                name={INPUT_NAMES.PLACE_OF_BIRTH}
                                placeholder="Select an option"
                                label="Place of Birth"
                                value={placeOfBirth}
                                onChange={(e) =>
                                  setPlaceOfBirth(e.target.value)
                                }
                                options={lgaOptions}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="w-64 pl-6 text-md text-[#107BC0] font-normal p-2 rounded-md mb-4 bg-[#E5F5FF]">
                            Other Information
                          </h3>
                          <div className="border-none grid md:grid-cols-3 gap-8 p-4">
                            <div className="font-semibold">
                              <DropdownSelect
                                name={INPUT_NAMES.OCCUPATION}
                                placeholder="Select an option"
                                label="Occupation"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                                options={occupationOptions}
                              />
                            </div>
                            <div className="font-semibold">
                              <DropdownSelect
                                name={INPUT_NAMES.MARITAL_STATUS}
                                placeholder="Select an option"
                                label="Marital Status"
                                value={maritalStatus}
                                onChange={(e) =>
                                  setMaritalStatus(e.target.value)
                                }
                                options={maritalStatusOptions}
                              />
                            </div>
                            <div className="font-semibold">
                              <DropdownSelect
                                name={INPUT_NAMES.BLOOD_GROUP}
                                placeholder="Select an option"
                                label="Blood Group"
                                value={bloodGroup}
                                onChange={(e) => setBloodGroup(e.target.value)}
                                options={bloodGroupOptions}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="w-64 pl-6 text-md text-[#107BC0] font-normal p-2 rounded-md mb-4 bg-[#E5F5FF]">
                            Next of Kin Information
                          </h3>
                          <div className="border-none grid md:grid-cols-3 gap-8 p-4">
                            <div>
                              <div className="font-semibold">
                                <InputField
                                  label="Name of Next of Kin"
                                  name={INPUT_NAMES.NAME_OF_NEXT_OF_KIN}
                                  type="text"
                                  placeholder="Enter name of next of kin"
                                  value={nameOfNextOfKin}
                                  onChange={(e) =>
                                    setNameOfNextKin(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="font-semibold">
                              <DropdownSelect
                                name={INPUT_NAMES.RELATIONSHIP_WITH_NEXT_OF_KIN}
                                placeholder="Select an option"
                                label="Relationship with Next of Kin"
                                value={relationshipWithNextOfKin}
                                onChange={(e) =>
                                  setRelationshipWithNextOfKin(e.target.value)
                                }
                                options={relationshipOptions}
                              />
                            </div>
                            <div className="font-semibold">
                              <InputField
                                label="Phone Number of Next of Kin"
                                name={INPUT_NAMES.PHONE_NUMBER_OF_NEXT_OF_KIN}
                                type="text"
                                placeholder="Enter phone number of next of kin"
                                value={phoneNumberOfNextOfKin}
                                maxLength={11}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  setPhoneNumberOfNextOfKin(value);
                                }}
                              />
                            </div>
                            <div className="font-semibold">
                              <DropdownSelect
                                name={INPUT_NAMES.NATIONALITY_OF_NEXT_OF_KIN}
                                placeholder="Select an option"
                                label="Nationality of Next of Kin"
                                value={nationalityOfNextOfKin}
                                onChange={(e) =>
                                  setNationalityOfNextKin(e.target.value)
                                }
                                options={countryOptions}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-8">
                        <div>
                          {" "}
                          <button
                            onClick={() => handleInformationSubmission()}
                            className="bg-[#107BC0] text-white text-sm px-12 py-3 rounded-sm flex items-center"
                          >
                            Proceed
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* STEP TWO - COURSE INFORMATION */}
                {registrationStep === REGISTRATION_STEPS.COURSE_INFORMATION && (
                  <>
                    <div>
                      <div className="mt-8 mb-4">
                        <img src={stepFour} alt="Step Four" className="" />
                      </div>

                      <div className="flex gap-4 mt-8">
                        <div className="flex-1 font-semibold">
                          <DropdownSelect
                            name={INPUT_NAMES.LEVEL}
                            placeholder="Select an option"
                            label="Level"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            options={levelOptions}
                          />
                        </div>

                        <div className="flex-1 font-semibold">
                          <DropdownSelect
                            name={INPUT_NAMES.DURATION}
                            placeholder="Select an option"
                            label="Duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            options={trainingDurationOptions}
                          />
                        </div>

                        <div className="flex-1 font-semibold">
                          <DropdownSelect
                            name={INPUT_NAMES.PERMIT_TYPE}
                            placeholder="Select an option"
                            label="Permit Type(Optional)"
                            value={permitType}
                            onChange={(e) => setPermitType(e.target.value)}
                            options={permitTypeOptions}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end mt-8">
                        <div>
                          {" "}
                          <Button
                            onClick={() => handleSubmit()}
                            disabled={isRegistering}
                            className="bg-[#107BC0] text-white text-sm px-12 py-3 rounded-sm flex items-center"
                          >
                            {isRegistering ? (
                              <BtnLoader visible={isRegistering} />
                            ) : (
                              "Submit"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Sidebar>
    </main>
  );
}
