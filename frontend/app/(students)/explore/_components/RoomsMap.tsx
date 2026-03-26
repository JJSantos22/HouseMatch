"use client";

import { useEffect, useRef } from "react";
import Map, {
  Marker,
  NavigationControl,
  MapRef,
  AttributionControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { SimpleHouse } from "@/lib/api/houses";

export interface MapPadding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface RoomsMapProps {
  houses: SimpleHouse[];
  selectedHouseId: string | null;
  onSelectHouse: (id: string) => void;
  padding?: MapPadding;
  hideControls?: boolean;
}

export function RoomsMap({
  houses,
  selectedHouseId,
  onSelectHouse,
  padding,
  hideControls = false,
}: RoomsMapProps) {
  const mapRef = useRef<MapRef>(null);

  // Center map when a house is selected
  useEffect(() => {
    if (selectedHouseId) {
      console.log(padding);
      const house = houses.find((h) => h.id === selectedHouseId);
      if (house && mapRef.current) {
        mapRef.current.flyTo({
          center: [house.longitude, house.latitude],
          zoom: 14,
          duration: 1000,
          padding: padding,
        });
      }
    } else {
      if (mapRef.current) {
        mapRef.current.flyTo({
          padding: padding,
        });
      }
    }
  }, [selectedHouseId, houses, padding]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: -9.1393,
        latitude: 38.7223,
        zoom: 12,
      }}
      style={{ width: "100%", height: "auto" }}
      mapStyle="/map-style.json"
      attributionControl={false}
    >
      {!hideControls && <NavigationControl position="top-right" />}
      {!hideControls && <AttributionControl position="bottom-left" />}

      {houses.map((house) => (
        <Marker
          key={house.id}
          longitude={house.longitude}
          latitude={house.latitude}
          anchor="bottom"
          onClick={() => onSelectHouse(house.id)}
        >
          <Badge
            variant={selectedHouseId === house.id ? "default" : "secondary"}
            className="shadow-sm"
            asChild
          >
            <a>
              {house.score}%
              <Separator orientation="vertical" />
              {house.price}€
            </a>
          </Badge>
        </Marker>
      ))}
    </Map>
  );
}
