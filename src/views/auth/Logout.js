"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { logout, reset } from "@/lib/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isSuccess, message, isError, isLoading, actionType } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (actionType === "logout" && isSuccess) {
      toast.success(message);
      setTimeout(() => {
        router.push("/login");
      }, 500);
    }

    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, message, isError, isLoading]);
  return (
    <Button
      className="cursor-pointer"
      onClick={() => {
        console.log("Logout log");
        dispatch(logout());
      }}
    >
      Logout
    </Button>
  );
}

export default Logout;
