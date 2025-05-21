import InputField from "../ui/input";
import DropdownSelect from "../ui/custom-select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  updateValidateFacilityForm,
  ValidateFacilityForm,
} from "@/redux-store/slices/setup.slice";
import { RootState } from "@/redux-store";
import { StepKey } from "./continue-registration";

interface FacilitiesFormProps {
  currentStep: StepKey;
  handleValidate: any;
  handleBack: any;
  setCurrentStep: any;
  isPending?: boolean;
  editData?: ValidateFacilityForm;
}

const InputWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-8">{children}</div>;
};

export function FacilitiesForm({
  currentStep,
  handleBack,
  handleValidate,
  setCurrentStep,
  isPending,
  editData,
}: FacilitiesFormProps) {
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);

  const { validateFacilityForm: facilityStateValues } = useSelector(
    (state: RootState) => state.setupStore
  );

  const updateValidateFacility = (payload: Partial<ValidateFacilityForm>) =>
    dispatch(updateValidateFacilityForm(payload));

  useEffect(() => {
    if (editData) {
      dispatch(updateValidateFacilityForm(editData));
    }
  }, [dispatch, editData]);

  useEffect(() => {
    const openSuccessRedirectModal =
      searchParams.get("successRedirectModal") === "true";
    if (openSuccessRedirectModal) {
      setCurrentStep("payment");
    }
  }, [searchParams, setCurrentStep]);

  useEffect(() => {
    const openFailureRedirectModal =
      searchParams.get("failureRedirectModal") === "true";
    if (openFailureRedirectModal) {
      setCurrentStep("payment");
    }
  }, [searchParams, setCurrentStep]);

  const isButtonDisabled =
    !facilityStateValues?.numberOfVehicles ||
    !facilityStateValues?.typeOfVehicle?.length ||
    !facilityStateValues?.numberOfSimulators ||
    !facilityStateValues?.numberOfClassrooms ||
    !facilityStateValues?.trainingRangeLocation ||
    !facilityStateValues?.teachingAids ||
    !facilityStateValues?.vehicleSpecialGadget ||
    !facilityStateValues?.classRoomCapacity;

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="flex items-start justify-between">
      <div className="basis-5/12 flex items-start gap-4">
        <img src="/img/frame.svg" alt="Frame Icon" />
        <div>
          <p className="text-[#1E73BE]">Provide all necessary data</p>
          <p className="text-xs w-8/12 mt-2 leading-6">
            Ensure that you fill every requirement before proceeding to the next
            step
          </p>
        </div>
      </div>

      <div className="flex-1 max-h-[90vh] hide-scrollbar h-full overflow-y-scroll pb-56">
        <div className={cn("px-6 py-8 border rounded-xl bg-[#F5FAFF]")}>
          <InputWrapper>
            <InputField
              name="numberOfVehicles"
              value={facilityStateValues?.numberOfVehicles || ""}
              type="number"
              onChange={(e) =>
                updateValidateFacility({ numberOfVehicles: e.target.value })
              }
              label="Number of Vehicle"
              className="bg-white border border-gray-200"
              placeholder="Enter numbers of vehicle"
            />
          </InputWrapper>

          <InputWrapper>
            <DropdownSelect
              label="Type of Vehicle"
              name="typeOfVehicle"
              value={facilityStateValues?.typeOfVehicle || []}
              placeholder="Select vehicle type"
              onChange={(value) =>
                updateValidateFacility({
                  typeOfVehicle: Array.isArray(value) ? value : [value],
                })
              }
              isMultiSelect
              textColor="#000000"
              options={[
                { label: "Sedan", value: "sedan" },
                { label: "SUV", value: "suv" },
                { label: "Camry", value: "camry" },
              ]}
            />
          </InputWrapper>

          <InputWrapper>
            <InputField
              name="vehicleSpecialGadget"
              value={facilityStateValues?.vehicleSpecialGadget || ""}
              type="text"
              onChange={(e) =>
                updateValidateFacility({
                  vehicleSpecialGadget: e.target.value,
                })
              }
              label="Specify if any vehicle has any special gadget"
              className="bg-white border border-gray-200"
              placeholder="Enter special gadgets"
            />
          </InputWrapper>

          <InputWrapper>
            <InputField
              name="numberOfSimulators"
              value={facilityStateValues?.numberOfSimulators || ""}
              type="number"
              onChange={(e) =>
                updateValidateFacility({
                  numberOfSimulators: e.target.value,
                })
              }
              label="Numbers of Simulators"
              className="bg-white border border-gray-200"
              placeholder="Enter numbers of simulators"
            />
          </InputWrapper>

          <InputWrapper>
            <InputField
              name="teachingAids"
              value={facilityStateValues?.teachingAids || ""}
              type="text"
              onChange={(e) =>
                updateValidateFacility({ teachingAids: e.target.value })
              }
              label="Teaching Aids"
              className="bg-white border border-gray-200"
              placeholder="Enter teaching aids"
            />
          </InputWrapper>

          <InputWrapper>
            <InputField
              name="trainingRangeLocation"
              value={facilityStateValues?.trainingRangeLocation || ""}
              type="text"
              onChange={(e) =>
                updateValidateFacility({
                  trainingRangeLocation: e?.target?.value,
                })
              }
              label="Training Range Location"
              className="bg-white border border-gray-200"
              placeholder="e.g 12 Kilometers"
            />
          </InputWrapper>

          <InputWrapper>
            <InputField
              name="numberOfClassrooms"
              value={facilityStateValues?.numberOfClassrooms || ""}
              type="number"
              onChange={(e) =>
                updateValidateFacility({
                  numberOfClassrooms: e.target.value,
                })
              }
              label="Number of Classrooms"
              className="bg-white border border-gray-200"
              placeholder="Enter number of classrooms"
            />
          </InputWrapper>

          <InputWrapper>
            <DropdownSelect
              label="Classroom Capacity"
              name="classRoomCapacity"
              value={facilityStateValues?.classRoomCapacity || ""}
              placeholder="Enter classroom capacity"
              onChange={(value) =>
                updateValidateFacility({
                  classRoomCapacity: Array.isArray(value)
                    ? value.join(", ")
                    : value,
                })
              }
              textColor="#000000"
              options={[
                { label: "10 Persons", value: "10" },
                { label: "20 Persons", value: "20" },
                { label: "30 Persons", value: "30" },
              ]}
            />
          </InputWrapper>
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
            disabled={isButtonDisabled}
          >
            <ChevronsRightIcon />
            {editData ? "Save Changes" : "Validate"}
          </Button>
        </div>
      </div>
    </div>
  );
}
