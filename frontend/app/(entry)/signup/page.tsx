"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/auth/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const register = useAuthStore((state) => state.register);
  const clearError = useAuthStore((state) => state.clearError);
  const error = useAuthStore((state) => state.error);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    if (isHydrated && session) {
      router.replace("/explore");
    }
  }, [isHydrated, router, session]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    if (password !== repeatPassword) {
      setFormError("Passwords must match.");
      return;
    }

    try {
      await register({ email, password });
      router.push("/explore");
    } catch {
      // Error state is handled by the auth store.
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="repeatPassword">Repeat Password</FieldLabel>
                </div>
                <Input
                  id="repeatPassword"
                  type="password"
                  value={repeatPassword}
                  onChange={(event) => setRepeatPassword(event.target.value)}
                  required
                />
              </Field>
              {formError ? (
                <FieldDescription className="text-center text-red-600">
                  {formError}
                </FieldDescription>
              ) : null}
              {error ? (
                <FieldDescription className="text-center text-red-600">
                  {error}
                </FieldDescription>
              ) : null}
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Signup"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Log in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-primary-foreground">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </>
  );
}
