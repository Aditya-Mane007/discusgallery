import { AUTH_API } from "@/lib/API_URL";
import axios from "axios";

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

const login = async (formData) => {
  const res = await axios.post(AUTH_API + "/auth/login", formData, {
    withCredentials: true,
  });

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

const logout = async () => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/auth/logout",
    {
      withCredentials: true,
    }
  );

  return res;
};

const getUser = async () => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/auth/getUser",
    {
      withCredentials: true,
    }
  );

  return res;
};

const generateOTP = async () => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/auth/generateOTP",
    {
      withCredentials: true,
    }
  );

  return res;
};

const verifyOTP = async (formData) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/auth/verifyOTP",
    formData,
    {
      withCredentials: true,
    }
  );

  return res;
};

const authService = {
  login,
  register,
  logout,
  getUser,
  generateOTP,
  verifyOTP,
};

export default authService;
