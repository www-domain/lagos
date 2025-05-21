/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import VerxidPopupSetup from "@/scripts/verxid.ts";
import { has } from "lodash";
import { useEffect, useRef, useState, useCallback } from "react";

export const useVerdixCapture = () => {
  const [faceData, setFaceData] = useState<string>("");
  const faceDataResolverRef = useRef<(value: string) => void | null>(null);

  const handlePopupCallback = useCallback((data: any) => {
    if (has(data, "image")) {
      setFaceData(data.image);
      popup.closePopup();
    }
  }, []);

  const popup = useRef(
    new VerxidPopupSetup({
      callback: (data) => {
        setTimeout(() => {
          handlePopupCallback(data);
        }, 3000);
      },
    }),
  ).current;

  const captureFinger = useCallback(() => {
    popup.init();
  }, [popup]);

  useEffect(() => {
    if (faceData && faceDataResolverRef.current) {
      faceDataResolverRef.current(faceData);
      // @ts-ignore
      faceDataResolverRef.current = null; // Reset the resolver ref
    }
  }, [faceData]);

  const waitForFaceData = useCallback(() => {
    return new Promise<string>((resolve) => {
      // @ts-ignore
      faceDataResolverRef.current = resolve;
    });
  }, []);

  return {
    initialize: captureFinger,
    data: faceData,
    waitForFaceData,
  };
};