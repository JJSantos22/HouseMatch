"use client";

import { FieldDescription } from "@/components/ui/field";
import { useAuthStore } from "@/lib/auth/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StudentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!session) {
      router.replace("/login");
    }
  }, [isHydrated, router, session]);

  if (!isHydrated || !session) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center p-6">
        <FieldDescription>Checking your session...</FieldDescription>
      </div>
    );
  }

  return children;
}