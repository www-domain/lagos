import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AssignedApplication = () => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl px-6 py-10 overflow-hidden rounded-lg border-none poppins">
        <DialogTitle className="flex items-center gap-2">
          <img src="/appStageNotification.svg" alt="" />
          <p className="text-primary-600">Inspection Scheduled</p>
        </DialogTitle>
        <div className="bg-primary-100 px-4 py-8 rounded-md my-4">
          <p className="font-bold text-center text-sm w-[99%] mx-auto">An inspector and time have been assigned to your driving school. Inspection is within 7-working days </p>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#666666] mb-1">Start</p>
            <div className="flex items-center gap-3">
              <div className="bg-[#D9D9D9] text-primary-950 p-2 px-4 rounded-md">17/03/2025</div>
              <div className="bg-[#D9D9D9] text-primary-950 p-2 px-4 rounded-md">10:00</div>
              <div className="text-[#666666] text-sm">
                AM
              </div>
            </div>
          </div>
          <div>
            <p className="text-[#666666] mb-1">End</p>
            <div className="flex items-center gap-3">
              <div className="bg-[#D9D9D9] text-primary-950 p-2 px-4 rounded-md">25/03/2025</div>
              <div className="bg-[#D9D9D9] text-primary-950 p-2 px-4 rounded-md">05:00</div>
              <div className="text-[#666666] text-sm">
                PM
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-center mt-4">
          <Button
            className="bg-primary-600 text-white w-6/12 outline-none"
            onClick={() => setOpen(false)}
          >
            Okay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignedApplication;