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
  console.log("HANDLE API CALL FORM DATA : ", formData);
  try {
    const encryptedData = {
      request: encryptPayload(JSON.stringify(formData)),
    };

    const res = formData ? await callback(encryptedData) : await callback();

    try {
      const decryptedData = decryptPayload(res?.data?.response);

      console.log("DECRYPTED DATA : ", decryptedData);
      return JSON.parse(decryptedData);
    } catch (error) {
      throw new Error("Error : Facing issue while decrypting response");
    }
  } catch (error) {
    const errorData = JSON.parse(
      decryptPayload(error?.response?.data?.response)
    );

    const message = errorData?.message || errorData.toString();

    return thunkAPI.rejectWithValue(message);
  }
};
