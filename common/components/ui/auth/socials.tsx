"use client";

import { useSearchParams } from "next/navigation";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Socials = () => {
  const urlParams = useSearchParams();
  const callBackUrl = urlParams.get("callbackUrl");

  const handleClick = (provider: "google") => {
    signIn(provider), { callbackUrl: callBackUrl || DEFAULT_LOGIN_REDIRECT };
  };

  return (
    <Button
      variant="outline"
      className="w-full gap-2 hover:bg-secondary/80"
      onClick={() => handleClick("google")}
    >
      <FcGoogle className="h-5 w-5" />
      <span>Continue with Google</span>
    </Button>
  );
};

export default Socials;
