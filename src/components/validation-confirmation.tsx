import { Button } from "@headlessui/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { successImage } from "@/helpers/constants/image.constant";
import { INPUT_NAMES } from "@/lib/utils";
import {
  otpEmailVerificationMessage,
  otpPhoneVerificationMessage,
} from "@/helpers/constants/message.constant";

interface ValidationConfirmationModalProps {
  open: boolean;
  type: string;
  onClose: () => void;
  onSubmit: () => void;
}

export function ValidationConfirmationModal({
  open,
  type,
  onSubmit,
  onClose,
}: ValidationConfirmationModalProps) {
  const message =
    type === INPUT_NAMES.EMAIL_ADDRESS
      ? otpEmailVerificationMessage
      : otpPhoneVerificationMessage;
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
            <DialogTitle className="mt-4 text-sm pb-4 font-light">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2">
                  <img src={successImage} />
                </div>
                <p className="mt-4 text-md font-normal">{message}</p>
                <p className="mt-4 text-xs font-light">
                  Click the "Proceed" button to continue
                </p>
              </div>
            </DialogTitle>

            <div className="pt-2 mt-4 flex justify-center">
              <Button
                onClick={onSubmit}
                className="inline-flex items-center justify-center text-center gap-2 bg-[#107BC0] w-64 p-2 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
              >
                Proceed
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
