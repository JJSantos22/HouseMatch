"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  MapPin,
  Euro,
  Bed,
  Bath,
  Users,
  Maximize2,
  Wifi,
  Car,
  Wind,
  Utensils,
  WashingMachine,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuthStore } from "@/lib/auth/store";
import { getProperty, getPropertiesForMap, type PropertyResponse, type BedroomMapResponse } from "@/lib/api/property";
import { addFavorite } from "@/lib/api/favorites";
import { ApiError } from "@/lib/api/client";

const LAUNDRY_LABELS: Record<string, string> = {
  BUILDING: "In Building",
  HOUSE: "In House",
  NONE: "None",
};

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
];

export default function PropertyPage() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const router = useRouter();
  const userId = useAuthStore((state) => state.session?.userId);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const [property, setProperty] = useState<PropertyResponse | null>(null);
  const [bedrooms, setBedrooms] = useState<BedroomMapResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrated) return;

    async function fetchData() {
      try {
        const [propertyData, mapData] = await Promise.all([
          getProperty(propertyId),
          getPropertiesForMap(),
        ]);
        setProperty(propertyData);
        const match = mapData.find((p) => p.id === propertyId);
        setBedrooms(match?.bedrooms ?? []);
      } catch {
        toast.error("Failed to load property");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [isHydrated, propertyId]);

  const handleAddFavorite = async (bedroomId: string) => {
    if (!userId) return;
    setAddingId(bedroomId);
    try {
      await addFavorite(userId, bedroomId);
      toast.success("Added to favorites");
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        toast.info("Already in your favorites");
      } else {
        toast.error("Failed to add to favorites");
      }
    } finally {
      setAddingId(null);
    }
  };

  const images = property?.photos?.length ? property.photos : MOCK_IMAGES;
  const sizeSqm = property ? Math.round(property.size_sqft * 0.0929) : 0;

  if (!isHydrated || isLoading) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-col p-6">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-col p-6">
        <p className="text-muted-foreground">Property not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <Button variant="ghost" className="w-fit -ml-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      {/* Photos */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={images[0]}
          alt={property.title}
          className="w-full aspect-video object-cover"
        />
      </div>

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{property.title}</h1>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{property.address}</span>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h2 className="mb-3 text-base font-semibold">Amenities</h2>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
            <Users className="h-4 w-4" />
            <span className="text-xs">{property.total_people} People</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
            <Bath className="h-4 w-4" />
            <span className="text-xs">{property.total_bathrooms} Bathrooms</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
            <Maximize2 className="h-4 w-4" />
            <span className="text-xs">{sizeSqm}m²</span>
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
            <span className="text-xs">Parking: {property.parking ? "Yes" : "No"}</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
            <Utensils className="h-4 w-4" />
            <span className="text-xs">Dishwasher: {property.dishwasher ? "Yes" : "No"}</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5 py-2">
            <WashingMachine className="h-4 w-4" />
            <span className="text-xs">Laundry: {LAUNDRY_LABELS[property.laundry] ?? property.laundry}</span>
          </Badge>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <h2 className="mb-3 text-base font-semibold">Available Rooms</h2>
        <div className="flex flex-col gap-3">
          {bedrooms.map((bedroom) => (
            <Card key={bedroom.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-1 text-base">
                  <Bed className="h-4 w-4 shrink-0" />
                  {bedroom.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Euro className="h-3.5 w-3.5 shrink-0" />
                  {bedroom.price}/month
                </CardDescription>
              </CardHeader>
              <CardFooter className="justify-end">
                <Button
                  size="sm"
                  onClick={() => handleAddFavorite(bedroom.id)}
                  disabled={addingId === bedroom.id}
                >
                  <Heart className="h-4 w-4" />
                  {addingId === bedroom.id ? "Adding..." : "Add to Favorites"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
