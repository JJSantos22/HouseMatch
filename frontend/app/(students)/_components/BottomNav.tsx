"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface BottomNavDestination {
  displayName: string;
  onClick: () => void;
  active: boolean;
  icon: LucideIcon;
  isCenter?: boolean;
}

interface BottomNavProps {
  destinations: BottomNavDestination[];
}

export function BottomNav({ destinations }: BottomNavProps) {
  const centerIndex = Math.floor(destinations.length / 2);

  return (
    <nav className="z-50 bg-card rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex h-20 max-w-3xl items-center justify-around px-4">
        {destinations.map((destination, index) => {
          const Icon = destination.icon;
          const isCenter = index === centerIndex;

          if (isCenter) {
            return (
              <button
                key={destination.displayName}
                onClick={destination.onClick}
                className="-mt-8 flex flex-col items-center"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-primary shadow-lg">
                  <Icon className="size-6 text-primary-foreground" />
                </div>
                <span className="mt-1 text-xs text-muted-foreground">{destination.displayName}</span>
              </button>
            );
          }

          return (
            <button
              key={destination.displayName}
              onClick={destination.onClick}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2"
            >
              <Icon className={cn("size-6", destination.active ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("text-xs", destination.active ? "text-primary" : "text-muted-foreground")}>
                {destination.displayName}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
