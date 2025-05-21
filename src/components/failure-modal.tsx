import { Button } from "@headlessui/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface FailureModalModalProps {
  isOpen: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isConfirming?: boolean;
  onClose: () => void;
  onCloseAfterSuccess: () => void;
}

export function FailureModal({
  isOpen,
  isLoading,
  isSuccess,
  isConfirming,
  onClose,
  onCloseAfterSuccess,
}: FailureModalModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
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
              Payment was not successful
            </DialogTitle>
            <div className="flex justify-center items-center">
              {!isLoading && (
                <Button
                  onClick={onCloseAfterSuccess}
                  className="bg-[#107BC0] text-white text-sm px-6 py-4 rounded-sm flex items-center"
                >
                  Back
                </Button>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
