"use client";

import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { FieldDescription } from "@/components/ui/field";
import { useAuthStore } from "@/lib/auth/store";
import { RoomsMap, type MapPadding } from "./_components/RoomsMap";
import { HouseDetailsCard } from "@/app/(students)/explore/_components/HouseDetailsCard";
import { SmartSuggestionsButton } from "@/app/(students)/explore/_components/SmartSuggestionsButton";
import type { House } from "@/types/house";
import {
  getAllHouses,
  getHouseDetails,
  getSmartSuggestions,
  type SimpleHouse,
} from "@/lib/api/houses";

export default function ExplorePage() {
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [houses, setHouses] = useState<SimpleHouse[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [isLoadingHouses, setIsLoadingHouses] = useState(true);
  const [isSmartSuggestionMode, setIsSmartSuggestionMode] = useState(false);
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([]);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [isLoadingSmartSuggestions, setIsLoadingSmartSuggestions] =
    useState(false);

  // Fetch all houses on mount
  useEffect(() => {
    async function fetchHouses() {
      try {
        setIsLoadingHouses(true);
        const data = await getAllHouses();
        setHouses(data);
      } catch (error) {
        console.error("Failed to fetch houses:", error);
      } finally {
        setIsLoadingHouses(false);
      }
    }

    fetchHouses();
  }, []);

  // Fetch house details when selection changes
  useEffect(() => {
    async function fetchHouseDetails() {
      if (!selectedHouseId) {
        setSelectedHouse(null);
        return;
      }

      try {
        const data = await getHouseDetails(selectedHouseId);
        setSelectedHouse(data);
      } catch (error) {
        console.error("Failed to fetch house details:", error);
      }
    }

    fetchHouseDetails();
  }, [selectedHouseId]);

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

  const handleDiscard = (id: string) => {
    console.log("House discarded:", id);
    if (isSmartSuggestionMode) {
      handleNextSuggestion();
    } else {
      setSelectedHouseId(null);
    }
  };

  const handleSkip = (id: string) => {
    console.log("House skipped:", id);
    if (isSmartSuggestionMode) {
      handleNextSuggestion();
    } else {
      setSelectedHouseId(null);
    }
  };

  const handleMatch = (id: string) => {
    console.log("House matched:", id);
    if (isSmartSuggestionMode) {
      handleNextSuggestion();
    } else {
      setSelectedHouseId(null);
    }
  };

  const handleNextSuggestion = () => {
    const nextIndex = currentSuggestionIndex + 1;
    if (nextIndex < smartSuggestions.length) {
      setCurrentSuggestionIndex(nextIndex);
      setSelectedHouseId(smartSuggestions[nextIndex]);
    } else {
      // All suggestions seen
      setIsSmartSuggestionMode(false);
      setSelectedHouseId(null);
      setSmartSuggestions([]);
      setCurrentSuggestionIndex(0);
      toast.success("Smart suggestions complete", {
        description:
          "You've reviewed all suggested houses. Check back later for more suggestions!",
      });
    }
  };

  const handleStartSmartSuggestions = async () => {
    try {
      setIsLoadingSmartSuggestions(true);
      const suggestions = await getSmartSuggestions();
      if (suggestions.length > 0) {
        setSmartSuggestions(suggestions);
        setCurrentSuggestionIndex(0);
        setSelectedHouseId(suggestions[0]);
        setIsSmartSuggestionMode(true);
      }
    } catch (error) {
      console.error("Failed to fetch smart suggestions:", error);
      toast.error("Failed to load smart suggestions", {
        description: "Please try again.",
      });
    } finally {
      setIsLoadingSmartSuggestions(false);
    }
  };

  const handleExitSmartSuggestions = () => {
    setIsSmartSuggestionMode(false);
    setSelectedHouseId(null);
    setSmartSuggestions([]);
    setCurrentSuggestionIndex(0);
  };

  if (!isHydrated || isLoadingHouses) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <FieldDescription>
          {!isHydrated ? "Loading your session..." : "Loading houses..."}
        </FieldDescription>
      </div>
    );
  }

  return (
    <main className="w-full h-full flex-1">
      <RoomsMap
        houses={houses}
        selectedHouseId={selectedHouseId}
        onSelectHouse={setSelectedHouseId}
        padding={mapPadding}
        hideControls={!!selectedHouseId}
      />

      {/* Smart Suggestions Button */}
      {!selectedHouseId && (
        <SmartSuggestionsButton
          onClick={handleStartSmartSuggestions}
          isLoading={isLoadingSmartSuggestions}
          isMobile={isMobile}
        />
      )}

      {/* House Details Card Overlay */}
      {selectedHouse && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center md:items-start md:justify-start">
          <div className="pointer-events-auto w-full max-w-md p-4 md:p-6">
            <HouseDetailsCard
              house={selectedHouse}
              onDiscard={() => handleDiscard(selectedHouse.id)}
              onSkip={() => handleSkip(selectedHouse.id)}
              onMatch={() => handleMatch(selectedHouse.id)}
              onExitSmartSuggestion={
                isSmartSuggestionMode ? handleExitSmartSuggestions : undefined
              }
            />
          </div>
        </div>
      )}
    </main>
  );
}
