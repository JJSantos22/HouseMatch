"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { ImageGallery } from "./ImageGallery";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapPin, Euro, Heart, ArrowDown } from "lucide-react";
import type { BedroomResponse, PropertyResponse } from "@/lib/api/property";
import { addFavorite, removeFavorite } from "@/lib/api/favorites";
import { ApiError } from "@/lib/api/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BedroomAmenityBadges } from "@/components/BedroomAmenityBadges";
import { PropertyAmenityBadges } from "@/components/PropertyAmenityBadges";

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
];

const SWIPE_THRESHOLD = 80;

interface BedroomDetailsCardProps {
  bedroom: BedroomResponse;
  property: PropertyResponse;
  userId?: string;
  initialFavorited?: boolean;
  onFavoriteChange?: (bedroomId: string, isFavorited: boolean) => void;
  onMatch: () => void;
  onClose?: () => void;
  onExitSmartSuggestion?: () => void;
  onOpenDetails?: () => void;
}

export function BedroomDetailsCard({
  bedroom,
  property,
  userId,
  initialFavorited = false,
  onFavoriteChange,
  onMatch,
  onClose,
  onExitSmartSuggestion,
  onOpenDetails,
}: BedroomDetailsCardProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [popping, setPopping] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontalSwipe = useRef(false);

  // Sync when switching bedrooms
  useEffect(() => {
    setIsFavorited(initialFavorited);
    setDragX(0);
    setExitDirection(null);
  }, [initialFavorited, bedroom.id]);

  const images =
    bedroom.photos?.length > 0
      ? bedroom.photos
      : property.photos?.length > 0
        ? property.photos
        : MOCK_IMAGES;

  const formatDate = (value: string) => {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
  };

  const handleCardClick = () => {
    if (!onOpenDetails || dragX !== 0) return;
    onOpenDetails();
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onOpenDetails) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenDetails();
    }
  };

  /** Add to favorites silently (ignores 409) */
  const saveFavorite = useCallback(async () => {
    if (!userId || isFavorited) return;
    try {
      await addFavorite(userId, bedroom.id);
      setIsFavorited(true);
      onFavoriteChange?.(bedroom.id, true);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setIsFavorited(true);
        onFavoriteChange?.(bedroom.id, true);
      }
      // silently ignore other errors during swipe
    }
  }, [userId, bedroom.id, isFavorited, onFavoriteChange]);

  /** If not yet liked: add to favorites + exit right. If already liked: remove and stay. */
  const triggerLike = useCallback(async () => {
    setPopping(true);
    setTimeout(() => setPopping(false), 200);

    if (isFavorited) {
      if (!userId) return;
      try {
        await removeFavorite(userId, bedroom.id);
        setIsFavorited(false);
        onFavoriteChange?.(bedroom.id, false);
        toast.success("Removed from favorites");
      } catch {
        toast.error("Failed to remove from favorites");
      }
    } else {
      await saveFavorite();
      toast.success("Added to favorites");
      setExitDirection("right");
    }
  }, [isFavorited, userId, bedroom.id, onFavoriteChange, saveFavorite]);

  /** Animate card out to the left, then call onClose */
  const triggerClose = useCallback(() => {
    setExitDirection("left");
  }, []);

  const handleTransitionEnd = () => {
    if (exitDirection === "right") {
      onMatch();
    } else if (exitDirection === "left") {
      onClose?.();
    }
  };

  // ── Touch swipe handlers ──────────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);

    if (!isHorizontalSwipe.current && deltaY > Math.abs(deltaX)) return; // vertical scroll
    isHorizontalSwipe.current = true;
    e.preventDefault(); // prevent page scroll while swiping
    setDragX(deltaX);
  };

  const handleTouchEnd = () => {
    if (isHorizontalSwipe.current) {
      if (dragX > SWIPE_THRESHOLD) {
        triggerLike();
      } else if (dragX < -SWIPE_THRESHOLD) {
        triggerClose();
      } else {
        setDragX(0);
      }
    } else {
      setDragX(0);
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isHorizontalSwipe.current = false;
  };

  // ── Computed styles ───────────────────────────────────────────────────────
  const rotation = dragX * 0.06;
  const likeOpacity = Math.min(dragX / SWIPE_THRESHOLD, 1);
  const nopeOpacity = Math.min(-dragX / SWIPE_THRESHOLD, 1);

  const cardStyle: React.CSSProperties =
    exitDirection === "right"
      ? { transform: "translateX(150%) rotate(20deg)", transition: "transform 0.35s ease-in", opacity: 0 }
      : exitDirection === "left"
        ? { transform: "translateX(-150%) rotate(-20deg)", transition: "transform 0.35s ease-in", opacity: 0 }
        : dragX !== 0
          ? { transform: `translateX(${dragX}px) rotate(${rotation}deg)`, cursor: "grabbing" }
          : {};

  return (
    <div
      style={cardStyle}
      onTransitionEnd={handleTransitionEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative flex w-full max-w-md md:max-w-none md:w-auto"
    >
      {/* LIKE overlay */}
      {likeOpacity > 0.05 && (
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-start justify-start p-6 rounded-xl"
          style={{ opacity: likeOpacity }}
        >
          <span className="rounded-md border-4 border-green-500 px-3 py-1 text-2xl font-extrabold text-green-500 rotate-[-20deg]">
            LIKE
          </span>
        </div>
      )}

      {/* NOPE overlay */}
      {nopeOpacity > 0.05 && (
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-start justify-end p-6 rounded-xl"
          style={{ opacity: nopeOpacity }}
        >
          <span className="rounded-md border-4 border-red-500 px-3 py-1 text-2xl font-extrabold text-red-500 rotate-[20deg]">
            NOPE
          </span>
        </div>
      )}

      <Card
        className={`relative flex w-full min-w-[320px] max-h-[66vh] flex-col overflow-hidden shadow-lg md:max-h-[90vh] md:w-100 md:shrink-0 pt-0 ${onOpenDetails ? "cursor-pointer" : ""}`}
        tabIndex={onOpenDetails ? 0 : -1}
        onKeyDown={handleCardKeyDown}
        role={onOpenDetails ? "button" : undefined}
        aria-label={onOpenDetails ? "Open house details" : undefined}
      >
        <ImageGallery images={images} onClose={triggerClose} />

        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <Euro className="h-5 w-5 shrink-0" />
            <span>
              {bedroom.price}
              <span className="text-sm font-normal text-muted-foreground">
                /month
              </span>
            </span>
          </CardTitle>
          <CardDescription className="col-span-2">
            {property.title} - {bedroom.title}
          </CardDescription>
          <CardAction className="flex items-center gap-1 text-muted-foreground truncate row-span-1">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{property.address}</span>
          </CardAction>
        </CardHeader>

        <ScrollArea>
          <CardContent className="space-y-4" onClick={handleCardClick}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Availability</h3>
              <p className="text-xs text-muted-foreground">
                {formatDate(bedroom.available_from_date)} -{" "}
                {formatDate(bedroom.available_to_date)}
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Room Details</h3>
              <BedroomAmenityBadges bedroom={bedroom} />
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Property Amenities</h3>
              <PropertyAmenityBadges property={property} />
            </div>
          </CardContent>
        </ScrollArea>

        <CardFooter className="justify-center gap-2">
          <TooltipProvider>
            {onExitSmartSuggestion && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon-lg"
                    onClick={onExitSmartSuggestion}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Exit Smart Suggestions</TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isFavorited ? "destructive" : "default"}
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerLike();
                  }}
                >
                  <Heart
                    className={`h-6 w-6 transition-transform duration-200 ${popping ? "scale-150" : "scale-100"} ${isFavorited ? "fill-current text-red-500" : ""}`}
                  />
                  {isFavorited ? "Added to Favorites" : "Add to Favorites"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add to favorites & continue</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </div>
  );
}
