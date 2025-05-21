import { useState } from "react"
import { Button } from "@headlessui/react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { HelpCircle, KeyRound } from "lucide-react"
import { toast } from "sonner"

interface ChangePasswordModalProps {
  open: boolean
  onClose: () => void

 
}

export function ChangePasswordModal({ open, onClose, }: ChangePasswordModalProps) {


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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <DialogTitle className="text-4xl font-bold text-white bg-[#4B8FD9] p-4 rounded-t-lg relative">
              Change Password
              <div className="absolute -right-6 top-1/2 -translate-y-1/2">
                <div className="bg-[#4B8FD9] w-12 h-12 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-4">
                <div className="bg-[#E69455] text-white px-6 py-2 rounded-lg">
                  <span className="text-lg">Helping you get started</span>
                </div>
              </div>
            </DialogTitle>

            <div className="px-6 pt-12 pb-6">
              <div className="space-y-6">
                <p className="text-gray-800 text-xl leading-relaxed">
                  For security purposes, you must change your default password upon your first login. Please create a
                  new, secure password to ensure the safety of your account and sensitive information.
                </p>
               
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="inline-flex items-center justify-center text-center gap-2 bg-[#4B8FD9] px-6 py-3 text-lg font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-[#4B8FD9]/90"
                    >
                      Change Password
                      <KeyRound className="w-5 h-5" />
                    </Button>
                  </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

