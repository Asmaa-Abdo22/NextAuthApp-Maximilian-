"use server";

import { FormState } from "@/components/auth-form";
import { createUser, getUserByEmail } from "@/lib/user";
import { hashUserPassword } from "@/lib/hash";

import { createAuthSession, deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function signUp(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors: FormState["errors"] = {};

  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "Enter a valid email address";
  }

  if (typeof password !== "string" || password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (errors.email || errors.password) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const id = await createUser(email as string, hashedPassword);
    await createAuthSession(id);
    redirect("/training");
  } catch (e: any) {
    if (e.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "Email already exists",
        },
      };
    }
    throw e;
  }
}

export async function logIn(prevState: FormState, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const existingUser = await getUserByEmail(email as string);
  if (!existingUser) {
    return {
      errors: {
        email: "No user found with this email",
      },
    };
  }
  const isvalidPassword =
    hashUserPassword(password as string) === existingUser.password;
  if (!isvalidPassword) {
    return {
      errors: {
        password: "Incorrect password",
      },
    };
  }
  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(
  mode: string,
  prevState: FormState,
  formData: FormData,
) {
  if (mode === "signup") {
    return await signUp(prevState, formData);
  } else {
    return await logIn(prevState, formData);
  }
}

export async function logOut() {
  await deleteSession();
  redirect("/");
}
