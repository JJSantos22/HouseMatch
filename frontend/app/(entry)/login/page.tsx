"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/lib/auth/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useMemo, useState } from "react";

const UNIVERSITIES = [
  { name: "Universidade de Lisboa", city: "Lisboa" },
  { name: "Politécnico de Lisboa", city: "Lisboa" },
  { name: "Universidade Nova de Lisboa", city: "Lisboa" },
  { name: "Universidade do Porto", city: "Porto" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");

  const login = useAuthStore((state) => state.login);
  const clearError = useAuthStore((state) => state.clearError);
  const error = useAuthStore((state) => state.error);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const session = useAuthStore((state) => state.session);

  const universitiesByCity = useMemo(
    () =>
      UNIVERSITIES.reduce(
        (acc, u) => {
          if (!acc[u.city]) acc[u.city] = [];
          acc[u.city].push(u);
          return acc;
        },
        {} as Record<string, typeof UNIVERSITIES>,
      ),
    [],
  );

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

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login({ email, password });
      router.push("/explore");
    } catch {
      // Error state is handled by the auth store.
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>Login through your university</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="university">University</FieldLabel>
                <Select value={university} onValueChange={setUniversity}>
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="University" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(universitiesByCity).map(
                      ([city, universities]) => (
                        <SelectGroup key={city}>
                          <SelectLabel>{city}</SelectLabel>
                          {universities.map((u) => (
                            <SelectItem key={u.name} value={u.name}>
                              {u.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </Field>
              <FieldSeparator>or login as landlord</FieldSeparator>
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
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>
              {error ? (
                <FieldDescription className="text-center text-red-600">
                  {error}
                </FieldDescription>
              ) : null}
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign up</Link>
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
