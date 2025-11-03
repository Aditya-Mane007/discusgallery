import LoginForm from "@/views/auth/LoginForm";
import { Suspense } from "react";
import Loading from "../loading";

export default function Login({ params, searchParams }) {
  return (
    <Suspense fallback={<Loading />}>
      <LoginForm />
    </Suspense>
  );
}
