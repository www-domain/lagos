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
  AttestationIcon,
  PaymentIcon,
} from "@/components/ui/icons";
import SupportDocument from "./support-document";
import Attestation from "./attestation";
import Payment from "./payment";

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
  {
    id: "attestation",
    title: "Attestation",
    subtitle: "Read & Acknowledge",
    icon: <AttestationIcon />,
  },
  {
    id: "payment",
    title: "Payment",
    subtitle: "Card or Bank",
    icon: <PaymentIcon />,
  },
];

export type StepKey = "facilities" | "instructor" | "supportDoc" | "attestation" | "payment";

const STEP_PROGRESSION: Record<StepKey, { next: StepKey; prev: StepKey }> = {
  facilities: { next: "instructor", prev: "facilities" },
  instructor: { next: "supportDoc", prev: "facilities" },
  supportDoc: { next: "attestation", prev: "instructor" },
  attestation: { next: "payment", prev: "supportDoc" },
  payment: { next: "payment", prev: "attestation" },
};

const FORM_COMPONENTS: Record<StepKey, React.ComponentType<any> | undefined> = {
  facilities: FacilitiesForm,
  instructor: Instructor,
  supportDoc: SupportDocument,
  attestation: Attestation,
  payment: Payment,
};

const CompleteRegistration = () => {
  const [currentStep, setCurrentStep] = useState<StepKey>("facilities");

  const handleValidate = () => {
    const nextStep = STEP_PROGRESSION[currentStep]?.next || "payment";
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    const prevStep = STEP_PROGRESSION[currentStep]?.prev || "facilities";
    setCurrentStep(prevStep);
  };

  const renderForm = ({ handleBack, currentStep, handleValidate }: { currentStep: StepKey, handleValidate: any, handleBack: any }) => {
    const Component = FORM_COMPONENTS[currentStep];
    if (!Component) {
      return <div className="p-6">Step not implemented yet</div>;
    }
    const props = {
      handleBack: handleBack,
      handleValidate: handleValidate,
      currentStep: currentStep,
      setCurrentStep: setCurrentStep
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
              <Stepper steps={steps} currentStep={currentStep} />
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

export default CompleteRegistration;