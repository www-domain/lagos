"use client";
import Sidebar from "@/components/sidebar";
import BtnLoader from "@/components/ui/BtnLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DropdownSelect from "@/components/ui/select";
import { VerifyPaymentModal } from "@/components/verify-payment";
import { permits } from "@/helpers/constants/image.constant";
import { ROUTES } from "@/helpers/constants/routes.constant";
import { useDropdownOptions } from "@/helpers/hooks/useDropdownOptions";
import { countries } from "@/lib/nationality-data.lib/countries";
import {
  bloodGroups,
  INPUT_NAMES,
  maritalStatuses,
  occupations,
  permitTypes,
  relationships,
  salutations,
  trainingDuration,
  TransactionType,
  yearOptions,
} from "@/lib/utils";
import { RootState } from "@/redux-store";
import {
  setIssuePermitData,
  setPermitReferenceData,
} from "@/redux-store/slices/permit.slice";
import {
  intiatePayment,
  PaymentRequestParams,
  verifyPayment,
} from "@/services/payment.service";
import { useIssuePermit } from "@/services/permit.service";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function IssuePermit() {
  const { permitTypeOptions } = useDropdownOptions(
    occupations,
    relationships,
    maritalStatuses,
    bloodGroups,
    permitTypes,
    salutations,
    countries,
    trainingDuration
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [permitType, setPermitType] = useState("");
  const [isInitiating, setIsInitiating] = useState(false);
  const [year, setYear] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const [reference, setPermitReference] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: issuePermit, isPending: issuingPermit } = useIssuePermit();
  const permit = useSelector((state: RootState) => state.permitStore.data);
  const permitReference = useSelector(
    (state: RootState) => state.permitStore.permitReferenceData
  );
  const {
    mutate: verifyReference,
    isPending: isReferenceLoading,
    isSuccess: isReferenceVerified,
  } = useMutation({
    mutationFn: verifyPayment,
    onSuccess: async (data) => {
      dispatch(setPermitReferenceData(data));
    },
    onError: (error) => {
      toast.error(`Failed to verify reference: ${error.message}`);
    },
  });

  useEffect(() => {
    const savedPermitType = localStorage.getItem("permitType");
    const savedYear = localStorage.getItem("year");

    if (savedPermitType) setPermitType(savedPermitType);
    if (savedYear) setYear(savedYear);

    // Remove from storage after restoring (optional)
    localStorage.removeItem("permitType");
    localStorage.removeItem("year");
    // Check if the modal should open on page load
    const openModal = searchParams.get("openModal") === "true";
    const txRef = searchParams.get("trxref");

    if (openModal) {
      setDialogOpen(true);
    }

    if (txRef) {
      setPermitReference(txRef);
      verifyReference({
        reference: txRef,
        type: TransactionType.permitIssuance,
      });
      setDialogOpen(true);
    }
  }, []);

  const handlePaymentAndIssuePermit = async () => {
    try {
      setIsInitiating(true);
      const txRef = searchParams.get("trxref") || "";
      setPermitReference(txRef);

      if (txRef) {
        verifyReference({
          reference: txRef,
          type: TransactionType.permitIssuance,
        });
        setDialogOpen(true);
        setIsInitiating(false);
        return;
      }

      // Save selected values before payment
      localStorage.setItem("permitType", permitType);
      localStorage.setItem("year", year);

      // Payment payload
      const paymentPayload: PaymentRequestParams = {
        type: TransactionType.permitIssuance,
        email: String(permit?.application?.email),
        description: "Payment for Permit Issuance",
        successRedirectUrl: `${import.meta.env.VITE_APPLICATION_BASE_URL}${ROUTES.PERMITS
          }${ROUTES.ISSUE_PERMIT}?openModal=true`,
        failureRedirectUrl: ``
      };

      // Initiate payment
      const paymentResponse = await intiatePayment(paymentPayload);
      window.location.href = paymentResponse.url;
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error("Payment initiation failed. Please try again.");
    }
  };

  const handleIssuePermit = async (verifiedReference: string) => {
    issuePermit(
      {
        permitClassId: Number(permitType),
        years: Number(year),
        studentNo: String(permit?.studentNo),
        reference: verifiedReference,
      },
      {
        onSuccess: (response: {
          success: boolean;
          message: string;
          data?: any;
        }) => {
          if (response?.success) {
            dispatch(setIssuePermitData(response.data));
            toast.success("Permit issued successfully!");
            navigate(
              `${ROUTES.PERMITS}${ROUTES.ISSUED_PERMIT_CONFIRMATION}/studentNo`
            );
            setDialogOpen(false);
          } else {
            toast.error(
              response?.message || "Permit issuance failed. Please try again."
            );
          }
        },
        onError: () => {
          toast.error(
            "An error occurred while issuing the permit. Please try again."
          );
        },
      }
    );
  };

  return (
    <main className="relative isolate">
      <Sidebar>
        <Link
          onClick={() => navigate(-1)}
          className=" inline-flex items-center text-lg hover:text-gray-900"
          to={""}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Permits
        </Link>

        <div className="mx-auto mt-8">
          <Card className="mt-0.4 border rounded-md shadow">
            <CardContent className="mt-6">
              <div className="mt-4">
                <p className="font-[#292C2A] text-lg">Issue Permit</p>
                <p className="mt-2 font-light text-sm">Select type of permit</p>
              </div>

              <div className="mt-8 mb-4">
                <img src={permits} alt="Permit Type" className="" />
              </div>

              <div>
                <div className="flex gap-4 mt-8">
                  <div className="flex-1 font-semibold">
                    <DropdownSelect
                      name={INPUT_NAMES.PERMIT_TYPE}
                      placeholder="Select an option"
                      label="Permit Type"
                      value={permitType}
                      onChange={(e) => setPermitType(e.target.value)}
                      options={permitTypeOptions}
                    />
                  </div>
                  <div className="flex-1 font-semibold">
                    <DropdownSelect
                      name={INPUT_NAMES.YEARS}
                      placeholder="Select an option"
                      label="Years"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      options={yearOptions}
                    />
                  </div>

                  <div className="flex-1"></div>
                  <div className="flex-1"></div>
                </div>

                <div className="flex justify-end mt-8">
                  <div>
                    {" "}
                    <Button
                      disabled={
                        issuingPermit || isReferenceLoading || isInitiating
                      }
                      onClick={handlePaymentAndIssuePermit}
                      className="bg-[#107BC0] text-white text-sm px-6 py-3 rounded-sm flex items-center"
                    >
                      {issuingPermit || isReferenceLoading || isInitiating ? (
                        <BtnLoader
                          visible={
                            issuingPermit || isReferenceLoading || isInitiating
                          }
                        />
                      ) : (
                        "Proceed"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <VerifyPaymentModal
          onCloseAfterSuccess={() => {
            handleIssuePermit(reference);
          }}
          isLoading={isReferenceLoading}
          isSuccess={isReferenceVerified}
          isOpen={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
        />
      </Sidebar>
    </main>
  );
}
