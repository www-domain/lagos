import { countries } from "@/lib/nationality-data.lib/countries";
import { lgas } from "@/lib/nationality-data.lib/lgas-1";
import { states } from "@/lib/nationality-data.lib/states-1";
import {
  bloodGroups,
  genders,
  maritalStatuses,
  occupations,
  permitTypes,
  relationships,
  salutations,
  trainingDuration,
} from "@/lib/utils";
import { TLGA } from "@/types";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

export class HelperMethods {
  // * C O N V E R T  F I L E  TO  B A S E 6 4
  static FileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // * C O M P R E S S  F I L E  A N D  C O N V E R T  TO  B A S E 6 4
  static CompressRawFileToBase64 = async (
    raw_file: File
  ): Promise<String | undefined> => {
    try {
      //  * C O M P R E S S  I M A G E  S I Z E  TO  2 M B
      const compressedFile = await imageCompression(raw_file, {
        maxSizeMB: 2,
        useWebWorker: true,
        maxWidthOrHeight: 800,
      });
      // * F I L E  T O  B A S E 6 4
      const base64 = await this.FileToBase64(compressedFile);
      return base64;
    } catch (error) {
      toast.error("Error: Compressing/Converting File");
    }
  };

  static GetInitials(name: string): string {
    if (!name) return "";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  }

  // * P R E V I E W  B A S E 6 4  I M A G E
  static PreviewBase64 = (basde64String: string) => {
    return `data:image/png;base64,${basde64String}`;
  };

  // * V A L I D A T E  F I L E  S I Z E
  static checkFileSize(
    file: File,
    maxSizeInMB: number = 2,
    warningMessage: string = "Maximum document size is 2MB"
  ) {
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSizeInMB) {
      toast.warning(warningMessage);
      return false;
    } else {
      return true;
    }
  }

  static mapExtensionToMIME(extension: string) {
    const extensionMap: { [key: string]: string } = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      pdf: "application/pdf",
      doc: "application/msword",
      html: "text/html",
      css: "text/css",
      js: "application/javascript",
      json: "application/json",
      gif: "image/gif",
      svg: "image/svg+xml",
      txt: "text/plain",
      mp4: "video/mp4",
      mp3: "audio/mpeg",
      wav: "audio/wav",
      zip: "application/zip",
      tar: "application/x-tar",
      xml: "application/xml",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    };
    return extensionMap[extension];
  }
}

// GET STATE ID FROM STATE NAME
export const getStateId = (stateName: string): number | null => {
  const state = states.find(
    (s) => s.name?.toLowerCase() === stateName?.toLowerCase()
  );
  return state ? state.id : null;
};

//GET ALL LGAS BY STATE ID
export const getLGAsByStateId = (stateId: number): TLGA[] => {
  return lgas.filter((lga: TLGA) => lga.state_id === stateId);
};
export const getLGAsByStateName = (stateName: string): TLGA[] => {
  const id = getStateId(stateName);
  return lgas.filter((lga: TLGA) => +lga.state_id === +id!);
};

// GET STATE NAME FROM STATE ID
export const getStateName = (stateId: number): string | null => {
  const state = states.find((s) => s.id === stateId);
  return state ? state.name : null;
};

// GET LGA NAME FROM STATE ID
export const getLgaName = (lgaId: number): string | null => {
  const lga = lgas.find((s) => s.id === lgaId);
  return lga ? lga.name : null;
};
// GET COUNTRIES NAME FOR ID
export const getCountryName = (countryId: number): string | null => {
  const country = countries.find((s) => s.id === countryId);
  return country ? country.name : null;
};

// GET RELATIONSHIP NAME FROM ID
export const getRelationshipName = (id: number): string | undefined => {
  return relationships.find((relation) => relation.id === id)?.name;
};
// GET MARITAL STATUS  NAME FROM ID
export const getMaritalStatusName = (id: number): string | undefined => {
  return maritalStatuses.find((status) => status.id === id)?.name;
};
//GET OCCUPATION  NAME FROM ID
export const getOccupationName = (id: number): string | undefined => {
  return occupations.find((occupation) => occupation.id === id)?.name;
};
// Blood GROUp
export const getBloodGroupName = (id: number): string | undefined => {
  return bloodGroups.find((group) => group.id === id)?.name;
};
// Permit TYPE
export const getPermitTypeName = (id: number): string | undefined => {
  return permitTypes.find((type) => type.id === id)?.name;
};

// GET GENDER NAME FROM ID
export const getGenderName = (id: number): string | undefined => {
  return genders.find((gender) => gender.id === id)?.name;
};
// GET TITLE NAME FROM ID
export const getTitleName = (id: number): string | undefined => {
  return salutations.find((title) => title.id === id)?.name;
};
// Ger tranning
export const getTrainingDurationName = (id: number): string | undefined => {
  return trainingDuration.find((duration) => duration.id === id)?.name;
};
