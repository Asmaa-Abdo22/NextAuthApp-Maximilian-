"use client";

import Link from "next/link";
import { useActionState } from "react";
export type FormState = {
  errors?: {
    email?: string;
    password?: string;
  };
};
export default function AuthForm({
  action,
  currentMode,
}: {
  action: any;
  currentMode?: string;
}) {
  const [state, formAction] = useActionState<FormState, FormData>(action, {
    errors: {},
  });
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        {state?.errors?.email && (
          <span id="form-errors">{state.errors.email}</span>
        )}
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        {state?.errors?.password && (
          <span id="form-errors">{state.errors.password}</span>
        )}
      </p>
      <p>
        <button type="submit">
          {currentMode === "login" ? "Log In" : "Create Account"}
        </button>
      </p>
      <p>
        {currentMode === "login" && (
          <Link href="/?mode=signup">Create An Account</Link>
        )}
        {currentMode === "signup" && (
          <Link href="/?mode=login">Log In With An Existing Account</Link>
        )}
      </p>
    </form>
  );
}
