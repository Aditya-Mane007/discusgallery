"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { logout, reset } from "@/lib/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingScreen from "../utils/LoadingScreen";

function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isSuccess, message, isError, isLoading, actionType } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (actionType !== "logout") {
      return;
    }
    if (isSuccess) {
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
  }, [isSuccess, message, isError, isLoading, actionType]);
  return (
    <>
      <Button
        className="cursor-pointer"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>
      {isLoading && actionType === "logout" && (
        <LoadingScreen message="Logging out." />
      )}
    </>
  );
}

export default Logout;
