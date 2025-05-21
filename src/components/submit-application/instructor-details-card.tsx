import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { Instructor } from "./instructor";
interface InstructorDetailsCardProps {
  instructor: Instructor;
  onConfirm: () => void;
  onCancel: () => void;
  setShowInstructorDetailsDialog: any,
  showInstructorDetailsDialog: any,
}

const InstructorDetailsCard: React.FC<InstructorDetailsCardProps> = ({
  instructor,
  onConfirm,
  onCancel,
  setShowInstructorDetailsDialog,
  showInstructorDetailsDialog,
}) => {

  return (
    <Dialog open={showInstructorDetailsDialog} onOpenChange={setShowInstructorDetailsDialog}>
      <DialogContent hideClose className="sm:max-w-[900px] px-0 poppins pt-0">
        <DialogHeader className="px-4 bg-header-image bg-cover bg-center rounded-t-md h-[8vh] flex justify-center">
          <DialogTitle className="text-xl text-white">Instructor&apos;s Details</DialogTitle>
        </DialogHeader>

        <div className="w-full mx-auto bg-white p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Instructor Image */}
            <div className="basis-5/12 border-r px-6 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full border-4 border-blue-500 overflow-hidden">
                <img
                  src={instructor?.imageUrl || "https://i.postimg.cc/Bv2nscWb/icon-default-avatar.png"}
                  alt={instructor?.name}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>

              <p className="mt-6 text-xs text-gray-500 bg-blue-50 p-3 rounded-md">
                Please confirm that this is the instructor whose ID is validated before
                adding as one of your instructors.
              </p>

              {/* Buttons */}
              <div className="mt-6 flex flex-col w-full gap-4">
                <Button
                  onClick={onConfirm}
                  className="px-6 py-2 cursor-pointer bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Confirm
                </Button>
                <Button
                  onClick={onCancel}
                  variant={"outline"}
                  className="cursor-pointer px-6 py-2 border border-red-600 text-red-600 hover:text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Cancel
                </Button>
              </div>
            </div>

            {/* Instructor Details */}
            <div className="flex-1">
              <h3 className="font-medium text-gray-700 mb-4">
                Personal Details
              </h3>
              <div className="space-y-8 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="text-sm">Full Name</span>
                  <span className="font-semibold">{instructor?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Date of Birth</span>
                  <span>{instructor?.dateOfBirth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Gender</span>
                  <span>{Number(instructor?.genderId) === 1 ? "Male" : "Femail"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">State of Origin</span>
                  <span>{instructor?.stateOfOrigin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">LGA of Origin</span>
                  <span>{instructor?.lgaOfOrigin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Phone Number</span>
                  <span>{instructor?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Email Address</span>
                  <span>{instructor?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Physical Address</span>
                  <span>{instructor?.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstructorDetailsCard;