"use client";
import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { lagosLogo, loginImage } from "@/helpers/constants/image.constant";
import { INPUT_NAMES } from "@/lib/utils";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/helpers/constants/routes.constant";
import FloatingInputField from "@/components/ui/floating-input";
import { useMutation } from "@tanstack/react-query";
import BtnLoader from "@/components/ui/BtnLoader";
import { sendOtpApi } from "@/services/auth.service";
import validator from "validator";
import { emailError, otpError, phoneError } from "@/helpers/constants/message.constant";
import { useDispatch } from "react-redux";
import { OTPModal } from "@/components/otp-modal";
import { ValidationConfirmationModal } from "@/components/validation-confirmation";
import { setEmail, setOTP } from "@/redux-store/slices/password.slice";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const { mutate: sendOtp, isPending: isSending } = useMutation({
    mutationFn: sendOtpApi,
    onSuccess: () => {
      setIsOTPModalOpen(true);
      toast.success("OTP sent successfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to send OTP: ${error.message}`);
    },
  });

  const validateInput = () => {
    if (!emailAddress) {
      toast.error("Email address is required");
      return;
    }
  
    if (!validator.isEmail(emailAddress)) {
      toast.error(emailError);
      return;
    }
  
    const payload = { email: emailAddress };
    sendOtp(payload);
  };

  const handleOtpSuccess = () => {
    dispatch(setEmail(emailAddress));
    dispatch(setOTP(otp));
    setIsValidationModalOpen(true);
    setIsOTPModalOpen(false);
    toast.success("OTP verified successfully.");
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
    toast.success("Email confirmed successfully.");
    navigate(ROUTES.NEW_PASSWORD);
    
  };

return (
    <main className="flex min-h-screen">
        <OTPModal
            email={emailAddress}
            open={isOTPModalOpen}
            onClose={() => setIsOTPModalOpen(false)}
            type={INPUT_NAMES.EMAIL_ADDRESS}
            otp={otp}
            onOTPChange={(value: SetStateAction<string>) => setOtp(value)}
            onSubmit={handleOTPSubmission}
            _callback={handleOtpSuccess}
        />

        <ValidationConfirmationModal
            open={isValidationModalOpen}
            onClose={() => setIsValidationModalOpen(false)}
            onSubmit={handleEmailConfirmation}
            type={INPUT_NAMES.EMAIL_ADDRESS}
        />

        <div className="hidden md:flex flex-[3] relative">
            <img
                src={loginImage || "/placeholder.svg"}
                alt="Lekki-Ikoyi Link Bridge"
                className="absolute inset-0 object-cover w-full h-full"
            />
        </div>

        <div className="flex flex-[2] flex-col items-center justify-center px-6 py-12 bg-white">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center">
                    <img
                        src={lagosLogo || "/placeholder.svg"}
                        alt="Lagos State Government Logo"
                        className="w-24 h-24 mb-6"
                    />
                    <h1 className="text-2xl font-semibold text-[#1E73BE]">
                        Forgot Password
                    </h1>
                    <p className="mt-2 text-gray-600 text-sm">
                        Enter the email address you used during registration
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validateInput();
                    }}
                    className="mt-8"
                >
                    <div className="mt-6">
                        <FloatingInputField
                            label="Email Address"
                            name={INPUT_NAMES.EMAIL_ADDRESS}
                            type="email"
                            placeholder="Enter your email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </div>

                    <div className="mt-16">
                        <Button
                            type="submit"
                            className="w-full bg-[#1E73BE] text-white py-2 rounded-md"
                            disabled={isSending}
                        >
                            {isSending ? <BtnLoader visible={true} /> : "Send OTP"}
                        </Button>
                        <div className="mt-2 flex justify-center">
                            <p className="text-[#292C2A] text-sm font-light">
                                Remember your password?{" "}
                                <Link
                                    to={ROUTES.LOGIN}
                                    className="font-semibold cursor-pointer"
                                >
                                    Back to Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </main>
);
}
