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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { useAuthStore } from "@/lib/auth/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

const UNIVERSITIES = [
  {
    name: "Instituto Superior Técnico",
    city: "Lisboa",
    domain: "tecnico.ulisboa.pt",
  },
  { name: "Politécnico de Lisboa", city: "Lisboa", domain: "ipl.pt" },
  {
    name: "ISCTE - Instituto Universitário de Lisboa",
    city: "Lisboa",
    domain: "iscte-iul.pt",
  },
  {
    name: "Faculdade de Engenharia da Universidade do Porto",
    city: "Porto",
    domain: "fe.up.pt",
  },
];

export default function SignupPage() {
  const router = useRouter();
  const [university, setUniversity] = useState("");
  const [emailLocalPart, setEmailLocalPart] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const universitiesByCity = useMemo(
    () =>
      UNIVERSITIES.reduce(
        (acc, u) => {
          if (!acc[u.city]) acc[u.city] = [];
          acc[u.city].push(u);
          return acc;
        },
        {} as Record<string, (typeof UNIVERSITIES)[number][]>,
      ),
    [],
  );

  const universityItems = useMemo(
    () =>
      Object.entries(universitiesByCity).map(([city, universities]) => ({
        city,
        universities: universities.map((u) => u.name),
      })),
    [universitiesByCity],
  );

  const selectedUniversity = useMemo(
    () => UNIVERSITIES.find((u) => u.name === university),
    [university],
  );

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

    if (!selectedUniversity) {
      setFormError("Please select your university.");
      return;
    }

    const localPart = emailLocalPart.trim();

    if (!localPart) {
      setFormError("Please enter your university email username.");
      return;
    }

    if (localPart.includes("@")) {
      setFormError("Only the part before @ is needed.");
      return;
    }

    if (password !== repeatPassword) {
      setFormError("Passwords must match.");
      return;
    }

    try {
      const email = `${localPart}@${selectedUniversity.domain}`.toLowerCase();
      await register({
        email,
        password,
        university: selectedUniversity.name,
      });
      router.push("/onboarding");
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
                <FieldLabel htmlFor="university">University</FieldLabel>
                <Select value={university} onValueChange={setUniversity}>
                  <SelectTrigger
                    id="university"
                    className="w-full"
                    aria-required="true"
                  >
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    {universityItems.map((universitiesByCity) => (
                      <SelectGroup key={universitiesByCity.city}>
                        <SelectLabel>{universitiesByCity.city}</SelectLabel>
                        {universitiesByCity.universities.map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    type="text"
                    placeholder="username"
                    value={emailLocalPart}
                    onChange={(event) => setEmailLocalPart(event.target.value)}
                    required
                    disabled={!selectedUniversity}
                    autoComplete="username"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>
                      @{selectedUniversity?.domain ?? "select university"}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
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
                  <FieldLabel htmlFor="repeatPassword">
                    Repeat Password
                  </FieldLabel>
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
