/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyFaceService } from "@/services/verify-face.service";
import { useState } from "react";

// * Handles NIN Face Verification;
type Verify = {
  ninFace: string;
  capturedFace: string;
};

const useFaceVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  const verify = async ({
    ninFace,
    capturedFace,
  }: Verify): Promise<boolean> => {
    try {
      setIsVerifying(true);
      const response: any = await verifyFaceService(ninFace, capturedFace);
      console.log("response",response)
      return response?.possibleMatch;
    } catch (error) {
      console.error(" Error during face verification:", error);
      return false;
    } finally {
      setIsVerifying(false);
    }    
  };

  return { verify, isVerifying };
};

export default useFaceVerification;