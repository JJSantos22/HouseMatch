"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Heart, MapPin, Euro, Bed, Bath, Sofa, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuthStore } from "@/lib/auth/store";
import { getFavorites, removeFavorite } from "@/lib/api/favorites";
import type { BedroomDetailResponse } from "@/lib/api/property";

export default function FavoritesPage() {
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
        toast.error("Failed to load favourites");
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
      toast.success("Removed from favourites");
    } catch {
      toast.error("Failed to remove favourite");
    } finally {
      setRemovingId(null);
    }
  };

  if (!isHydrated || isLoading) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-col p-6">
        <h1 className="text-2xl font-bold">Favourites</h1>
        <p className="text-muted-foreground mt-2">Loading...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Favourites</h1>
        {favorites.length > 0 && (
          <span className="text-muted-foreground text-sm">({favorites.length})</span>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-muted-foreground mt-2">
          No favourites yet. Browse listings and tap &quot;Add to Favourites&quot;!
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {favorites.map(({ bedroom, property }) => (
            <Card key={bedroom.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-1 text-lg">
                  <Euro className="h-4 w-4 shrink-0" />
                  {bedroom.price}
                  <span className="text-sm font-normal text-muted-foreground">/month</span>
                </CardTitle>
                <CardDescription>
                  {property.title} — {bedroom.title}
                </CardDescription>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {property.address}
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="flex items-center gap-1 py-1">
                    <Bed className="h-3.5 w-3.5" />
                    <span className="text-xs">{bedroom.total_beds} Bed{bedroom.total_beds > 1 ? "s" : ""}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 py-1">
                    <Bath className="h-3.5 w-3.5" />
                    <span className="text-xs">{bedroom.private_bath ? "Private Bath" : "Shared Bath"}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 py-1">
                    <Sofa className="h-3.5 w-3.5" />
                    <span className="text-xs">{bedroom.furnished ? "Furnished" : "Unfurnished"}</span>
                  </Badge>
                  <Badge variant="secondary" className="text-xs py-1">
                    Min {bedroom.min_stay_months} mo
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(bedroom.id)}
                  disabled={removingId === bedroom.id}
                >
                  <Trash2 className="h-4 w-4" />
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
