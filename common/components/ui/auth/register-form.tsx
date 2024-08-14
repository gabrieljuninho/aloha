"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

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

import { register } from "@/actions/register";

import Spinner from "@/common/components/elements/spinner";
import AuthLayout from "@/common/components/ui/auth/auth-layout";

import { RegisterSchema } from "@/schemas";

const RegisterForm = () => {
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        if (data.error) {
          setUsernameError(data.error.username || null);
          setEmailError(data.error.email || null);
        } else if (data.success) {
          setUsernameError(null);
          setEmailError(null);

          router.push("/auth/login");
        }
      });
    });
  };

  useEffect(() => {
    const zodUsernameError = form.formState.errors.username?.message || null;
    const zodEmailError = form.formState.errors.email?.message || null;

    setUsernameError(zodUsernameError);
    setEmailError(zodEmailError);
  }, [form.formState.errors.username, form.formState.errors.email]);

  return (
    <AuthLayout
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      type="Sign up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[0.938rem] leading-tight">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="aloha"
                    autoComplete="off"
                    className="text-[0.938rem] leading-tight"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
                {!form.formState.errors.username && usernameError && (
                  <p className="text-sm font-medium text-destructive">
                    {usernameError}
                  </p>
                )}
              </FormItem>
            )}
          />
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
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full text-[0.938rem] leading-tight"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Create an account"}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default RegisterForm;
