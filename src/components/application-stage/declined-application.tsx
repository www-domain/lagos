import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeclinedApplication = () => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl px-6 py-10 overflow-hidden rounded-lg border-none poppins">
        <DialogTitle className="flex items-center gap-2">
          <img src="/appStageNotification.svg" alt="" />
          <p className="text-primary-600">Declined</p>
        </DialogTitle>
        <div className="bg-primary-100 px-4 py-8 rounded-md my-4">
          <p className="font-bold text-center text-sm w-[99%] mx-auto">Your application was not approved. Kindly check the reasons and comment before applying again</p>
        </div>
        <div className="">
          <p className="font-semibold text-sm">Reason(s)</p>
          <div className="bg-primary-50 p-4 rounded-md">
            <ul className="list-disc list-inside">
              <li className="text-[#666666] text-sm">Must have a Traffic Laws & Regulations Handbook.</li>
              <li className="text-[#666666] text-sm">Must have copies of the Highway Code.</li>
              <li className="text-[#666666] text-sm">Must provide first aid facilities (e.g., first aid kit, trained personnel).</li>
              <li className="text-[#666666] text-sm">Must have a fire extinguisher available on-site.</li>
            </ul>
          </div>
        </div>

        <div className="">
          <p className="font-semibold text-sm">Comment</p>
          <div className="bg-primary-50 p-4 rounded-md">
            <p className="text-sm">The submitted instructor certifications do not meet the required standards. Kindly ensure all instructors have valid certifications and sufficient experience before reapplying</p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Button
            className="bg-primary-600 text-white w-6/12 outline-none"
            onClick={() => setOpen(false)}
          >
            Request Inspection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeclinedApplication;