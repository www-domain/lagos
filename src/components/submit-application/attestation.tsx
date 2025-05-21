import React from 'react'
import { Button } from '../ui/button'
import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { StepKey } from './continue-registration';

const attestations = [
  {
    id: 1,
    title: "Accuracy of Information:",
    texts: [
      "You confirm that all the information provided in your renewal application is true and accurate to the best of your knowledge.",
      "You agree to update your personal details, including name, address, and date of birth, if there have been any changes since your last application."
    ]
  },
  {
    id: 2,
    title: "Eligibility",
    texts: [
      "You attest that you are currently in possession of a valid driver's license that is due for renewal.",
      "You confirm that you have no pending traffic violations or suspensions that would disqualify you from renewing your driver's license.",
      "You agree that you meet all the necessary requirements for driver's license renewal as stipulated by the Department of Motor Vehicles (DMV)."
    ]
  },
  {
    id: 3,
    title: "Compliance with Traffic Laws:",
    texts: [
      "You commit to adhering to all traffic laws and regulations.",
      "You agree to drive responsibly and understand that failure to do so may result in legal consequences and the potential revocation of your driver's license.",
    ]
  },
  {
    id: 4,
    title: "Legal Consequences:",
    texts: [
      "You acknowledge that providing false information in your renewal application can result in the rejection of your application.",
      "You understand that any fraudulent information may lead to legal action against you."
    ]
  },
  {
    id: 5,
    title: "Signature and Date:",
    texts: [
      "By signing and dating the renewal form, you agree to these terms and conditions and confirm the accuracy of the information provide"
    ]
  }
]
interface AttestationProps {
  currentStep: StepKey;
  handleValidate: any;
  handleBack: any;
}

const Attestation = ({ currentStep, handleBack, handleValidate }: AttestationProps) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <div className="basis-5/12 flex items-start gap-4">
          <img src="/img/frame.svg" alt="Instructor Icon" />
          <div>
            <p className="text-[#1E73BE]">Read & Acknowledge</p>
            <p className="text-xs w-8/12 mt-2 leading-6">
              Fill the particular date the driving school certifcate was issued to you
            </p>
          </div>
        </div>
        <div className="flex-1 max-h-[65vh] hide-scrollbar h-full overflow-y-scroll pb-3">
          <div className="px-6 py-8 border rounded-xl bg-[#F5FAFF]">
            {
              attestations?.map((attestation) => {
                return <div key={attestation.id}>
                  <div className='flex gap-2'>
                    <span className='text-[#7D7D7D]'>{attestation.id}.</span>
                    <div>
                      <p className='mb-2 text-[#7D7D7D]'>{attestation.title}</p>
                      <ul className='mb-6'>
                        {
                          attestation.texts.map((text, idx) => {
                            return <li className='list-disc text-sm mb-2' key={idx}>{text}</li>
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between mt-4">
        <div className="basis-5/12 flex items-start gap-4"></div>
        <div className='flex-1'>
          <p className='text-xs'>By clicking continue, it means that <span className='font-bold'>you agree</span> to the Lagos State Drivers Institute <span className='text-[#1E73BE] cursor-pointer'>Privacy Policy</span> and <span className='text-[#1E73BE] cursor-pointer'>terms & conditions</span>.</p>
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
          onClick={handleValidate}
          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white"
        >
          <ChevronsRightIcon />
          Validate
        </Button>
      </div>
    </>
  )
}

export default Attestation