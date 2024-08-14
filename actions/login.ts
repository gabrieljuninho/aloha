/* eslint-disable indent */

"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import * as z from "zod";

import { signIn } from "@/auth";

import { getUserByEmail } from "@/common/data/user";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { LoginSchema } from "@/schemas";

export const login = async (
  value: z.infer<typeof LoginSchema>,
  callBackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(value);

  if (!validatedFields.success) {
    return {
      error: {
        email: null,
        password: null,
        general: "Invalid fields",
      },
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return {
      error: {
        email: null,
        password: null,
        general: "incorrect email address or password",
      },
    };
  }

  if (existingUser.password) {
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return {
        error: {
          email: null,
          password: "Invalid password" || null,
          general: null,
        },
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callBackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: {
              email: null,
              password: null,
              general: "Invalid credentials",
            },
          };
        default:
          return {
            error: {
              email: null,
              password: null,
              general: "Something went wrong",
            },
          };
      }
    }

    throw error;
  }
};
