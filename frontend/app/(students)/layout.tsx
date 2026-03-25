"use client";

import { FieldDescription } from "@/components/ui/field";
import { useAuthStore } from "@/lib/auth/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { Toaster } from "sonner";

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

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <header className="border-border bg-background sticky top-0 z-50 w-full border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/explore" className="text-xl font-bold">
            HouseMatch
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/profile"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
              title="View Profile"
            >
              <UserCircle className="size-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      {children}

      {/* Global Toast Notifications */}
      <Toaster />
    </div>
  );
}