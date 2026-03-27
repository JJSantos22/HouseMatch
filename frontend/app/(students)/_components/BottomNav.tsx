"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface BottomNavDestination {
  displayName: string;
  onClick: () => void;
  active: boolean;
  icon: LucideIcon;
}

interface BottomNavProps {
  destinations: BottomNavDestination[];
}

export function BottomNav({ destinations }: BottomNavProps) {
  return (
    <nav className="bg-primary z-50">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-around">
        {destinations.map((destination) => {
          const Icon = destination.icon;
          return (
            <button
              key={destination.displayName}
              onClick={destination.onClick}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors",
                destination.active
                  ? "text-background"
                  : "text-background/60 hover:text-background/80",
              )}
            >
              <Icon className="size-5" />
              <span className="text-xs">{destination.displayName}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
