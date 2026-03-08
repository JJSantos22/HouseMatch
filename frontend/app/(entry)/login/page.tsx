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
import Link from "next/link";

export default function LoginPage() {
  const universities = [
    { name: "Universidade de Lisboa", city: "Lisboa" },
    { name: "Politécnico de Lisboa", city: "Lisboa" },
    { name: "Universidade Nova de Lisboa", city: "Lisboa" },
    { name: "Universidade do Porto", city: "Porto" },
  ];

  const universitiesByCity = universities.reduce(
    (acc, u) => {
      if (!acc[u.city]) acc[u.city] = [];
      acc[u.city].push(u);
      return acc;
    },
    {} as Record<string, typeof universities>,
  );

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>Login through your university</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="university">University</FieldLabel>
                <Select>
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
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
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
