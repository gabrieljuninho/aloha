"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail, getUserByUsername } from "@/common/data/user";
import { db } from "@/common/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        username: null,
        email: null,
        general: "Invalid fields",
      },
    };
  }

  const { username, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUserByUsername = await getUserByUsername(username);
  const existingUserByEmail = await getUserByEmail(email);

  if (existingUserByUsername || existingUserByEmail) {
    return {
      error: {
        username: existingUserByUsername ? "Username already taken" : null,
        email: existingUserByEmail ? "Email address already registered" : null,
        general: null,
      },
    };
  }

  await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: "Account created successfully",
  };
};
