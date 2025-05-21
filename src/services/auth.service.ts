import { request } from "@/helpers/axios.helper";

export type OtpServicePayload = {
  email: string;
  otp?: string;
};

export interface IResendOTP {
  type?: string;
  value?: string;
  email?: string;
  phone?: String;
}

// * L O G I N, S I G N U P, R E S E T  P A S S W O R D  S E R V I C E S
export const loginApi = async (payload: Record<string, any>) => {
  try {
    const { data } = await request.post("/auth/login", payload);
    return data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

// UPDATE PASSWORD
export const updatePasswordApi = async (payload: Record<string, any>) => {
  try {
    const { data } = await request.post("/auth/reset-password", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

// SEND OTP

export const sendOtpApi = async (payload: IResendOTP) => {
  try {
    const { data } = await request.post("/auth/send-otp", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

// VALIDATE OTP
export const validateOtpApi = async (payload: IResendOTP) => {
  try {
    const { data } = await request.post("/auth/validate-otp", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

// RESEND OTP
export const resendOtpApi = async (payload: IResendOTP) => {
  try {
    const { data } = await request.post("/auth/resend-otp", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

//VERIFY NIN
export const verifyNinApi = async (nin: string) => {
  const { data } = await request.get(`/auth/verify-nin/${nin}`);
  return data;
};
