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

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      return;
    }

    if (isError) {
      toast.error("Error : Unbale to verify user identiy", {
        duration: 1000,
      });

      setTimeout(() => {
        toast.error(`You will be redirect to login screen in`, {
          duration: 2000,
        });
      }, 1000);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isLoading, isError, message]);

  return <>{children}</>;
};
