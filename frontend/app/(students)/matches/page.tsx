"use client";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function MatchesPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col p-6">
      <h1 className="text-2xl font-bold">Matches</h1>
      <p className="text-muted-foreground mt-2">Your house matches will appear here.</p>
      <div className="fixed bottom-24 right-4 z-40">
        <Button className="shadow-lg h-12 w-12" size="icon">
          <Filter className="h-6 w-6" />
        </Button>
      </div>
    </main>
  );
}
