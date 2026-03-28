import { Badge } from "@/components/ui/badge";
import { Bath, Bed, Clock3, Maximize2, Sofa, Users } from "lucide-react";
import type { BedroomResponse } from "@/lib/api/property";

interface BedroomAmenityBadgesProps {
  bedroom: BedroomResponse;
}

export function BedroomAmenityBadges({ bedroom }: BedroomAmenityBadgesProps) {
  const sizeSqm = Math.round(bedroom.size_sqft * 0.0929);

  return (
    <div className="flex flex-wrap gap-1">
      <Badge variant="outline" className="flex items-center gap-1.5 py-2">
        <Users className="h-4 w-4" />
        <span className="text-xs">{bedroom.total_people} People</span>
      </Badge>
      <Badge variant="outline" className="flex items-center gap-1.5 py-2">
        <Bed className="h-4 w-4" />
        <span className="text-xs">
          {bedroom.total_beds} Bed{bedroom.total_beds > 1 ? "s" : ""}
        </span>
      </Badge>
      <Badge variant="outline" className="flex items-center gap-1.5 py-2">
        <Bath className="h-4 w-4" />
        <span className="text-xs">
          {bedroom.private_bath ? "Private" : "Shared"}
        </span>
      </Badge>
      <Badge variant="outline" className="flex items-center gap-1.5 py-2">
        <Maximize2 className="h-4 w-4" />
        <span className="text-xs">{sizeSqm}m²</span>
      </Badge>
      <Badge variant="outline" className="flex items-center gap-1.5 py-2">
        <Sofa className="h-4 w-4" />
        <span className="text-xs">
          {bedroom.furnished ? "Furnished" : "Unfurnished"}
        </span>
      </Badge>
      <Badge variant="outline" className="flex items-center gap-1.5 py-2">
        <Clock3 className="h-4 w-4" />
        <span className="text-xs">Min Stay {bedroom.min_stay_months} mo</span>
      </Badge>
    </div>
  );
}
