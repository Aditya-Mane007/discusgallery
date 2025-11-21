"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useState } from "react";

export function OTPForm({ ...props }) {
  const [verifyHandle, setVerifyHandle] = useState(false);
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Verify Your Email Address</CardTitle>
        <CardDescription>
          {verifyHandle
            ? "verify your email address by entering the one-time password (OTP) sent to your inbox."
            : "Click ‘Send Verification Email’ to receive your OTP and verify your email address"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verifyHandle ? (
          <>
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                  <InputOTP maxLength={6} id="otp" required>
                    <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </Field>
                <FieldGroup>
                  <Button>Verify</Button>
                  <FieldDescription className="text-center">
                    Didn&apos;t receive the code? <Link href="/">Resend</Link>
                  </FieldDescription>
                  <FieldDescription className="text-center">
                    <Link href="/">Skip for now</Link> to complete later.
                  </FieldDescription>
                </FieldGroup>
              </FieldGroup>
            </form>
          </>
        ) : (
          <>
            <Button
              className="w-full cursor-pointer"
              onClick={() => setVerifyHandle(true)}
            >
              Send Verification Email
            </Button>
            <Separator className="mt-2" />
            <FieldDescription className="text-center">
              <Link href="/">Skip for now</Link>, to complete later.
            </FieldDescription>
          </>
        )}
      </CardContent>
    </Card>
  );
}
