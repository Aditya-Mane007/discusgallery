import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const encryptPayload = (payload) => {
  return CryptoJS.AES.encrypt(
    payload,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY
  ).toString();
};

export const decryptPayload = (payload) => {
  return CryptoJS.AES.decrypt(
    payload,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY
  ).toString(CryptoJS.enc.Utf8);
};

export const handleAPICall = async (formData, callback, thunkAPI) => {
  try {
    const encryptedData = {
      request: encryptPayload(JSON.stringify(formData)),
    };

    const res = formData ? await callback(encryptedData) : await callback();

    const decryptedData = decryptPayload(res?.data?.response);

    return JSON.parse(decryptedData);
  } catch (error) {
    const errorData = JSON.parse(
      decryptPayload(error?.response?.data?.response)
    );

    const message = errorData?.message || errorData.toString();

    return thunkAPI.rejectWithValue(message);
  }
};
