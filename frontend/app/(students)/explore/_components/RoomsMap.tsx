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
import type { PropertyMapResponse } from "@/lib/api/property";

export interface MapPadding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface RoomsMapProps {
  properties: PropertyMapResponse[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string) => void;
  padding?: MapPadding;
  hideControls?: boolean;
}

function getPriceRange(property: PropertyMapResponse): string {
  const prices = property.bedrooms.map((b) => b.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `${min}€` : `${min}€ - ${max}€`;
}

export function RoomsMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
  padding,
  hideControls = false,
}: RoomsMapProps) {
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (selectedPropertyId) {
      const property = properties.find((p) => p.id === selectedPropertyId);
      if (property && mapRef.current) {
        mapRef.current.flyTo({
          center: [property.lng, property.lat],
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
  }, [selectedPropertyId, properties, padding]);

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

      {properties.map((property) => (
        <Marker
          key={property.id}
          longitude={property.lng}
          latitude={property.lat}
          anchor="bottom"
          onClick={() => onSelectProperty(property.id)}
        >
          <Badge
            variant={selectedPropertyId === property.id ? "default" : "secondary"}
            className="shadow-sm cursor-pointer"
          >
            {getPriceRange(property)}
          </Badge>
        </Marker>
      ))}
    </Map>
  );
}
