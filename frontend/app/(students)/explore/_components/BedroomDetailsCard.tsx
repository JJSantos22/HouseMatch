"use client";

import { useState } from "react";
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

interface BedroomDetailsCardProps {
  bedroom: BedroomResponse;
  property: PropertyResponse;
  userId?: string;
  onMatch: () => void;
  onClose?: () => void;
  onExitSmartSuggestion?: () => void;
  onOpenDetails?: () => void;
}

export function BedroomDetailsCard({
  bedroom,
  property,
  userId,
  onMatch,
  onClose,
  onExitSmartSuggestion,
  onOpenDetails,
}: BedroomDetailsCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [popping, setPopping] = useState(false);
  // Use bedroom photos if available, fallback to property photos, then mock images
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
    if (!onOpenDetails) return;
    onOpenDetails();
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onOpenDetails) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenDetails();
    }
  };

  const handleFavoriteToggle = async () => {
    if (!userId) return;
    setPopping(true);
    setTimeout(() => setPopping(false), 200);

    if (isFavorited) {
      try {
        await removeFavorite(userId, bedroom.id);
        setIsFavorited(false);
        toast.success("Removed from favorites");
      } catch {
        toast.error("Failed to remove from favorites");
      }
    } else {
      try {
        await addFavorite(userId, bedroom.id);
        setIsFavorited(true);
        toast.success("Added to favorites");
      } catch (error) {
        if (error instanceof ApiError && error.status === 409) {
          setIsFavorited(true);
          toast.info("Already in your favorites");
        } else {
          toast.error("Failed to add to favorites");
        }
      }
    }
  };

  return (
    <Card
      className={`relative flex w-full min-w-[320px] max-h-[66vh] flex-col overflow-hidden shadow-lg md:max-h-[90vh] md:w-100 md:shrink-0 pt-0 ${onOpenDetails ? "cursor-pointer" : ""}`}
      tabIndex={onOpenDetails ? 0 : -1}
      onKeyDown={handleCardKeyDown}
      role={onOpenDetails ? "button" : undefined}
      aria-label={onOpenDetails ? "Open house details" : undefined}
    >
      <ImageGallery images={images} onClose={onClose} />

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
                onClick={handleFavoriteToggle}
              >
                <Heart
                  className={`h-6 w-6 transition-transform duration-200 ${popping ? "scale-150" : "scale-100"} ${isFavorited ? "fill-current" : ""}`}
                />
                {isFavorited ? "Favorited" : "Add to Favorites"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isFavorited ? "Remove from favorites" : "Add to favorites"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
