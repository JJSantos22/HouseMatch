"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Heart, MapPin, Euro, HeartMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BedroomAmenityBadges } from "@/components/BedroomAmenityBadges";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { useAuthStore } from "@/lib/auth/store";
import { getFavorites, removeFavorite } from "@/lib/api/favorites";
import type { BedroomDetailResponse } from "@/lib/api/property";

export default function FavoritesPage() {
  const router = useRouter();
  const userId = useAuthStore((state) => state.session?.userId);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const [favorites, setFavorites] = useState<BedroomDetailResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrated || !userId) return;

    async function fetchFavorites() {
      try {
        const data = await getFavorites(userId!);
        setFavorites(data);
      } catch {
        toast.error("Failed to load favorites");
      } finally {
        setIsLoading(false);
      }
    }

    fetchFavorites();
  }, [isHydrated, userId]);

  const handleRemove = async (bedroomId: string) => {
    if (!userId) return;
    setRemovingId(bedroomId);
    try {
      await removeFavorite(userId, bedroomId);
      setFavorites((prev) => prev.filter((f) => f.bedroom.id !== bedroomId));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Failed to remove favourite");
    } finally {
      setRemovingId(null);
    }
  };

  if (!isHydrated || isLoading) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-col p-6">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <p className="text-muted-foreground mt-2">Loading...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Favorites</h1>
        {favorites.length > 0 && (
          <span className="text-muted-foreground text-sm">
            ({favorites.length})
          </span>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-muted-foreground mt-2">
          No favorites yet. Browse listings and tap &quot;Add to
          Favorites&quot;!
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {favorites.map(({ bedroom, property }) => (
            <Card
              key={bedroom.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/house/${property.id}`)}
            >
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

              <CardContent>
                <BedroomAmenityBadges bedroom={bedroom} />
              </CardContent>

              <CardFooter className="justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(bedroom.id);
                  }}
                  disabled={removingId === bedroom.id}
                >
                  <HeartMinus className="h-4 w-4" />
                  {removingId === bedroom.id ? "Removing..." : "Remove"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
