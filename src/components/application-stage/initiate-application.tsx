import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InitiateApplication = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true);
  const progress = 30;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden rounded-lg border-none poppins">
        <DialogTitle className="sr-only">Complete your application</DialogTitle>
        <div className="flex flex-col md:flex-row">
          {/* Left panel with progress */}
          <div className="w-full md:w-[40%] bg-gray-50 p-6 min-h-[540px] flex flex-col items-center justify-center space-y-6">
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 flex items-center justify-center">
                <Progress
                  value={progress}
                  className="h-56 w-56 rounded-full [&>div]:bg-primary-500 bg-gray-200"
                />
                <div className="w-44 h-44 absolute bg-white rounded-full flex items-center justify-center">
                  <div className="bg-gray-100 p-3 rounded">
                    <svg viewBox="0 0 24 24" className="w-14 h-14 text-primary-500">
                      <rect x="3" y="3" width="18" height="18" rx="2" className="fill-primary-500" />
                      <circle cx="9" cy="9" r="2" className="fill-primary-200" />
                      <rect x="6" y="14" width="12" height="2" rx="1" className="fill-primary-200" />
                      <rect x="13" y="8" width="5" height="2" rx="1" className="fill-primary-200" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-100 rounded-full px-14 py-2 text-yellow-600 font-semibold">
              30% complete
            </div>
            <h2 className="text-2xl text-gray-800">Complete your Application</h2>
          </div>

          {/* Right panel with form steps */}
          <div className="w-full md:w-[60%] p-8 relative">
            <div className="space-y-2 mb-6">
              <h1 className="text-xl font-bold text-gray-900">Complete your application</h1>
              <p className="text-gray-700">
                Every driving school <span className="text-primary-500 font-medium">must complete application</span>
                <br />to have full access to dashboard
              </p>
            </div>

            {/* Application steps */}
            <div className="space-y-0 mt-8">
              <div className="flex items-center p-4 border-b">
                <div className="mr-4 w-10 h-10 shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-primary-500">
                  <img src="/img/steering.svg" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-500">Facilities update</h3>
                  <p className="text-gray-600 text-sm">Include all available training equipment</p>
                </div>
              </div>

              {/* Add Instruction */}
              <div className="flex items-center p-4 border-b">
                <div className="mr-4 w-10 h-10 shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-primary-500">
                  {/* <Users className="h-5 w-5" /> */}
                  <img src="/img/user.svg" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-500">Add Instruction</h3>
                  <p className="text-gray-600 text-sm">Onboard driving instructor from your school</p>
                </div>
              </div>

              {/* Support Document */}
              <div className="flex items-center p-4 border-b">
                <div className="mr-4 w-10 h-10 shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-primary-500">
                  <img src="/img/upload.svg" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-500">Support Document</h3>
                  <p className="text-gray-600 text-sm">Upload CAC document</p>
                </div>
              </div>

              {/* Attestation */}
              <div className="flex items-center p-4 border-b">
                <div className="mr-4 w-10 h-10 shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-primary-500">
                  <img src="/img/attestation.svg" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-500">Attestation</h3>
                  <p className="text-gray-600 text-sm">Read & Acknowledge</p>
                </div>
              </div>

              {/* Payment */}
              <div className="flex items-center p-4 border-b">
                <div className="mr-4 w-10 h-10 shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-primary-500">
                  <img src="/img/currency.svg" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-500">Payment</h3>
                  <p className="text-gray-600 text-sm">Include all available training equipment</p>
                </div>
              </div>
            </div>

            {/* Complete button */}
            <div className="mt-8 flex justify-end">
              <Button
                onClick={() => {
                  setOpen(false)
                  navigate("/students/complete-registration")
                }}
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-8  rounded-md font-medium h-auto outline-none">
                <ChevronsRight className="ml-2 h-5 w-5" />
                Complete
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InitiateApplication