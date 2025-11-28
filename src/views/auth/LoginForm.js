"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeClosedIcon, EyeIcon, Loader } from "lucide-react";
import { cn, decryptPayload, encryptPayload } from "@/lib/utils";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "@/lib/features/auth/authSlice";
import toast from "react-hot-toast";
import Loading from "@/app/(public)/(auth)/loading";
import { useRouter } from "next/navigation";
import LoadingScreen from "../utils/LoadingScreen";

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email address cannot be empty" })
    .email({ message: "Enter valid email address" }),
  password: z
    .string()
    .nonempty({ message: "Password cannot be empty" })
    .min(5, { message: "A password must be at least 5 characters long" })
    .max(15, { message: "A password must be at most 15 characters" })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "Password must contain at least one number and one special character"
    ),
});

function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isSuccess, isLoading, isError, message, actionType } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    dispatch(login(values));
  }

  useEffect(() => {
    if (actionType !== "login") {
      return;
    }
    if (isError) {
      toast.error(
        message || "Error : Unbale to login, please try after sometime"
      );
    }

    if (isSuccess) {
      toast.success(message || "Success : Login Succesfull");
      setTimeout(() => {
        router.push("/");
      }, 500);
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isLoading, isError, message, actionType]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-full max-w-[90%] sm:max-w-md">
          <CardHeader>
            <CardTitle>Login to Discus Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g harrypotter@hogwarts.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <InputGroup
                          aria-invalid={!!fieldState.error}
                          className={cn(
                            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                            fieldState.error &&
                              "has-[[data-slot=input-group-control]:focus-visible]:border-red has-[[data-slot=input-group-control]:focus-visible]:ring-red/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",
                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                          )}
                        >
                          <InputGroupInput
                            {...field}
                            placeholder="e.g. Caput Draconis"
                            className="p-0"
                            type={showPassword ? "text" : "password"}
                          />
                          <InputGroupAddon align="inline-end" className="p-0">
                            <InputGroupButton
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                            >
                              {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                              {field.error}
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full cursor-pointer "
                  disabled={isLoading}
                >
                  {isLoading ? <Loader className="animate-spin" /> : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-[.875rem]">
            New here ?
            <Link href="/register" className="ml-1 underline">
              Create your account here
            </Link>
          </CardFooter>
        </Card>
      </div>
      {isLoading && actionType === "login" && (
        <LoadingScreen message="Loading..." />
      )}
    </>
  );
}

export default LoginForm;
