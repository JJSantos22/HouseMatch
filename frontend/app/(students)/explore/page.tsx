"use client";

import { useState, useMemo, useEffect } from "react";
import { FieldDescription } from "@/components/ui/field";
import { useAuthStore } from "@/lib/auth/store";
import {
  RoomsMap,
  type SimpleHouse,
  type MapPadding,
} from "./_components/RoomsMap";
import { HouseDetailsCard } from "@/app/(students)/explore/_components/HouseDetailsCard";
import type { House } from "@/types/house";

// Static data for demonstration
const DEMO_HOUSES: House[] = [
  {
    id: "1",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
    ],
    location: "Baixa, Lisbon",
    price: 450,
    latitude: 38.7223,
    longitude: -9.1393,
    beds: 2,
    hasPrivateBathroom: true,
    size: 45,
    matchScores: [
      { preference: "Location", score: 92 },
      { preference: "Price", score: 85 },
      { preference: "Amenities", score: 78 },
      { preference: "Transport", score: 95 },
    ],
    reviews: [
      {
        id: "r1",
        author: "João Silva",
        rating: 4.5,
        date: "2024-02-15",
        comment:
          "Great location, close to everything. Landlord is very responsive.",
      },
      {
        id: "r2",
        author: "Maria Santos",
        rating: 5.0,
        date: "2024-01-20",
        comment:
          "Perfect for students! Clean, affordable, and in a safe neighborhood.",
      },
    ],
  },
  {
    id: "2",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
    location: "Alfama, Lisbon",
    price: 380,
    latitude: 38.7369,
    longitude: -9.1428,
    beds: 1,
    hasPrivateBathroom: false,
    size: 30,
    matchScores: [
      { preference: "Location", score: 72 },
      { preference: "Price", score: 95 },
      { preference: "Amenities", score: 65 },
      { preference: "Transport", score: 70 },
    ],
    reviews: [
      {
        id: "r3",
        author: "Pedro Costa",
        rating: 4.0,
        date: "2024-03-01",
        comment:
          "Good value for money, but shared bathroom can be inconvenient.",
      },
    ],
  },
  {
    id: "3",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop",
    ],
    location: "Belém, Lisbon",
    price: 520,
    latitude: 38.7169,
    longitude: -9.1333,
    beds: 3,
    hasPrivateBathroom: true,
    size: 65,
    matchScores: [
      { preference: "Location", score: 88 },
      { preference: "Price", score: 70 },
      { preference: "Amenities", score: 98 },
      { preference: "Transport", score: 85 },
    ],
    reviews: [
      {
        id: "r4",
        author: "Ana Rodrigues",
        rating: 5.0,
        date: "2024-02-28",
        comment: "Spacious and modern. Perfect for sharing with roommates!",
      },
      {
        id: "r5",
        author: "Carlos Mendes",
        rating: 4.5,
        date: "2024-01-15",
        comment: "Beautiful area, very peaceful. Highly recommended.",
      },
      {
        id: "r6",
        author: "Sofia Alves",
        rating: 5.0,
        date: "2024-03-10",
        comment: "Amazing place! Clean, spacious, and great landlord.",
      },
    ],
  },
  {
    id: "4",
    images: [
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=600&fit=crop",
    ],
    location: "Chiado, Lisbon",
    price: 410,
    latitude: 38.7282,
    longitude: -9.1501,
    beds: 2,
    hasPrivateBathroom: true,
    size: 40,
    matchScores: [
      { preference: "Location", score: 90 },
      { preference: "Price", score: 80 },
      { preference: "Amenities", score: 75 },
      { preference: "Transport", score: 92 },
    ],
    reviews: [
      {
        id: "r7",
        author: "Miguel Ferreira",
        rating: 4.0,
        date: "2024-02-10",
        comment: "Central location, but can be noisy at night.",
      },
    ],
  },
  {
    id: "5",
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop",
    ],
    location: "Parque das Nações, Lisbon",
    price: 395,
    latitude: 38.7156,
    longitude: -9.1478,
    beds: 1,
    hasPrivateBathroom: true,
    size: 35,
    matchScores: [
      { preference: "Location", score: 75 },
      { preference: "Price", score: 88 },
      { preference: "Amenities", score: 82 },
      { preference: "Transport", score: 90 },
    ],
    reviews: [
      {
        id: "r8",
        author: "Rita Oliveira",
        rating: 4.5,
        date: "2024-03-05",
        comment: "Modern building with great facilities. Love it!",
      },
      {
        id: "r9",
        author: "Tiago Sousa",
        rating: 4.0,
        date: "2024-02-20",
        comment: "Good transport connections and nice neighborhood.",
      },
    ],
  },
];

// Helper function to calculate average match score
function getAverageScore(house: House): number {
  if (house.matchScores.length === 0) return 0;
  const sum = house.matchScores.reduce((acc, score) => acc + score.score, 0);
  return Math.round(sum / house.matchScores.length);
}

export default function ExplorePage() {
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport size for responsive padding
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate map padding based on card position and size
  const mapPadding = useMemo<MapPadding>(() => {
    if (!selectedHouseId) {
      return { top: 0, bottom: 0, left: 0, right: 0 };
    }

    if (isMobile) {
      // Mobile: card at bottom, max-h-[66vh] + padding (16px * 2) + buffer
      const cardHeight = window.innerHeight * 0.66 + 32 + 50;
      return {
        top: 0,
        bottom: cardHeight,
        left: 0,
        right: 0,
      };
    } else {
      // Desktop: card at top-left, max-w-md (448px) + padding (24px * 2) + buffer
      const cardWidth = 448 + 48 + 50;
      return {
        top: 0,
        bottom: 0,
        left: cardWidth,
        right: 0,
      };
    }
  }, [selectedHouseId, isMobile]);

  // Convert full houses to simplified version for the map
  const simpleHouses = useMemo<SimpleHouse[]>(
    () =>
      DEMO_HOUSES.map((house) => ({
        id: house.id,
        price: house.price,
        score: getAverageScore(house),
        latitude: house.latitude,
        longitude: house.longitude,
      })),
    [],
  );

  // Find the selected house with full data
  const selectedHouse = DEMO_HOUSES.find((h) => h.id === selectedHouseId);

  const handleDiscard = (id: string) => {
    console.log("House discarded:", id);
    setSelectedHouseId(null);
  };

  const handleSkip = (id: string) => {
    console.log("House skipped:", id);
    setSelectedHouseId(null);
  };

  const handleMatch = (id: string) => {
    console.log("House matched:", id);
    setSelectedHouseId(null);
  };

  if (!isHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <FieldDescription>Loading your session...</FieldDescription>
      </div>
    );
  }

  return (
    <main className="w-full h-full flex-1">
      <RoomsMap
        houses={simpleHouses}
        selectedHouseId={selectedHouseId}
        onSelectHouse={setSelectedHouseId}
        padding={mapPadding}
      />

      {/* House Details Card Overlay */}
      {selectedHouse && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center md:items-start md:justify-start">
          <div className="pointer-events-auto w-full max-w-md p-4 md:p-6">
            <HouseDetailsCard
              house={selectedHouse}
              onDiscard={() => handleDiscard(selectedHouse.id)}
              onSkip={() => handleSkip(selectedHouse.id)}
              onMatch={() => handleMatch(selectedHouse.id)}
            />
          </div>
        </div>
      )}
    </main>
  );
}
