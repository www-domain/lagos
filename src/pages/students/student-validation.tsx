"use client";
import { OTPModal } from "@/components/otp-modal";
import Sidebar from "@/components/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import InputField from "@/components/ui/input";
import DropdownSelect from "@/components/ui/select";
import { ValidationConfirmationModal } from "@/components/validation-confirmation";
import {
  emailError,
  ninError,
  otpError,
  phoneError,
} from "@/helpers/constants/message.constant";
import { useVerdixCapture } from "@/helpers/hooks/useVerxidCapture.hook";
import {
  DOCUMENT_UPLOAD_TYPE,
  INPUT_NAMES,
  meansOfVerificationOptions,
  REGISTRATION_STEPS,
  TransactionType,
} from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import validator from "validator";
import { isEmpty } from "lodash";
import { ROUTES } from "@/helpers/constants/routes.constant";
import { stepOne, stepTwo } from "@/helpers/constants/image.constant";
import { useMutation } from "@tanstack/react-query";
import { sendOtpApi } from "@/services/auth.service";
import BtnLoader from "@/components/ui/BtnLoader";
import { Button } from "@/components/ui/button";
import useFaceVerification from "@/helpers/hooks/useFaceVerification.hook";
import { useVerifyNIN } from "@/helpers/hooks/useVerifyNIN.hook";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setNin,
  setNinData,
  setReferenceData,
} from "@/redux-store/slices/nin.slice";
import {
  intiatePayment,
  PaymentRequestParams,
  verifyPayment,
} from "@/services/payment.service";
import { RootState } from "@/redux-store";
import { VerifyPaymentModal } from "@/components/verify-payment";
import { useAppSelector } from "@/helpers/hooks/useStore.hook";
import { useFileUploader } from "@/helpers/hooks/useFileUpload";
import { saveUploadedDocument } from "@/redux-store/slices/upload.slice";

export default function StudentValidation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isIntiateLoading, setIntiateLoading] = useState(false);
  const { nin } = useAppSelector((value) => value.ninStore);
  const searchParams = new URLSearchParams(location.search);
  const [meansOfVerification, setMeansOfVerification] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [reference, setReference] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(
    REGISTRATION_STEPS.CONTACT_VERIFICATION
  );
  const email = useSelector((state: RootState) => state.ninStore.email);
  const { upload, loading } = useFileUploader();
  const { initialize: initVerxidCapture, waitForFaceData } = useVerdixCapture();
  const { verify, isVerifying } = useFaceVerification();
  const {
    mutate: verifyReference,
    isPending: isReferenceLoading,
    isSuccess,
  } = useMutation({
    mutationFn: verifyPayment,
    onSuccess: (data) => {
      dispatch(setReferenceData(data));
    },
    onError: (error) => {
      toast.error(`Failed to verify reference: ${error.message}`);
    },
  });
  useEffect(() => {
    const step =
      (searchParams.get("step") as any) ||
      REGISTRATION_STEPS.CONTACT_VERIFICATION;
    setRegistrationStep(step);
    const txRef = searchParams.get("trxref") || "";
    setReference(txRef);

    if (txRef) {
      verifyReference({
        reference: txRef,
        type: TransactionType.drivingSchoolApplication,
      });
      setDialogOpen(true);
    }
  }, [location.search]);

  const ninMutation = useVerifyNIN({
    onSuccess: async (data) => {
      if (!data.success) {
        return toast.error(data.message);
      }
      dispatch(setNinData(data.data));
      await faceCapture(data.data.photo);
      setDialogOpen(false);
    },
  });

  const faceCapture = async (ninFace: string) => {
    setDialogOpen(false);
    try {
      initVerxidCapture();
      const capturedFace = await waitForFaceData();
      if (isEmpty(capturedFace)) {
        toast.error("Face capture failed. Please try again.");
        return;
      }
      const possibleMatch = await verify({ capturedFace, ninFace });
      console.log("Verification result:", possibleMatch);
      if (possibleMatch) {
        toast.success("Face Matched");
        const uploadedFile = await upload({
          base64File: capturedFace,
          documentType: DOCUMENT_UPLOAD_TYPE.FACE,
          fileName: `face_${new Date().toISOString()}`,
          mimeType: "image/jpeg",
        });
        if (uploadedFile?.file) {
          dispatch(
            saveUploadedDocument({
              ...uploadedFile.file,
              documentType: DOCUMENT_UPLOAD_TYPE.FACE,
            })
          );
        }
        navigate(`${ROUTES.STUDENTS}${ROUTES.STUDENT_INFORMATION}`);
      } else toast.success("Face does not match");
    } catch (error) {
      console.error("Error in face capture process:", error);
      toast.error("Face verification failed. Please try again.");
    }
  };

  const { mutate: sendOtp, isPending: isSending } = useMutation({
    mutationFn: sendOtpApi,
    onSuccess: () => {
      setIsOTPModalOpen(true);
      toast.success("OTP sent succesfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to send OTP: ${error.message}`);
    },
  });

  const validateInput = (type: string) => {
    if (!emailAddress && !phoneNumber) {
      toast.error("Either email or phone number is required");
      return;
    }

    let payload = {};

    if (type === INPUT_NAMES.EMAIL_ADDRESS) {
      if (!emailAddress || !validator.isEmail(emailAddress)) {
        toast.error(emailError);
        return;
      }
      payload = { email: emailAddress };
    } else if (type === INPUT_NAMES.PHONE_NUMBER) {
      if (!phoneNumber || phoneNumber.length < 11) {
        toast.error(phoneError);
        return;
      }
      payload = { phone: phoneNumber };
    }

    sendOtp(payload);
  };

  const handleOtpSuccess = () => {
    if (emailAddress) {
      dispatch(setEmail(emailAddress));
    }
    setIsValidationModalOpen(true);
    setIsOTPModalOpen(false);
    toast.success("OTP verified successfully. ");
  };

  const handlePayment = async () => {
    if (!nin || nin.length < 11) {
      toast.error("NIN must be at least 11 characters long.");
      return;
    }

    const paymentPayload: PaymentRequestParams = {
      type: TransactionType.drivingSchoolApplication,
      email: String(email),
      description: "Payment for Driving School application",
      successRedirectUrl: `${import.meta.env.VITE_APPLICATION_BASE_URL}${ROUTES.STUDENTS
        }${ROUTES.STUDENT_VALIDATION}?step=${REGISTRATION_STEPS.VALIDATION}`,
      failureRedirectUrl: ``
    };

    try {
      const paymentResponse = await intiatePayment(paymentPayload);
      window.location.href = paymentResponse.url;
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error("Payment initiation failed. Please try again.");
    }
  };

  const handleOTPSubmission = () => {
    if (!otp || otp.length < 4) {
      toast.error(otpError);
    } else {
      setIsOTPModalOpen(false);
      setIsValidationModalOpen(true);
    }
  };

  const handleEmailConfirmation = () => {
    setIsValidationModalOpen(false);
    setRegistrationStep(REGISTRATION_STEPS.VALIDATION);
  };

  return (
    <main className="relative isolate">
      <Sidebar>
        <OTPModal
          email={emailAddress ?? null}
          phone={phoneNumber ?? null}
          open={isOTPModalOpen}
          type={meansOfVerification}
          onClose={() => setIsOTPModalOpen(false)}
          otp={otp}
          onOTPChange={(value: SetStateAction<string>) => setOtp(value)}
          onSubmit={handleOTPSubmission}
          _callback={handleOtpSuccess}
        />

        <ValidationConfirmationModal
          open={isValidationModalOpen}
          type={meansOfVerification}
          onClose={() => setIsValidationModalOpen(true)}
          onSubmit={handleEmailConfirmation}
        />

        <Link
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-lg hover:text-gray-900"
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

                {/* STEP ONE - CONTACT VERIFICATION */}
                {registrationStep ===
                  REGISTRATION_STEPS.CONTACT_VERIFICATION && (
                    <div>
                      <div className="mt-8 mb-4">
                        <img src={stepOne} alt="Step One" className="" />
                      </div>

                      <div className="flex gap-4 mt-8">
                        <div className="flex-1">
                          <DropdownSelect
                            name={INPUT_NAMES.MEANS_OF_VERIFICATION}
                            placeholder="Select an option"
                            label="Select means of verification"
                            value={meansOfVerification}
                            onChange={(e) =>
                              setMeansOfVerification(e.target.value)
                            }
                            options={meansOfVerificationOptions}
                          />
                        </div>

                        {meansOfVerification === INPUT_NAMES.EMAIL_ADDRESS && (
                          <div className="flex-1">
                            <InputField
                              label="Email Address"
                              name={INPUT_NAMES.EMAIL_ADDRESS}
                              type="text"
                              placeholder="Enter email address"
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                            />
                          </div>
                        )}

                        {meansOfVerification === INPUT_NAMES.PHONE_NUMBER && (
                          <div className="flex-1">
                            <InputField
                              label="Phone Number"
                              name={INPUT_NAMES.PHONE_NUMBER}
                              type="text"
                              placeholder="Enter phone number"
                              value={phoneNumber}
                              maxLength={11}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setPhoneNumber(value);
                              }}
                            />
                          </div>
                        )}

                        <div className="flex-1"></div>
                      </div>
                      {meansOfVerification === INPUT_NAMES.EMAIL_ADDRESS && (
                        <div className="flex justify-end mt-8">
                          <div>
                            {" "}
                            <Button
                              disabled={isSending}
                              onClick={() =>
                                validateInput(INPUT_NAMES.EMAIL_ADDRESS)
                              }
                              className="bg-[#107BC0] text-white text-sm px-6 py-4 rounded-sm flex items-center"
                            >
                              {isSending ? (
                                <BtnLoader visible={isSending} />
                              ) : (
                                "Validate Email"
                              )}
                            </Button>
                          </div>
                        </div>
                      )}

                      {meansOfVerification === INPUT_NAMES.PHONE_NUMBER && (
                        <div className="flex justify-end mt-8">
                          <div>
                            {" "}
                            <button
                              onClick={() =>
                                validateInput(INPUT_NAMES.PHONE_NUMBER)
                              }
                              className="bg-[#107BC0] text-white text-sm px-6 py-4 rounded-sm flex items-center"
                            >
                              Validate Phone Number
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                {/* STEP TWO - VALIDATION */}
                {registrationStep === REGISTRATION_STEPS.VALIDATION && (
                  <>
                    <div>
                      <div className="mt-8 mb-4">
                        <img src={stepTwo} alt="Step Two" className="" />
                      </div>

                      <div className="flex gap-4 mt-8">
                        <div className="flex-1">
                          <InputField
                            label="National Identification Number (NIN)"
                            name={INPUT_NAMES.NIN}
                            type="text"
                            placeholder="Enter NIN"
                            value={nin}
                            maxLength={11}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              dispatch(setNin(value));
                            }}
                          />
                        </div>

                        <div className="flex-1"></div>
                        <div className="flex-1"></div>
                      </div>
                      <div className="flex justify-end mt-8">
                        <div>
                          {" "}
                          <Button
                            disabled={
                              ninMutation.isPending ||
                              isVerifying ||
                              loading ||
                              isIntiateLoading ||
                              isReferenceLoading
                            }
                            onClick={() => handlePayment()}
                            className="bg-[#107BC0] text-white text-sm px-6 py-4 rounded-sm flex items-center"
                          >
                            {ninMutation.isPending ||
                              isVerifying ||
                              isIntiateLoading ||
                              isReferenceLoading ? (
                              <BtnLoader
                                visible={
                                  isIntiateLoading ||
                                  isReferenceLoading ||
                                  loading ||
                                  ninMutation.isPending ||
                                  isVerifying
                                }
                              />
                            ) : (
                              "Proceed"
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

        <VerifyPaymentModal
          onCloseAfterSuccess={() => {
            ninMutation.mutate({
              nin,
            });
          }}
          isLoading={isReferenceLoading}
          isSuccess={isSuccess}
          isOpen={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
        />
      </Sidebar>
    </main>
  );
}
