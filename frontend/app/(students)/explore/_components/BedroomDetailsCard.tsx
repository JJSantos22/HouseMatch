"use client";

import { ImageGallery } from "./ImageGallery";
import { Badge } from "@/components/ui/badge";
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
import {
  MapPin,
  Euro,
  Bed,
  Bath,
  Users,
  Clock3,
  Maximize2,
  X,
  SkipForward,
  Heart,
  ArrowDown,
  Sofa,
  Wifi,
  Car,
  Wind,
  Utensils,
  WashingMachine,
} from "lucide-react";
import type { BedroomResponse, PropertyResponse } from "@/lib/api/property";
import { ScrollArea } from "@/components/ui/scroll-area";

const LAUNDRY_LABELS: Record<string, string> = {
  BUILDING: "In Building",
  HOUSE: "In House",
  NONE: "None",
};

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
  onClose?: () => void;
  onExitSmartSuggestion?: () => void;
}

export function BedroomDetailsCard({
  bedroom,
  property,
  onDiscard,
  onSkip,
  onMatch,
  onClose,
  onExitSmartSuggestion,
}: BedroomDetailsCardProps) {
  // Use bedroom photos if available, fallback to property photos, then mock images
  const images =
    bedroom.photos?.length > 0
      ? bedroom.photos
      : property.photos?.length > 0
        ? property.photos
        : MOCK_IMAGES;
  const sizeSqm = Math.round(bedroom.size_sqft * 0.0929);
  const propertySizeSqm = Math.round(property.size_sqft * 0.0929);

  const formatDate = (value: string) => {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
  };

  return (
    <Card className="relative flex w-full min-w-[320px] max-h-[66vh] flex-col overflow-hidden shadow-lg md:max-h-[90vh] md:w-100 md:shrink-0 pt-0">
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
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Availability</h3>
            <p className="text-xs text-muted-foreground">
              {formatDate(bedroom.available_from_date)} -{" "}
              {formatDate(bedroom.available_to_date)}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Room Details</h3>
            <div className="flex flex-wrap gap-1">
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 py-2"
              >
                <Users className="h-4 w-4" />
                <span className="text-xs">{bedroom.total_people} People</span>
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 py-2"
              >
                <Bed className="h-4 w-4" />
                <span className="text-xs">
                  {bedroom.total_beds} Bed{bedroom.total_beds > 1 ? "s" : ""}
                </span>
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 py-2"
              >
                <Bath className="h-4 w-4" />
                <span className="text-xs">
                  {bedroom.private_bath ? "Private" : "Shared"}
                </span>
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 py-2"
              >
                <Maximize2 className="h-4 w-4" />
                <span className="text-xs">{sizeSqm}m²</span>
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 py-2"
              >
                <Sofa className="h-4 w-4" />
                <span className="text-xs">
                  {bedroom.furnished ? "Furnished" : "Unfurnished"}
                </span>
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 py-2"
              >
                <Clock3 className="h-4 w-4" />
                <span className="text-xs">
                  Min Stay {bedroom.min_stay_months} mo
                </span>
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Property Amenities</h3>
            <div className="flex flex-wrap gap-1">
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 py-2"
              >
                <Wifi className="h-4 w-4" />
                <span className="text-xs">
                  WiFi: {property.wifi ? "Yes" : "No"}
                </span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 py-2"
              >
                <Wind className="h-4 w-4" />
                <span className="text-xs">
                  AC: {property.ac ? "Yes" : "No"}
                </span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 py-2"
              >
                <Car className="h-4 w-4" />
                <span className="text-xs">
                  Parking: {property.parking ? "Yes" : "No"}
                </span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 py-2"
              >
                <Utensils className="h-4 w-4" />
                <span className="text-xs">
                  Dishwasher: {property.dishwasher ? "Yes" : "No"}
                </span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 py-2"
              >
                <WashingMachine className="h-4 w-4" />
                <span className="text-xs">Laundry: {LAUNDRY_LABELS[property.laundry] ?? property.laundry}</span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 py-2"
              >
                <Bath className="h-4 w-4" />
                <span className="text-xs">
                  {property.total_bathrooms} Bathrooms
                </span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 py-2"
              >
                <Maximize2 className="h-4 w-4" />
                <span className="text-xs">{propertySizeSqm}m²</span>
              </Badge>
            </div>
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
              <Button variant="default" size="lg" onClick={onMatch}>
                <Heart className="h-6 w-6" /> Add to Favourites
              </Button>
            </TooltipTrigger>
            <TooltipContent>Match</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
