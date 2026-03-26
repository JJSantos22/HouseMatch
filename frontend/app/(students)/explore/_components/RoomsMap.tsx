"use client";

import { useCallback, useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface Room {
  id: string;
  price: number;
  score: number;
  latitude: number;
  longitude: number;
}

interface RoomsMapProps {
  rooms: Room[];
  onSelectRoom?: (id: string) => void;
}

export function RoomsMap({ rooms, onSelectRoom }: RoomsMapProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const handleMarkerClick = useCallback(
    (roomId: string) => {
      setSelectedRoomId(roomId);
      onSelectRoom?.(roomId);
    },
    [onSelectRoom],
  );

  return (
    <div className="relative w-full overflow-hidden">
      <Map
        initialViewState={{
          longitude: -9.1393,
          latitude: 38.7223,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="/map-style.json"
      >
        <NavigationControl position="top-right" />

        {rooms.map((room) => (
          <Marker
            key={room.id}
            longitude={room.longitude}
            latitude={room.latitude}
            anchor="bottom"
            onClick={() => handleMarkerClick(room.id)}
          >
            <Badge
              variant={selectedRoomId === room.id ? "default" : "secondary"}
              className="shadow-sm"
              asChild
            >
              <a>
                {room.score * 10}%
                <Separator orientation="vertical" />
                {room.price}€
              </a>
            </Badge>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
