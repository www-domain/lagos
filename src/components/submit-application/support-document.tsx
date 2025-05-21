import React, { useState } from 'react'
import DocumentUpload from '../document-upload'
import InputField from '../ui/input';
import { Button } from '../ui/button';
import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { StepKey } from './continue-registration';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-store';
import { SupportingDocumentsForm, updateSupportingDocumentsForm } from '@/redux-store/slices/setup.slice';
import { HelperMethods } from '@/helpers/methods.helper';
import { useFileUploader } from '@/helpers/hooks/useFileUpload';
import { DOCUMENT_UPLOAD_TYPE } from '@/lib/utils';

const InputWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-8">{children}</div>;
};
interface SupportDocumentProps {
  currentStep: StepKey;
  handleValidate: any;
  handleBack: any;
}

const SupportDocument = ({ currentStep, handleBack, handleValidate }: SupportDocumentProps) => {
  const dispatch = useDispatch();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { supportingDocumentsForm: supportingDocumentStateValues } = useSelector((state: RootState) => state.setupStore);
  const updateSupportingDocuments = (payload: Partial<SupportingDocumentsForm>) => dispatch(updateSupportingDocumentsForm(payload));
  const { upload, loading, progress } = useFileUploader();

  const handleFileSelect = async (file: File) => {

    const base64File = await HelperMethods.FileToBase64(file);
    const uploadedFile = await upload({
      base64File: base64File,
      documentType: DOCUMENT_UPLOAD_TYPE.CAC,
      fileName: `cac_${new Date().toISOString()}`,
      mimeType: "image/jpeg",
    });
    setUploadedFile(file);
    updateSupportingDocuments({
      fileName: uploadedFile?.file
        ?.fileName
    })
  };

  return (
    <div className="flex items-start justify-between">
      <div className="basis-5/12 flex items-start gap-4">
        <img src="/img/doc.svg" alt="Instructor Icon" />
        <div>
          <p className="text-[#1E73BE]">Upload CAC Certificate</p>
          <p className="text-xs w-8/12 mt-2 leading-6">
            Kindly upload your company’s CAC document to proceed
          </p>
        </div>
      </div>
      <div className="flex-1 max-h-[65vh] hide-scrollbar h-full overflow-y-scroll pb-32">
        <div className="px-6 py-8 border rounded-xl bg-[#F5FAFF]">
          <form>
            <InputWrapper>
              <InputField
                name="DocumentType"
                value={"CAC"}
                label="Document Type"
                type="text"
                onChange={(e) => { }}
                readonly
                className='outline-none focus:ring-none focus:border-none bg-[#D9D9D9] font-medium'
              />
            </InputWrapper>

            <DocumentUpload onFileSelect={handleFileSelect} progress={progress} />

          </form>

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
            disabled={loading || progress < 100 || uploadedFile === null}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white"
          >
            <ChevronsRightIcon />
            Validate
          </Button>
        </div>
      </div>

    </div>
  )
}

export default SupportDocument