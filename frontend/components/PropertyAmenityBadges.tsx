import { Badge } from "@/components/ui/badge";
import {
  Bath,
  Bed,
  Car,
  Maximize2,
  Utensils,
  Users,
  WashingMachine,
  Wifi,
  Wind,
} from "lucide-react";
import type { PropertyResponse } from "@/lib/api/property";

const LAUNDRY_LABELS: Record<string, string> = {
  BUILDING: "In Building",
  HOUSE: "In House",
  NONE: "None",
};

interface PropertyAmenityBadgesProps {
  property: PropertyResponse;
  showOverview?: boolean;
}

export function PropertyAmenityBadges({
  property,
  showOverview = false,
}: PropertyAmenityBadgesProps) {
  const propertySizeSqm = Math.round(property.size_sqft * 0.0929);

  return (
    <div className="flex flex-wrap gap-1">
      {showOverview && (
        <>
          <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
            <Users className="h-4 w-4" />
            <span className="text-xs">{property.total_people} People</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
            <Bed className="h-4 w-4" />
            <span className="text-xs">{property.total_bedrooms} Bedrooms</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
            <Bath className="h-4 w-4" />
            <span className="text-xs">
              {property.total_bathrooms} Bathrooms
            </span>
          </Badge>
        </>
      )}
      <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
        <Maximize2 className="h-4 w-4" />
        <span className="text-xs">{propertySizeSqm}m²</span>
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
        <Wifi className="h-4 w-4" />
        <span className="text-xs">WiFi: {property.wifi ? "Yes" : "No"}</span>
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
        <Wind className="h-4 w-4" />
        <span className="text-xs">AC: {property.ac ? "Yes" : "No"}</span>
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
        <Car className="h-4 w-4" />
        <span className="text-xs">
          Parking: {property.parking ? "Yes" : "No"}
        </span>
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
        <Utensils className="h-4 w-4" />
        <span className="text-xs">
          Dishwasher: {property.dishwasher ? "Yes" : "No"}
        </span>
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
        <WashingMachine className="h-4 w-4" />
        <span className="text-xs">
          Laundry: {LAUNDRY_LABELS[property.laundry] ?? property.laundry}
        </span>
      </Badge>
    </div>
  );
}
