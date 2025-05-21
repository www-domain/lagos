import Sidebar from "../sidebar";
import React, { useState } from "react";
import Instructor from "./instructor";
import { Card, CardContent } from "@/components/ui/card";
import { Step, Stepper } from "@/components/submit-application/stepper";
import { FacilitiesForm } from "./facilities-form";
import {
  FacilitiesIcon,
  InstructorIcon,
  SupportDocIcon,
} from "@/components/ui/icons";
import SupportDocument from "./support-document";
import { useQuery } from "@tanstack/react-query";
import { getApplicationStatusService } from "@/services/driving-school-app.service";

const steps: Step[] = [
  {
    id: "facilities",
    title: "Facilities",
    subtitle: "Training Equipment",
    icon: <FacilitiesIcon />,
  },
  {
    id: "instructor",
    title: "Add Instructor",
    subtitle: "Onboard Instructor",
    icon: <InstructorIcon />,
  },
  {
    id: "supportDoc",
    title: "Support Doc",
    subtitle: "Upload Document",
    icon: <SupportDocIcon />,
  },
];

export type StepKey = "facilities" | "instructor" | "supportDoc";

const STEP_PROGRESSION: Record<StepKey, { next: StepKey; prev: StepKey }> = {
  facilities: { next: "instructor", prev: "facilities" },
  instructor: { next: "supportDoc", prev: "facilities" },
  supportDoc: { next: "supportDoc", prev: "instructor" },
};

const FORM_COMPONENTS: Record<StepKey, React.ComponentType<any> | undefined> = {
  facilities: FacilitiesForm,
  instructor: Instructor,
  supportDoc: SupportDocument,
};

const UpdateRegistration = () => {
  const [currentStep, setCurrentStep] = useState<StepKey>("facilities");

  const { data: applicationState, isPending } = useQuery({
    queryKey: ["get_application_status"],
    queryFn: getApplicationStatusService,
  });

  const handleValidate = () => {
    const nextStep = STEP_PROGRESSION[currentStep]?.next || "payment";
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    const prevStep = STEP_PROGRESSION[currentStep]?.prev || "facilities";
    setCurrentStep(prevStep);
  };

  console.log(applicationState, "===>")

  const renderForm = ({ handleBack, currentStep, handleValidate }: { currentStep: StepKey, handleValidate: any, handleBack: any }) => {
    const Component = FORM_COMPONENTS[currentStep];
    if (!Component) {
      return <div className="p-6">Step not implemented yet</div>;
    }
    const props = {
      handleBack: handleBack,
      handleValidate: handleValidate,
      currentStep: currentStep,
      setCurrentStep: setCurrentStep,
      isPending: isPending,
      editData: {
        numberOfVehicles: applicationState?.data?.totalVehicles || 0,
        typeOfVehicle: applicationState?.data?.vehicleTypes,
        vehicleSpecialGadget: applicationState?.data?.specialGadgets || "",
        numberOfSimulators: applicationState?.data?.totalSimulators || 0,
        teachingAids: applicationState?.data?.teachingAids || "",
        trainingRangeLocation: applicationState?.data?.trainingRange || "",
        numberOfClassrooms: applicationState?.data?.totalClassrooms || 0,
        classRoomCapacity: applicationState?.data?.classRoomCapacity || "",
        totalInstructors: applicationState?.data?.totalInstructors || 0
      }
    }
    const facilitiesProps = {};
    return <Component {...facilitiesProps} {...props} />;
  };

  return (
    <main className="relative isolate poppins">
      <Sidebar isPaddingPresent={false}>
        <div className="bg-slate-100 flex flex-col items-center p-8">
          <div className="w-full">
            <div className="bg-[#dddddd] mb-6 rounded-lg p-4 w-1/2">
              <h1 className="text-2xl font-bold text-gray-800">Complete Driving School Details</h1>
            </div>

            <Card className="w-full border rounded-xl">
              <Stepper steps={steps} currentStep={currentStep} handleValidate={handleValidate} />
              <CardContent className="py-10 min-h-screen">
                {renderForm({ handleBack, currentStep, handleValidate })}
              </CardContent>
            </Card>
          </div>
        </div>
      </Sidebar>
    </main>
  );
};

export default UpdateRegistration;