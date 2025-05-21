import { MailOpen } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@headlessui/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  otpEmailMessage,
  otpPhoneMessage,
} from "@/helpers/constants/message.constant";
import { INPUT_NAMES } from "@/lib/utils";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { IResendOTP, OtpServicePayload, resendOtpApi, sendOtpApi, validateOtpApi, } from "@/services/auth.service";
import Alert from "@/helpers/toasts.helper";
import BtnLoader from "./ui/BtnLoader";

interface OTPModalProps {
  email: string;
  phone?:string
  open: boolean;
  type?: string;
  onClose: () => void;
  _callback?:()=>void;
  otp: string;
  onOTPChange: (otp: string) => void;
  onResend?: () => void;
  onSubmit: () => void;
}

export function OTPModal({
  open,
  email,
  phone,
  onClose,
  otp,
  onOTPChange,
  _callback,
  onResend,
  onSubmit,
  type,
}: OTPModalProps) {
  const otpMessage =
    type === INPUT_NAMES.EMAIL_ADDRESS ? otpEmailMessage : otpPhoneMessage;
   
 // * V E R I F Y  O T P
const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
  mutationFn: (params: { email?: string; phone?: string; otp: string }) => validateOtpApi(params),
  onSuccess() {
    Alert("OTP verified", "success");
    _callback?.();
    onClose(); // Ensure `onClose` is invoked properly
  },
  onError() {
    Alert("Verification failed. Please try again.", "error");
  },
});

// * R E S E N D  O T P
const { mutate: resendOtp, isPending: isResending } = useMutation({
  mutationFn: (params: { email?: string; phone?: string }) => resendOtpApi(params),
  onSuccess() {
    Alert("OTP resent successfully", "success");
  },
  onError() {
    Alert("Failed to resend OTP. Please try again later.", "error");
  },
});


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="flex text-lg font-bold text-primary">
              <div className="flex items-center gap-2">
                <MailOpen color="#107BC0" />
                <p className="text-[#107BC0]">OTP Verification</p>
              </div>
            </div>

            <DialogTitle className="mt-4 text-sm pb-4 font-light">
              {otpMessage}
            </DialogTitle>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                onChange={onOTPChange}
                value={otp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={1} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={2} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={3} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={4} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="mt-4 flex justify-end">
              <a
                className="font-medium text-xs text-primary-dark cursor-pointer"
                onClick={() => {
                  const payload = phone ? { phone } : { email };
                  resendOtp(payload);
                }}
              >
                Resend OTP
              </a>
            </div>

            <div className="pt-2 mt-4 flex justify-center">
              <Button
                disabled={otp.length < 6 || isVerifying || isResending}
                className={`inline-flex items-center justify-center text-center gap-2 w-64 p-2 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none bg-[#107BC0] text-white ${
                  otp.length < 6
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100"
                }`}
              
                onClick={() => {
                  if (otp.length < 4) return; 
              
                  const payload = phone ? { phone, otp } : { email, otp }; 
              
                  verifyOtp(payload);
                }}
            >
                    {isVerifying ? <BtnLoader visible={true} /> : "Verify"}

              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
