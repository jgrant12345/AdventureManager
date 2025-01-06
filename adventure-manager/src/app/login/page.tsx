"use client";
import LoginForm from "@/components/LoginForm/LoginForm";
import { SignUpForm } from "@/components/SignUpForm/SignUpForm";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export default function AuthenticationPage() {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const router = useRouter(); // Initialize the useRouter hook
  const Form: ReactNode = isLoginForm ? <LoginForm /> : <SignUpForm />;
  console.log(isLoginForm);
  return (
    <div>
      <button onClick={() => setIsLoginForm(!isLoginForm)}>change</button>
      {Form}
    </div>
  );
}
