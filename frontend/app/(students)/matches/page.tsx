"use client";

import { useState, useRef, useEffect } from "react";
import { X, Heart, Euro, MapPin } from "lucide-react";
import Image from "next/image";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { getMatches, type BedroomMatchResponse } from "@/lib/api/property";
import { addFavorite } from "@/lib/api/favorites";
import { useAuthStore } from "@/lib/auth/store";
import { BedroomAmenityBadges } from "@/components/BedroomAmenityBadges";
import { PropertyAmenityBadges } from "@/components/PropertyAmenityBadges";
import CircularProgress from "@/components/customized/progress/progress-07";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

function getPhotos(match: BedroomMatchResponse) {
  return [...(match.property.photos || []), ...(match.bedroom.photos || [])];
}

export default function MatchesPage() {
  const userId = useAuthStore((state) => state.session?.userId);
  const [matches, setMatches] = useState<BedroomMatchResponse[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null,
  );
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    if (!userId) return;
    getMatches(userId).then((res) => setMatches(res.matches));
  }, [userId]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setDragX(clientX - startX.current);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragX) > 100) {
      swipe(dragX > 0 ? "right" : "left");
    } else {
      setDragX(0);
    }
  };

  const swipe = (direction: "left" | "right") => {
    if (direction === "right" && userId && matches.length > 0) {
      addFavorite(userId, matches[0].bedroom.id).catch(() => {});
    }
    setSwipeDirection(direction);
    setDragX(0);
    setTimeout(() => {
      setMatches((prev) => prev.slice(1));
      setSwipeDirection(null);
      setImageIndex(0);
    }, 300);
  };

  const rotation = isDragging ? dragX * 0.05 : 0;

  return (
    <main className="flex flex-col items-center justify-center h-full p-4">
      <div className="relative aspect-3/5 w-full max-w-sm">
        {matches.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No more matches
          </div>
        ) : (
          matches.slice(0, 2).map((match, index) => {
            const photos = getPhotos(match);
            return (
              <Card
                key={match.bedroom.id}
                className={`absolute pt-0 inset-0 overflow-hidden rounded-2xl border shadow-lg transition-transform ${
                  index === 0
                    ? "z-10 cursor-grab active:cursor-grabbing"
                    : "z-0 scale-95"
                } ${
                  index === 0 && swipeDirection === "left"
                    ? "-translate-x-[150%] -rotate-30"
                    : ""
                } ${
                  index === 0 && swipeDirection === "right"
                    ? "translate-x-[150%] rotate-30"
                    : ""
                }`}
                style={
                  index === 0 && !swipeDirection
                    ? {
                        transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
                      }
                    : undefined
                }
                onMouseDown={(e) => index === 0 && handleDragStart(e.clientX)}
                onMouseMove={(e) => index === 0 && handleDragMove(e.clientX)}
                onMouseUp={() => index === 0 && handleDragEnd()}
                onMouseLeave={() =>
                  index === 0 && isDragging && handleDragEnd()
                }
                onTouchStart={(e) =>
                  index === 0 && handleDragStart(e.touches[0].clientX)
                }
                onTouchMove={(e) =>
                  index === 0 && handleDragMove(e.touches[0].clientX)
                }
                onTouchEnd={() => index === 0 && handleDragEnd()}
              >
                {photos.length > 0 && (
                  <>
                    <div className="absolute left-2 right-2 top-2 z-10 flex gap-1">
                      {photos.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${
                            index === 0 && i === imageIndex
                              ? "bg-white"
                              : "bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                    <div
                      className="relative h-1/2"
                      onClick={() =>
                        index === 0 &&
                        setImageIndex((prev) => (prev + 1) % photos.length)
                      }
                    >
                      <Image
                        src={photos[index === 0 ? imageIndex : 0]}
                        alt=""
                        fill
                        className="object-cover"
                      />
                      <div
                        className="absolute bottom-2 right-2 h-24 w-24 overflow-hidden rounded-lg border-2 border-white shadow-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Map
                          initialViewState={{
                            longitude: match.property.lng,
                            latitude: match.property.lat,
                            zoom: 13,
                          }}
                          style={{ width: "100%", height: "100%" }}
                          mapStyle="/map-style.json"
                          attributionControl={false}
                        >
                          <Marker
                            longitude={match.property.lng}
                            latitude={match.property.lat}
                          />
                        </Map>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex h-1/2 flex-col">
                  <CardHeader className="space-y-2 p-3 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <CardTitle className="line-clamp-1 text-base">
                          {match.property.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-1 text-xs flex gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">
                            {match.property.address}
                          </span>
                        </CardDescription>
                        <CardDescription className="line-clamp-1 text-xs">
                          {match.bedroom.title}
                        </CardDescription>
                      </div>
                      <CardAction>
                        <CircularProgress
                          value={Math.max(
                            0,
                            Math.min(100, Math.round(match.score)),
                          )}
                          size={62}
                          showLabel
                          renderLabel={(value) => `${value}%`}
                          labelClassName="text-[13px] font-semibold"
                          className="shrink-0"
                        />
                      </CardAction>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col p-3 pt-0">
                    <div className="flex items-center gap-1">
                      <Euro className="h-4 w-4" />
                      <span className="font-semibold">
                        {match.bedroom.price}
                        <span className="text-xs font-normal text-muted-foreground">
                          /mo
                        </span>
                      </span>
                    </div>
                    <ScrollArea className="mt-3 flex-1">
                      <div className="space-y-3">
                        <div>
                          <h3 className="mb-1 text-xs font-semibold">Room</h3>
                          <BedroomAmenityBadges bedroom={match.bedroom} />
                        </div>
                        <div>
                          <h3 className="mb-1 text-xs font-semibold">
                            Property
                          </h3>
                          <PropertyAmenityBadges property={match.property} />
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {matches.length > 0 && (
        <div className="flex gap-8 mt-6">
          <button
            onClick={() => swipe("left")}
            className="p-4 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={() => swipe("right")}
            className="p-4 rounded-full bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
          >
            <Heart className="w-8 h-8" />
          </button>
        </div>
      )}
    </main>
  );
}
