"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

const Socials = () => {
  const handleClick = (provider: "google") => {};

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
