"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, reset } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const AuthGuard = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  // console.log("Success : ", isSuccess);
  // console.log("isLoading : ", isLoading);
  // console.log("isError : ", isError);
  // console.log("message : ", message);

  useEffect(() => {
    if (!isSuccess && !isLoading && !isError && !message) {
      dispatch(getUser());
    }

    if (isSuccess) {
      return;
    }

    if (isError) {
      toast.error(message || "Error : Unbale to verify user identiy");

      setTimeout(() => {
        toast.error(`You will be redirect to login screen in`);
      }, 500);

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }

    return () => {
      dispatch(reset());
    };
  }, []);

  return <>{children}</>;
};
