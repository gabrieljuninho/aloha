import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import Socials from "@/common/components/ui/auth/socials";

import { IAuthLayoutProps } from "@/common/types/components";

const AuthLayout: FC<IAuthLayoutProps> = ({
  backButtonHref,
  backButtonLabel,
  children,
  type,
  showSocial,
}) => {
  return (
    <div className="w-full max-w-full p-4">
      <div className="p-4 sm:mx-auto sm:my-0 sm:w-[40rem] sm:p-12 sm:pt-6">
        <div className="mb-6 flex items-center justify-center">
          <div className="h-16 w-16">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width="50"
              height="50"
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
        {showSocial && (
          <>
            <div className="mb-4">
              <Socials />
            </div>
            <div className="relative my-8">
              <Separator />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-center text-[0.938rem] leading-none">
                Or
              </div>
            </div>
          </>
        )}
        {children}
        <div className="mt-6 px-0 text-center text-sm font-normal italic sm:px-16">
          By signing {type === "Sign up" ? "up" : "in"}, you are agreeing to our{" "}
          <Link href="/privacy" className="text-link hover:underline">
            privacy policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-link hover:underline">
            terms of use
          </Link>
          .
        </div>
        <Separator className="my-6" />
        <p className="text-center text-[0.938rem] font-normal leading-tight sm:leading-normal">
          {backButtonLabel}{" "}
          <Link href={backButtonHref} className="text-link hover:underline">
            {type === "Sign up" ? "Log in" : "Create account"}
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
