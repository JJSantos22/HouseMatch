"use client";

import { FieldDescription } from "@/components/ui/field";
import { useAuthStore } from "@/lib/auth/store";
import { RoomsMap, type Room } from "./_components/RoomsMap";

// Static data for demonstration
const DEMO_ROOMS: Room[] = [
  {
    id: "1",
    price: 450,
    score: 8.5,
    latitude: 38.7223,
    longitude: -9.1393,
  },
  {
    id: "2",
    price: 380,
    score: 7.2,
    latitude: 38.7369,
    longitude: -9.1428,
  },
  {
    id: "3",
    price: 520,
    score: 9.1,
    latitude: 38.7169,
    longitude: -9.1333,
  },
  {
    id: "4",
    price: 410,
    score: 8.0,
    latitude: 38.7282,
    longitude: -9.1501,
  },
  {
    id: "5",
    price: 395,
    score: 7.8,
    latitude: 38.7156,
    longitude: -9.1478,
  },
];

export default function ExplorePage() {
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const handleSelectRoom = (id: string) => {
    console.log("Room selected:", id);
    // Functionality to be added later
  };

  if (!isHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <FieldDescription>Loading your session...</FieldDescription>
      </div>
    );
  }

  return (
    <main className="w-full flex-1 flex">
      <RoomsMap rooms={DEMO_ROOMS} onSelectRoom={handleSelectRoom} />
    </main>
  );
}
