import { encryptPayload, handleAPICall } from "@/lib/utils";
import axios from "axios";

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

const login = async (formData) => {
  const encryptedData = {
    request: encryptPayload(JSON.stringify(formData)),
  };

  const result = await handleAPICall(async () => {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/auth/login",
      encryptedData,
      {
        withCredentials: true,
      }
    );

    return res?.data;
  });

  return result;
};

const register = async (formData) => {
  const encryptedData = {
    request: encryptPayload(JSON.stringify(formData)),
  };

  const result = await handleAPICall(async () => {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/auth/register",
      encryptedData,
      {
        withCredentials: true,
      }
    );
    return res.data;
  });
  return result;
};

const authService = { login, register };

export default authService;
