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

export const handleAPICall = async (callback) => {
  const res = await callback();

  const decryptedData = decryptPayload(res?.response);

  return JSON.parse(decryptedData);
};
