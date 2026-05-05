"use server";

import { FormState } from "@/components/auth-form";
import { createUser } from "@/lib/user";
import { hashUserPassword } from "@/lib/hash";
import { redirect } from "next/navigation";
import { createAuthSession } from "@/lib/auth";

export async function signIn(
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
