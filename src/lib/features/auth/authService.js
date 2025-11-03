import axios from "axios";

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

const login = async (FormData) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/auth/login",
    FormData
  );

  await new Promise((resolve) => setTimeout(resolve, 5000)); // simulate delay

  return res.data;
};

const authService = { login };

export default authService;
