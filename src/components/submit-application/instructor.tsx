import React, { useEffect, useState } from 'react';
import NumberSelectorInput from '../number-selector-input';
import ValidateInput from '../validate-input';
import InstructorDetailsCard from '../submit-application/instructor-details-card';
import { Button } from '../ui/button';
import { ChevronsLeftIcon, ChevronsRightIcon, LucideXCircle } from 'lucide-react';
import { StepKey } from './continue-registration';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { useMutation } from '@tanstack/react-query';
import { validateInstructorService } from '@/services/driving-school-app.service';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { InstructorForm, updateInstructorForm } from '@/redux-store/slices/setup.slice';
import { RootState } from '@/redux-store';
export interface Instructor {
  instructorId: string;
  name: string;
  dateOfBirth: string;
  genderId: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  phone: string;
  email: string;
  address: string;
  imageUrl?: string;
}

interface InstructorFormProps {
  currentStep: StepKey;
  handleValidate: any;
  handleBack: any;
  editData?: {
    totalInstructors: any;
  };
}

const numbers = [
  2, 12, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 42, 52, 62, 72, 82,
  92, 102, 112, 120, 132, 142,
];

const InputWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-8">{children}</div>;
};

const Instructor = ({ currentStep, handleBack, handleValidate, editData }: InstructorFormProps) => {
  const dispatch = useDispatch();
  const [showInstructorDetailsDialog, setShowInstructorDetailsDialog] = useState(false);
  const [instructorsList, setInstructorsList] = useState<Instructor[]>([]);
  const [pendingInstructor, setPendingInstructor] = useState<Instructor | null>(null);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [instructorValidationStates, setInstructorValidationStates] = useState<
    { isSuccess: boolean; isValidating: boolean }[]>([]);

  const { instructorForm: instructorStateValues } = useSelector((state: RootState) => state.setupStore);
  const updateInstructor = (payload: Partial<InstructorForm>) => dispatch(updateInstructorForm(payload));

  const handleAddInstructor = () => {
    setInstructorValidationStates((prev) => [
      ...prev,
      { isSuccess: false, isValidating: false },
    ]);
  };

  const { mutate: handleValidateInstructor } = useMutation({
    mutationFn: (payload: { index: number; id: string }) => validateInstructorService(payload),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        const index = variables.index;
        const validatedInstructor = data?.data;
        setPendingInstructor(validatedInstructor);
        setPendingIndex(index);
        setInstructorValidationStates((prev) =>
          prev.map((state, i) => (i === index ? { ...state, isSuccess: false } : state))
        );
        setShowInstructorDetailsDialog(true);
        return;
      }
      setShowInstructorDetailsDialog(false);
      setInstructorValidationStates((prev) =>
        prev.map((state, i) =>
          i === variables?.index ? { ...state, isValidating: false } : state
        )
      );
      toast.error(data?.message)
    },
    onError: (error: any) => {
      toast.error("Error validating instructor");
    },
    onMutate: (variables) => {
      const index = variables.index;
      setInstructorValidationStates((prev) =>
        prev.map((state, i) =>
          i === index ? { ...state, isValidating: true } : state
        )
      );
    },
  });

  const handleConfirm = () => {
    if (pendingInstructor && pendingIndex !== null) {
      setInstructorsList((prev) => [...prev, pendingInstructor]);
      setInstructorValidationStates((prev) =>
        prev.map((state, i) =>
          i === pendingIndex ? { ...state, isSuccess: true } : state
        )
      );
      updateInstructor({ instructorIDs: [...instructorsList.map((instr) => instr.instructorId), pendingInstructor.instructorId] });
    }
    setShowInstructorDetailsDialog(false);
    setPendingInstructor(null);
    setPendingIndex(null);
  };

  const handleCancel = () => {
    if (pendingIndex !== null) {
      setInstructorValidationStates((prev) =>
        prev.map((state, i) =>
          i === pendingIndex ? { ...state, isValidating: false } : state
        )
      );
    }
    setShowInstructorDetailsDialog(false);
    setPendingInstructor(null);
    setPendingIndex(null);
  };

  const handleRemoveInstructor = (index: number) => {
    setInstructorsList((prev) => prev.filter((_, i) => i !== index));
    setInstructorValidationStates((prev) => prev.filter((_, i) => i !== index));
    updateInstructor({ instructorIDs: instructorsList.filter((_, i) => i !== index).map((instr) => instr.instructorId) });
  };

  useEffect(() => {
    if (editData) {
      dispatch(updateInstructorForm(editData));
    }
  }, [dispatch, editData]);


  const selectedInstructorCount = parseInt(instructorStateValues?.totalInstructors) || 0;
  const canAddMoreInstructors = instructorsList.length < selectedInstructorCount;

  return (
    <div className="flex items-start justify-between">
      <div className="basis-5/12 flex items-start gap-4">
        <img src="/img/instructor.svg" alt="Instructor Icon" />
        <div>
          <p className="text-[#1E73BE]">Onboard Instructor</p>
          <p className="text-xs w-8/12 mt-2 leading-6">
            You are required to add the number of the instructor you’ve selected before you can proceed
          </p>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 border rounded-xl bg-[#F5FAFF]">
        <form>
          <InputWrapper>
            <NumberSelectorInput
              label="Number of Instructor"
              name="instructors"
              value={instructorStateValues?.totalInstructors || ""}
              numbers={numbers}
              placeholder="Select number of instructors"
              onChange={(e) => {
                updateInstructor({
                  totalInstructors: e.target.value,
                });
              }}
              className="bg-white border"
            />
            <p className="text-[10px] mt-1.5">
              You can only add instructors in your driving school
            </p>
          </InputWrapper>

          {instructorValidationStates.map((state, index) => (
            <div key={index}>
              {!state.isSuccess && (
                <InputWrapper>
                  <ValidateInput
                    label={`Instructor ${index + 1}’s ID`}
                    placeholder="Enter instructor’s ID"
                    withApiButton
                    name="instructorsId"
                    apiButtonLabel="Validate"
                    isApiSuccess={state.isSuccess}
                    apiButtonLoading={state.isValidating}
                    onApiButtonClick={(e) => {
                      e.preventDefault();
                      handleValidateInstructor({ index, id: instructorStateValues?.instructorIDs[0] || '' });
                    }}
                    onChange={(e) => {
                      updateInstructor({ instructorIDs: [e.target.value] });
                    }}
                  />
                  <p className="text-[10px] mt-1.5">
                    You can only add instructors in your driving school
                  </p>
                </InputWrapper>
              )}
              {state.isSuccess && instructorsList[index] && (
                <InputWrapper>
                  <div className="bg-[#F2F2F2] p-4 rounded-xl flex justify-between items-center">
                    <div className="flex gap-2">
                      <img
                        src={instructorsList[index].imageUrl || "/img/instructor-dp.svg"}
                        className="w-20"
                        alt="Instructor DP"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="text-xs">{`${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} Instructor`}</p>
                        <p className="text-sm font-semibold">{instructorsList[index]?.name}</p>
                        <p className="text-sm">{`${instructorsList[index]?.instructorId}`}</p>
                      </div>
                    </div>
                    <div>
                      <LucideXCircle
                        className="w-6 text-red-500 cursor-pointer"
                        onClick={() => handleRemoveInstructor(index)}
                      />
                    </div>
                  </div>
                </InputWrapper>
              )}
            </div>
          ))}

          <div className="flex gap-3 items-center" onClick={canAddMoreInstructors ? handleAddInstructor : undefined}>
            <PlusCircleIcon
              className={cn("w-7", canAddMoreInstructors ? "text-primary-600 cursor-pointer" : "text-gray-400 cursor-not-allowed")}
            />
            <p
              className={cn(
                "font-semibold text-sm",
                canAddMoreInstructors ? "text-primary-600 cursor-pointer" : "text-gray-400 cursor-not-allowed"
              )}
            >
              Add new instructor
            </p>
          </div>

          <div className="flex gap-4 justify-end py-6">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-1 border-green-500 text-green-500"
              disabled={currentStep === "facilities"}
            >
              <ChevronsLeftIcon />
              Back
            </Button>
            <Button
              onClick={handleValidate}
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white"
              disabled={canAddMoreInstructors}
            >
              <ChevronsRightIcon />
              Validate
            </Button>
          </div>
        </form>

        {pendingInstructor && (
          <InstructorDetailsCard
            instructor={pendingInstructor}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            setShowInstructorDetailsDialog={setShowInstructorDetailsDialog}
            showInstructorDetailsDialog={showInstructorDetailsDialog}
          />
        )}
      </div>
    </div>
  );
};

export default Instructor;