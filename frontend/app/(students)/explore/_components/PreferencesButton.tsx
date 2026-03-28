"use client";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface PreferencesButtonProps {
  isMobile?: boolean;
}

export function PreferencesButton({ isMobile = false }: PreferencesButtonProps) {
  return (
    <div
      className={`pointer-events-none absolute bottom-8 flex justify-center ${
        isMobile ? "right-4" : "left-1/2 -translate-x-1/2"
      } z-40`}
    >
      <Button className="pointer-events-auto shadow-lg h-12 w-12" size="icon">
        <Filter className="h-6 w-6" />
      </Button>
    </div>
  );
}
