import { encryptPayload, handleAPICall } from "@/lib/utils";
import axios from "axios";

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

const login = async (formData) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/auth/login",
    formData,
    {
      withCredentials: true,
    }
  );

  return res;
};

const register = async (formData) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/auth/register",
    formData,
    {
      withCredentials: true,
    }
  );

  return res;
};

const authService = { login, register };

export default authService;
