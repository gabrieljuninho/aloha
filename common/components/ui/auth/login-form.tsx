/* eslint-disable indent */

"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { login } from "@/actions/login";

import Spinner from "@/common/components/elements/spinner";
import AuthLayout from "@/common/components/ui/auth/auth-layout";

import { LoginSchema } from "@/schemas";

const LoginForm = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const urlParams = useSearchParams();
  const callBackUrl = urlParams.get("callbackUrl");
  const errorUrlParam =
    urlParams.get("error") === "OAuthAccountNotLinked"
      ? "This account is already linked to a user. Please sign in with a different account."
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values, callBackUrl)
        .then((data) => {
          if (data?.error) {
            if (data.error.email) {
              form.setValue("email", "");
            }

            if (data.error.password) {
              form.setValue("password", "");
            }

            if (data.error.general) {
              form.reset();
            }

            setEmailError(data.error.email);
            setPasswordError(data.error.password);
            setGeneralError(data.error.general);
          }

          if (!data?.error) {
            form.reset();

            router.push("/");
          }
        })
        .catch((err) => {
          setGeneralError("Something went wrong.");
        });
    });
  };

  useEffect(() => {
    const zodEmailError = form.formState.errors.email?.message || null;
    const zodPasswordError = form.formState.errors.password?.message || null;

    setEmailError(zodEmailError);
    setPasswordError(zodPasswordError);
  }, [form.formState.errors.email, form.formState.errors.password]);

  return (
    <AuthLayout
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      type="Sign in"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[0.938rem] leading-tight">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="aloha@example.com"
                    autoComplete="off"
                    className="text-[0.938rem] leading-tight"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
                {!form.formState.errors.email && emailError && (
                  <p className="text-sm font-medium text-destructive">
                    {emailError}
                  </p>
                )}
                {!form.formState.errors.email &&
                  !emailError &&
                  generalError && (
                    <p className="text-sm font-medium text-destructive">
                      {generalError}
                    </p>
                  )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[0.938rem] leading-tight">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="******"
                    autoComplete="off"
                    className="text-[0.938rem] leading-tight"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
                {!form.formState.errors.password && passwordError && (
                  <p className="text-sm font-medium text-destructive">
                    {passwordError}
                  </p>
                )}
                {!form.formState.errors.password &&
                  !passwordError &&
                  generalError && (
                    <p className="text-sm font-medium text-destructive">
                      {generalError}
                    </p>
                  )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full text-[0.938rem] leading-tight"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Log in"}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default LoginForm;
