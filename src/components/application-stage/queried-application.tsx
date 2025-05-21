import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/helpers/constants/routes.constant";
import { useQuery } from "@tanstack/react-query";
import { getApplicationStatusService } from "@/services/driving-school-app.service";

const QueriedApplication = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const { data: applicationStatus } = useQuery({
    queryKey: ["get_application_status"],
    queryFn: getApplicationStatusService,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl px-6 py-10 overflow-hidden rounded-lg border-none poppins">
        <DialogTitle className="flex items-center gap-2">
          <img src="/appStageNotification.svg" alt="" />
          <p className="text-primary-600">Queried</p>
        </DialogTitle>
        <div className="bg-primary-100 px-4 py-8 rounded-md my-4">
          <p className="font-bold text-center text-sm w-[99%] mx-auto">Your application has been queried. Kindly review the following comment and update your application as required.</p>
        </div>
        <div className="">
          <p className="font-semibold text-sm">Reason</p>
          <div className="bg-primary-50 p-4 rounded-md">
            <p className="text-sm">
              {
                applicationStatus?.data?.
                  queries[0]?.reason
              }
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Button
            className="bg-primary-600 text-white w-6/12 outline-none"
            onClick={() => navigate(`${ROUTES.STUDENTS}/update-registration`)}
          >
            Update Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QueriedApplication;