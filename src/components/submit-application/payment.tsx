import InputField from '../ui/input';
import { Button } from '../ui/button'
import { ChevronsLeftIcon, ChevronsRightIcon, Loader } from 'lucide-react'
import { StepKey } from './continue-registration';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-store';
import { userProfileApi } from '@/services/user.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { intiatePayment, PaymentRequestParams, verifyPayment } from '@/services/payment.service';
import { DOCUMENT_UPLOAD_TYPE, TransactionType } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { VerifyPaymentModal } from '../verify-payment';
import { PaymentReferenceForm, resetInstructorForm, resetPaymentReferenceForm, resetSupportingDocumentsForm, resetValidateFacilityForm, updatePaymentReferenceForm } from '@/redux-store/slices/setup.slice';
import { CompleteRegistrationPayload, completeRegistrationService } from '@/services/driving-school-app.service';
import { useNavigate } from 'react-router-dom';
import { FailureModal } from '../failure-modal';
interface PaymentProps {
  currentStep: StepKey;
  handleBack: any;
}

const Payment = ({ currentStep, handleBack }: PaymentProps) => {
  const searchParams = new URLSearchParams(location.search);
  const [dialogSuccessOpen, setDialogSuccessOpen] = useState(false);
  const [dialogFailureOpen, setDialogFailureOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    validateFacilityForm: facilityStateValues,
    supportingDocumentsForm: supportingDocumentsStateValues,
    instructorForm: instructorStateValues
  } = useSelector((state: RootState) => state.setupStore);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["userProfileApi"],
    queryFn: () => userProfileApi(),
  });

  const { mutate: handlePayment, isPending: isPaying } = useMutation({
    mutationFn: (params: PaymentRequestParams) => intiatePayment(params),
    onSuccess(data) {
      window.location.href = data?.url;
    },
    onError() { },
  });

  const updatePaymentReference = (payload: Partial<PaymentReferenceForm>) => dispatch(updatePaymentReferenceForm(payload));

  const {
    mutate: verifyReference,
    isPending: isReferenceLoading,
    isSuccess: isReferenceVerified,
  } = useMutation({
    mutationFn: verifyPayment,
    onSuccess: async (data) => {
      dispatch(updatePaymentReference({ paymentReference: data?.reference }));
    },
    onError: (error) => {
      toast.error(`Failed to verify reference: ${error.message}`);
    },
  });

  const {
    mutate: handleCompleteApplication,
    isPending: isCreatingDrivingSchool,
  } = useMutation({
    mutationFn: (payload: CompleteRegistrationPayload) => completeRegistrationService(payload),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message)
        setDialogSuccessOpen(false);
        dispatch(resetInstructorForm())
        dispatch(resetSupportingDocumentsForm())
        dispatch(resetValidateFacilityForm())
        dispatch(resetPaymentReferenceForm())
        navigate("/students")
        return
      }
      toast.error(data?.message)
    },
    onError: (error) => {
      toast.error(`Failed to verify reference: ${error.message}`);
    },
  });

  const handleSubmit = async () => {
    try {
      const paymentPayload: PaymentRequestParams = {
        type: TransactionType.drivingSchoolApplication,
        email: profileData?.data?.email,
        description: "Payment Driving School Registration",
        successRedirectUrl: `${import.meta.env.VITE_APPLICATION_BASE_URL}/students/complete-registration?successRedirectModal=true`,
        failureRedirectUrl: `${import.meta.env.VITE_APPLICATION_BASE_URL}/students/complete-registration?failureRedirectModal=true`,
      };
      await handlePayment(paymentPayload)

    } catch (error) {
      toast.error("Payment initiation failed. Please try again.");
    }
  };

  useEffect(() => {
    const openSuccessModal = searchParams.get("successRedirectModal") === "true";
    const txRef = searchParams.get("reference")
    if (txRef) {
      verifyReference({
        reference: txRef,
        type: TransactionType.drivingSchoolApplication,
      });
      if (openSuccessModal) {
        setDialogSuccessOpen(true);
      }
    }
  }, []);

  useEffect(() => {
    const openFailureModal = searchParams.get("failureRedirectModal") === "true";
    const txRef = searchParams.get("reference")
    if (txRef) {
      verifyReference({
        reference: txRef,
        type: TransactionType.drivingSchoolApplication,
      });
      if (openFailureModal) {
        setDialogFailureOpen(true);
      }
    }
  }, []);

  const handleSubmitApplication = async () => {
    await handleCompleteApplication({
      totalVehicles: Number(facilityStateValues?.numberOfVehicles),
      vehicleTypes: facilityStateValues.typeOfVehicle,
      specialGadgets: facilityStateValues?.vehicleSpecialGadget,
      totalSimulators: Number(facilityStateValues?.numberOfSimulators),
      teachingAids: facilityStateValues?.teachingAids,
      trainingRange: facilityStateValues?.trainingRangeLocation,
      totalClassrooms: Number(facilityStateValues?.numberOfClassrooms),
      classRoomCapacity: facilityStateValues?.classRoomCapacity,
      totalInstructors: Number(instructorStateValues?.totalInstructors),
      instructorIDs: instructorStateValues?.instructorIDs,
      docType: DOCUMENT_UPLOAD_TYPE.CAC,
      docFile: supportingDocumentsStateValues?.fileName
    })
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="basis-5/12 flex items-start gap-4">
          <img src="/img/frame.svg" alt="Instructor Icon" />
          <div>
            <p className="text-[#1E73BE]">Make Payment</p>
            <p className="text-xs w-8/12 mt-2 leading-6">
              This is total breakdown of what you’re expected to registering as a driving school
            </p>
          </div>
        </div>
        <div className="flex-1 max-h-[65vh] hide-scrollbar h-full overflow-y-scroll pb-3">
          <div className="px-6 py-8 border rounded-xl bg-[#F5FAFF]">
            <div className='bg-[#F2F2F2] rounded-xl px-6 py-4'>
              <h2>Your Total</h2>
              <div className='flex items-center justify-between mt-6'>
                <span className='text-sm'>Application fee</span>
                <span className='font-semibold text-sm'>N 10,000</span>
              </div>
              <div className='flex items-center justify-between mt-6'>
                <span className='text-sm'>Inspection fee</span>
                <span className='font-semibold text-sm'>N 10,000</span>
              </div>
              <div className='flex items-center justify-between mt-6'>
                <span className='text-sm'>Charge</span>
                <span className='font-semibold text-sm'>N 1,760</span>
              </div>
              <div className='border border-gray-400 border-dashed my-4'></div>
              <div className='flex items-center justify-between mt-6'>
                <span className='text-sm font-semibold'>Total</span>
                <span className='font-semibold text-sm'>N 17,000</span>
              </div>
            </div>

            <div className='rounded-xl py-4 mt-8'>
              {
                isLoading ? <div className='w-1/2 h-2 rounded-md bg-gray-300 animate-pulse'></div> : <InputField
                  name="email"
                  value={profileData?.data?.email}
                  label="Reference Email "
                  type="text"
                  placeholder="Enter email"
                  onChange={(e) => { }}
                  showCheck={true}
                  readonly
                  className='bg-[#F2F2F2] border outline-none focus:border-gray-200'
                />
              }
              <p className='text-[10px] mt-1'>Your payment reference would be sent to the registered email</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between mt-4">
        <div className="basis-5/12 flex items-start gap-4"></div>
        <div className='flex-1'>
          <p className='text-xs'>
            By clicking confirm & pay, I agree to Lagos State Driving Institute payment <span className='font-bold text-primary-600 cursor-pointer'>policy</span>, and that LASDRI can charge my payment method for my registration. Payment Terms between you and LASDRI.
          </p>
        </div>
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
          onClick={handleSubmit}
          disabled={isLoading || isPaying}
          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white"
        >
          <ChevronsRightIcon />
          {isPaying ? <Loader className='animate-spin' /> : "Confirm & Pay"}
        </Button>
      </div>
      <VerifyPaymentModal
        onCloseAfterSuccess={handleSubmitApplication}
        isLoading={isReferenceLoading}
        isSuccess={isReferenceVerified}
        isOpen={dialogSuccessOpen}
        isConfirming={isCreatingDrivingSchool}
        onClose={() => {
          setDialogSuccessOpen(false);
        }}
      />

      <FailureModal
        onCloseAfterSuccess={handleSubmitApplication}
        isLoading={isReferenceLoading}
        isSuccess={isReferenceVerified}
        isOpen={dialogFailureOpen}
        isConfirming={isCreatingDrivingSchool}
        onClose={() => {
          setDialogFailureOpen(false);
        }}
      />
    </>
  )
}

export default Payment