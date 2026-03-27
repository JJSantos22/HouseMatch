"use client";

import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { FieldDescription } from "@/components/ui/field";
import { useAuthStore } from "@/lib/auth/store";
import { RoomsMap, type MapPadding } from "./_components/RoomsMap";
import { BedroomDetailsCard } from "@/app/(students)/explore/_components/BedroomDetailsCard";
import { BedroomList } from "@/app/(students)/explore/_components/BedroomList";
import { SmartSuggestionsButton } from "@/app/(students)/explore/_components/SmartSuggestionsButton";
import {
  getPropertiesForMap,
  getBedroomDetail,
  type PropertyMapResponse,
  type BedroomDetailResponse,
  type BedroomMapResponse,
} from "@/lib/api/property";

export default function ExplorePage() {
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedBedroomId, setSelectedBedroomId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [properties, setProperties] = useState<PropertyMapResponse[]>([]);
  const [selectedBedroom, setSelectedBedroom] = useState<BedroomDetailResponse | null>(null);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);
  const [isSmartSuggestionMode, setIsSmartSuggestionMode] = useState(false);
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([]);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [isLoadingSmartSuggestions, setIsLoadingSmartSuggestions] = useState(false);

  const selectedProperty = useMemo(() => 
    properties.find((p) => p.id === selectedPropertyId) ?? null,
    [properties, selectedPropertyId]
  );

  // Fetch all properties on mount
  useEffect(() => {
    async function fetchProperties() {
      try {
        setIsLoadingProperties(true);
        const data = await getPropertiesForMap();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setIsLoadingProperties(false);
      }
    }

    fetchProperties();
  }, []);

  // Select first bedroom when property changes
  useEffect(() => {
    if (selectedProperty && selectedProperty.bedrooms.length > 0) {
      setSelectedBedroomId(selectedProperty.bedrooms[0].id);
    } else {
      setSelectedBedroomId(null);
      setSelectedBedroom(null);
    }
  }, [selectedProperty]);

  // Fetch bedroom details when bedroom selection changes
  useEffect(() => {
    async function fetchBedroomDetails() {
      if (!selectedPropertyId || !selectedBedroomId) {
        setSelectedBedroom(null);
        return;
      }

      try {
        const data = await getBedroomDetail(selectedPropertyId, selectedBedroomId);
        setSelectedBedroom(data);
      } catch (error) {
        console.error("Failed to fetch bedroom details:", error);
      }
    }

    fetchBedroomDetails();
  }, [selectedPropertyId, selectedBedroomId]);

  // Track viewport size for responsive padding
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate map padding based on card position and size
  const mapPadding = useMemo<MapPadding>(() => {
    if (!selectedPropertyId) {
      return { top: 0, bottom: 0, left: 0, right: 0 };
    }

    if (isMobile) {
      const cardHeight = window.innerHeight * 0.66 + 32 + 50;
      return {
        top: 0,
        bottom: cardHeight,
        left: 0,
        right: 0,
      };
    } else {
      const cardWidth = 448 + 48 + 50 + 80;
      return {
        top: 0,
        bottom: 0,
        left: cardWidth,
        right: 0,
      };
    }
  }, [selectedPropertyId, isMobile]);

  const handleSelectBedroom = (bedroomId: string) => {
    setSelectedBedroomId(bedroomId);
  };

  const handleDiscard = () => {
    if (isSmartSuggestionMode) {
      handleNextSuggestion();
    } else {
      setSelectedPropertyId(null);
    }
  };

  const handleSkip = () => {
    if (isSmartSuggestionMode) {
      handleNextSuggestion();
    } else {
      setSelectedPropertyId(null);
    }
  };

  const handleMatch = () => {
    if (isSmartSuggestionMode) {
      handleNextSuggestion();
    } else {
      setSelectedPropertyId(null);
    }
  };

  const handleNextSuggestion = () => {
    const nextIndex = currentSuggestionIndex + 1;
    if (nextIndex < smartSuggestions.length) {
      setCurrentSuggestionIndex(nextIndex);
      setSelectedPropertyId(smartSuggestions[nextIndex]);
    } else {
      setIsSmartSuggestionMode(false);
      setSelectedPropertyId(null);
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
      toast.info("Smart suggestions coming soon");
    } catch (error) {
      console.error("Failed to fetch smart suggestions:", error);
      toast.error("Failed to load smart suggestions");
    } finally {
      setIsLoadingSmartSuggestions(false);
    }
  };

  const handleExitSmartSuggestions = () => {
    setIsSmartSuggestionMode(false);
    setSelectedPropertyId(null);
    setSmartSuggestions([]);
    setCurrentSuggestionIndex(0);
  };

  if (!isHydrated || isLoadingProperties) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <FieldDescription>
          {!isHydrated ? "Loading your session..." : "Loading properties..."}
        </FieldDescription>
      </div>
    );
  }

  return (
    <main className="w-full h-full flex-1">
      <RoomsMap
        properties={properties}
        selectedPropertyId={selectedPropertyId}
        onSelectProperty={setSelectedPropertyId}
        padding={mapPadding}
        hideControls={!!selectedPropertyId}
      />

      {!selectedPropertyId && (
        <SmartSuggestionsButton
          onClick={handleStartSmartSuggestions}
          isLoading={isLoadingSmartSuggestions}
          isMobile={isMobile}
        />
      )}

      {selectedBedroom && selectedProperty && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center md:items-start md:justify-start">
          <div className="pointer-events-auto flex flex-col md:flex-row gap-2 p-4 md:p-6 w-full max-w-md md:max-w-none md:w-auto">
            {selectedProperty.bedrooms.length > 1 && isMobile && (
              <BedroomList
                bedrooms={selectedProperty.bedrooms}
                selectedBedroomId={selectedBedroomId}
                onSelectBedroom={handleSelectBedroom}
                isMobile={isMobile}
              />
            )}
            <BedroomDetailsCard
              bedroom={selectedBedroom.bedroom}
              property={selectedBedroom.property}
              onDiscard={handleDiscard}
              onSkip={handleSkip}
              onMatch={handleMatch}
              onExitSmartSuggestion={
                isSmartSuggestionMode ? handleExitSmartSuggestions : undefined
              }
            />
            {selectedProperty.bedrooms.length > 1 && !isMobile && (
              <BedroomList
                bedrooms={selectedProperty.bedrooms}
                selectedBedroomId={selectedBedroomId}
                onSelectBedroom={handleSelectBedroom}
                isMobile={isMobile}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
