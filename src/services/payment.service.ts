import { request } from "@/helpers/axios.helper";
export interface PaymentRequestParams {
  type: string;
  email: string;
  description: string;
  successRedirectUrl: string;
  failureRedirectUrl: string;
}

export interface VerifyPaymentParams {
  type: string;
  reference: string;
}

export const intiatePayment = async (params: PaymentRequestParams) => {
  try {
    const { data } = await request.post("/payments/initiate", params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const verifyPayment = async (params: VerifyPaymentParams) => {
  try {
    const { data } = await request.post("/payments/verify", params);
    return data;
  } catch (error) {
    throw error;
  }
};
