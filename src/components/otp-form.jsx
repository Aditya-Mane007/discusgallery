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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Form, FormField } from "@/components/ui/form";
import { generateOTP, reset, verifyOTP } from "@/lib/features/auth/authSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { act, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "OTP must be of 6 numbers",
    })
    .max(6, {
      message: "OTP must be of 6 numbers",
    }),
});

export function OTPForm({ ...props }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [verifyHandle, setVerifyHandle] = useState(false);
  const { isSuccess, isError, isLoading, message, actionType, user } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (actionType === "generateOTP" || actionType === "verifyOTP") {
      if (isSuccess) {
        toast.success(message);

        if (actionType === "generateOTP") {
          setVerifyHandle(true);
        }
        if (actionType === "verifyOTP") {
          router.push("/");
        }
      }

      if (isError) {
        toast.error(message);
      }

      // return () => {
      //   dispatch(reset());
      // };
    }
  }, [isSuccess, isError, isLoading, message]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (values) => {
    dispatch(verifyOTP(values));
  };

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
            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                      <InputOTP maxLength={6} id="otp" required {...field}>
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
                  )}
                />

                <Button
                  type="submit"
                  className="w-full cursor-pointer "
                  disabled={isLoading}
                >
                  {isLoading && actionType === "verifyOTP" ? (
                    <>
                      <Loader className="animate-spin" /> Verifying
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </form>
            </Form>
            <Separator className="mt-4" />
            <FieldDescription className="text-center my-1">
              Didn&apos;t receive the code?{" "}
              <Button
                variant="link"
                onClick={() => dispatch(generateOTP())}
                className="mx-1 px-0 underline cursor-pointer"
              >
                Resend
              </Button>
            </FieldDescription>
            <FieldDescription className="text-center">
              <Link href="/">Skip for now</Link> to complete later.
            </FieldDescription>
          </>
        ) : (
          <>
            <p className="text-muted-foreground text-sm my-2">
              OTP Attempts Left: {user?.otp_attempts}
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={`w-full cursor-pointer ${
                    user?.otp_attempts === 0 && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (user?.otp_attempts !== 0) {
                      dispatch(generateOTP());
                    }
                  }}
                  disabled={isLoading}
                >
                  {isLoading && actionType == "generateOTP" ? (
                    <>
                      <Loader className="animate-spin" /> Sending Verification
                      Email
                    </>
                  ) : (
                    "Send Verification Email"
                  )}
                </Button>
              </TooltipTrigger>
              {user?.otp_attempts === 0 && (
                <TooltipContent>
                  OTP attempts exceeded. Please wait 3 hours before trying
                  again.
                </TooltipContent>
              )}
            </Tooltip>
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
