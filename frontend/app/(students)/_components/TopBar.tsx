"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  showBackButton?: boolean;
  backHref?: string;
}

export function TopBar({ showBackButton = false, backHref = "/explore" }: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(backHref);
  };

  return (
    <header className="bg-primary z-50 w-full">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-center px-6 text-background">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-6 text-background hover:bg-primary-foreground/10 hover:text-background"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Link href="/explore" className="text-xl font-bold">
          HouseMatch
        </Link>
      </div>
    </header>
  );
}
