"use client";

import { SearchPreferencesPopover } from "@/components/SearchPreferencesPopover";

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
      <div className="pointer-events-auto">
        <SearchPreferencesPopover />
      </div>
    </div>
  );
}
