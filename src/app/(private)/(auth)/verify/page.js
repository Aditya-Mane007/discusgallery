import { OTPForm } from "@/components/otp-form";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Verify Identity | Discus Gallery",
    description:
      "Verify your email address with a one-time password (OTP) sent to your inbox. Secure your account with easy email verification or skip and verify later.",
  };
}

function page() {
  return (
    <div className="w-full min-h-svh flex justify-center items-center">
      <div className="w-full max-w-[340px]">
        <OTPForm />
      </div>
    </div>
  );
}

export default page;
