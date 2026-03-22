"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { useAuthStore } from "@/lib/auth/store";

export default function ExplorePage() {
  const session = useAuthStore((state) => state.session);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const logout = useAuthStore((state) => state.logout);

  if (!isHydrated) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center p-6">
        <FieldDescription>Loading your session...</FieldDescription>
      </div>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Explore</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This is a filler explore page. You can now connect real listings and
            recommendations here.
          </p>

          <div className="space-y-3">
            <FieldDescription>
              Logged in as <strong>{session?.email}</strong>
            </FieldDescription>
            <FieldDescription>User ID: {session?.userId}</FieldDescription>
            <Button type="button" onClick={logout}>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
