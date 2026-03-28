"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed } from "lucide-react";
import type { BedroomMapResponse } from "@/lib/api/property";

interface BedroomListProps {
  bedrooms: BedroomMapResponse[];
  selectedBedroomId: string | null;
  onSelectBedroom: (id: string) => void;
  isMobile: boolean;
}

export function BedroomList({
  bedrooms,
  selectedBedroomId,
  onSelectBedroom,
  isMobile,
}: BedroomListProps) {
  if (isMobile) {
    return (
      <Card className="flex gap-1 p-2 overflow-x-auto">
        {bedrooms.map((bedroom) => (
          <Button
            key={bedroom.id}
            variant={selectedBedroomId === bedroom.id ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectBedroom(bedroom.id)}
            className="shrink-0"
          >
            <Bed className="h-3 w-3 mr-1" />
            {bedroom.title} - {bedroom.price}€
          </Button>
        ))}
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-1 p-2 h-fit self-start">
      {bedrooms.map((bedroom) => (
        <Button
          key={bedroom.id}
          variant={selectedBedroomId === bedroom.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onSelectBedroom(bedroom.id)}
          className="justify-start"
        >
          <Bed className="h-4 w-4 mr-2" />
          {bedroom.title} - {bedroom.price}€
        </Button>
      ))}
    </Card>
  );
}
