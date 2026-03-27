"use client";

import { FieldDescription } from "@/components/ui/field";
import { useAuthStore } from "@/lib/auth/store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { TopBar } from "./_components/TopBar";
import { BottomNav } from "./_components/BottomNav";
import { Compass, Heart, Users, MessageCircle, UserCircle } from "lucide-react";

export default function StudentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
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

  const bottomNavDestinations = [
    {
      displayName: "Explore",
      onClick: () => router.push("/explore"),
      active: pathname === "/explore",
      icon: Compass,
    },
    {
      displayName: "Favorites",
      onClick: () => router.push("/favorites"),
      active: pathname === "/favorites",
      icon: Heart,
    },
    {
      displayName: "Matches",
      onClick: () => router.push("/matches"),
      active: pathname === "/matches",
      icon: Users,
    },
    {
      displayName: "Messages",
      onClick: () => router.push("/messages"),
      active: pathname === "/messages",
      icon: MessageCircle,
    },
    {
      displayName: "Profile",
      onClick: () => router.push("/profile"),
      active: pathname === "/profile",
      icon: UserCircle,
    },
  ];

  const showBottomNav = bottomNavDestinations.some((dest) => dest.active);

  return (
    <div className="h-screen overflow-hidden bg-accent-foreground flex flex-col">
      <TopBar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>

      {showBottomNav && <BottomNav destinations={bottomNavDestinations} />}

      {/* Global Toast Notifications */}
      <Toaster
        offset={showBottomNav ? { bottom: "calc(4rem + 32px)" } : undefined}
      />
    </div>
  );
}
