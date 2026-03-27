"use client";

import { ImageGallery } from "./ImageGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
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
import {
  MapPin,
  Euro,
  Bed,
  Bath,
  Maximize2,
  X,
  SkipForward,
  Heart,
  ArrowDown,
  Sofa,
  Wifi,
  Car,
  Wind,
} from "lucide-react";
import type { BedroomResponse, PropertyResponse } from "@/lib/api/property";

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
];

interface BedroomDetailsCardProps {
  bedroom: BedroomResponse;
  property: PropertyResponse;
  onDiscard: () => void;
  onSkip: () => void;
  onMatch: () => void;
  onExitSmartSuggestion?: () => void;
}

export function BedroomDetailsCard({
  bedroom,
  property,
  onDiscard,
  onSkip,
  onMatch,
  onExitSmartSuggestion,
}: BedroomDetailsCardProps) {
  // Use bedroom photos if available, fallback to property photos, then mock images
  const images = bedroom.photos?.length > 0 
    ? bedroom.photos 
    : property.photos?.length > 0 
      ? property.photos 
      : MOCK_IMAGES;
  const sizeSqm = bedroom.size_sqft ? Math.round(bedroom.size_sqft * 0.0929) : null;

  return (
    <Card className="relative flex w-full min-w-[320px] max-h-[66vh] flex-col overflow-hidden shadow-lg md:max-h-[90vh] md:w-[400px] md:shrink-0 pt-0">
      <ImageGallery images={images} />

      <CardHeader className="overflow-hidden">
        <CardTitle className="flex items-center gap-1">
          <Euro className="h-5 w-5 shrink-0" />
          <span>
            {bedroom.price}
            <span className="text-sm font-normal text-muted-foreground">
              /month
            </span>
          </span>
        </CardTitle>
        <CardAction className="flex items-center gap-1 text-muted-foreground truncate">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{property.address}</span>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-3 text-sm font-semibold">Room Details</h3>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="flex items-center gap-1.5 py-2">
              <Bed className="h-4 w-4" />
              <span className="text-xs">{bedroom.total_beds} Bed{bedroom.total_beds > 1 ? "s" : ""}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5 py-2">
              <Bath className="h-4 w-4" />
              <span className="text-xs">{bedroom.private_bath ? "Private" : "Shared"}</span>
            </Badge>
            {sizeSqm && (
              <Badge variant="outline" className="flex items-center gap-1.5 py-2">
                <Maximize2 className="h-4 w-4" />
                <span className="text-xs">{sizeSqm}m²</span>
              </Badge>
            )}
            {bedroom.furnished && (
              <Badge variant="outline" className="flex items-center gap-1.5 py-2">
                <Sofa className="h-4 w-4" />
                <span className="text-xs">Furnished</span>
              </Badge>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Property Amenities</h3>
          <div className="flex flex-wrap gap-1">
            {property.wifi && (
              <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
                <Wifi className="h-4 w-4" />
                <span className="text-xs">WiFi</span>
              </Badge>
            )}
            {property.ac && (
              <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
                <Wind className="h-4 w-4" />
                <span className="text-xs">AC</span>
              </Badge>
            )}
            {property.parking && (
              <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
                <Car className="h-4 w-4" />
                <span className="text-xs">Parking</span>
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" size="icon-lg" onClick={onDiscard}>
                <X className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Discard</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon-lg" onClick={onSkip}>
                <SkipForward className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Skip</TooltipContent>
          </Tooltip>

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
              <Button variant="default" size="icon-lg" onClick={onMatch}>
                <Heart className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Match</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
