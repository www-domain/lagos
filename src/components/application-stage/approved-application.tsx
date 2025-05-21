import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ApprovedApplication = () => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl px-6 py-8 overflow-hidden rounded-lg border-none poppins">
        <DialogTitle className="flex items-center gap-2">
          <img src="/appStageNotification.svg" alt="" />
          <p className="text-primary-600">Approved</p>
        </DialogTitle>
        <div className="bg-primary-100 px-4 py-8 rounded-md my-4">
          <p className="font-bold text-center w-[70%] mx-auto text-sm">Your application has been approved. Your dashboard is unlocked.</p>
        </div>
        <div className="flex items-center justify-center">
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

export default ApprovedApplication;