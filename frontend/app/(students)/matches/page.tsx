"use client";

import { SearchPreferencesPopover } from "@/components/SearchPreferencesPopover";

export default function MatchesPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col p-6">
      <h1 className="text-2xl font-bold">Matches</h1>
      <p className="text-muted-foreground mt-2">Your house matches will appear here.</p>
      <div className="fixed bottom-24 right-4 z-40">
        <SearchPreferencesPopover />
      </div>
    </main>
  );
}
