import React from "react";
import { cn } from "@/lib/utils";

export type Step = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

interface StepperProps {
  steps: Step[];
  currentStep: string;
  handleValidate?: any;
}

export function Stepper({ steps, currentStep, handleValidate }: StepperProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="flex w-full overflow-x-auto border-0 rounded-t-xl poppins">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = index < currentStepIndex;
        const isUpcoming = index > currentStepIndex;

        return (
          <div
            key={step.id}
            className={cn(
              "flex flex-1 min-w-[180px] flex-col items-center justify-center p-4 border-r",
              isActive && "bg-white border-b-0",
              isCompleted && "bg-[#F8FAFC] border-b",
              isUpcoming && "bg-[#F2F2F2] border-b"
            )}
            onClick={handleValidate}
          >
            <div className="flex items-center mb-1">
              <div className="mr-2">
                {React.cloneElement(step.icon as React.ReactElement, {
                  className: cn(
                    isActive && "text-primary-600",
                    isCompleted && "text-primary-600",
                    isUpcoming && "text-gray-400"
                  ),
                })}
              </div>
              <h3
                className={cn(
                  "text-base font-bold",
                  isActive && "text-primary-600",
                  isCompleted && "text-primary-600",
                  isUpcoming && "text-black"
                )}
              >
                {step.title}
              </h3>
            </div>
            <div className="flex items-center mb-1">
              <p
                className={cn(
                  "text-xs text-gray-600",
                )}
              >
                {step.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}