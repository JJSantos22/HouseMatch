"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { toast } from "sonner";
import {
  Bath,
  Bed,
  Car,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Maximize2,
  SendHorizonal,
  Sofa,
  Users,
  Utensils,
  WashingMachine,
  Wifi,
  Wind,
} from "lucide-react";
import {
  getBedroomDetail,
  getPropertiesForMap,
  getPropertyById,
  type BedroomResponse,
  type PropertyResponse,
} from "@/lib/api/property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
  ItemFooter,
} from "@/components/ui/item";

type PropertyReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};

type GalleryImage = {
  src: string;
  label: string;
};

const LAUNDRY_LABELS: Record<string, string> = {
  BUILDING: "In Building",
  HOUSE: "In House",
  NONE: "None",
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=900&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=900&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=900&fit=crop",
];

function formatDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
}

function formatSqtToSqm(value: number) {
  return Math.round(value * 0.0929);
}

function getMockReviews(
  propertyId: string,
  propertyTitle: string,
): PropertyReview[] {
  return [
    {
      id: `${propertyId}-r1`,
      author: "Ines Duarte",
      rating: 4.7,
      date: "2026-02-10",
      comment: `Great experience staying at ${propertyTitle}. Responsive host and clean common spaces.`,
    },
    {
      id: `${propertyId}-r2`,
      author: "Miguel Sousa",
      rating: 4.4,
      date: "2026-01-22",
      comment:
        "Very good location for students, with reliable amenities and quiet nights.",
    },
    {
      id: `${propertyId}-r3`,
      author: "Carla Martins",
      rating: 4.9,
      date: "2025-12-15",
      comment: "Room photos matched reality and move-in process was smooth.",
    },
  ];
}

export default function HouseDetailsPage() {
  const params = useParams<{ id: string }>();
  const propertyId = params?.id;

  const [isLoading, setIsLoading] = useState(true);
  const [property, setProperty] = useState<PropertyResponse | null>(null);
  const [bedrooms, setBedrooms] = useState<BedroomResponse[]>([]);
  const [reviews, setReviews] = useState<PropertyReview[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    async function loadHouseDetails() {
      if (!propertyId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const [propertyData, mapProperties] = await Promise.all([
          getPropertyById(propertyId),
          getPropertiesForMap(),
        ]);

        const mapProperty = mapProperties.find(
          (item) => item.id === propertyId,
        );
        const bedroomIds =
          mapProperty?.bedrooms.map((bedroom) => bedroom.id) ?? [];

        const detailedBedrooms = (
          await Promise.all(
            bedroomIds.map(async (bedroomId) => {
              try {
                const detail = await getBedroomDetail(propertyId, bedroomId);
                return detail.bedroom;
              } catch {
                return null;
              }
            }),
          )
        ).filter((bedroom): bedroom is BedroomResponse => bedroom !== null);

        setProperty(propertyData);
        setBedrooms(detailedBedrooms);
        setReviews(getMockReviews(propertyId, propertyData.title));
      } catch (error) {
        console.error("Failed to load house details:", error);
        toast.error("Failed to load house details");
      } finally {
        setIsLoading(false);
      }
    }

    loadHouseDetails();
  }, [propertyId]);

  const galleryImages = useMemo<GalleryImage[]>(() => {
    const images: GalleryImage[] = [];

    if (property?.photos?.length) {
      images.push(
        ...property.photos.map((src) => ({
          src,
          label: ``,
        })),
      );
    }

    bedrooms.forEach((bedroom) => {
      if (!bedroom.photos?.length) {
        return;
      }

      images.push(
        ...bedroom.photos.map((src) => ({
          src,
          label: `${bedroom.title}`,
        })),
      );
    });

    if (images.length === 0) {
      return FALLBACK_IMAGES.map((src) => ({
        src,
        label: ``,
      }));
    }

    return images;
  }, [property, bedrooms]);

  const lowestBedroomPrice = useMemo(() => {
    if (bedrooms.length === 0) {
      return null;
    }

    return Math.min(...bedrooms.map((bedroom) => bedroom.price));
  }, [bedrooms]);

  const currentImage = galleryImages[currentImageIndex];

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    const selectedThumbnail = thumbnailRefs.current[currentImageIndex];
    if (!selectedThumbnail) {
      return;
    }

    selectedThumbnail.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentImageIndex]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6">
        <FieldDescription>Loading house details...</FieldDescription>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6">
        <FieldDescription>House not found.</FieldDescription>
      </div>
    );
  }

  return (
    <main className="flex h-full flex-col">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-y-auto p-4 md:p-6">
        <section className="space-y-3">
          <div
            className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted"
            onClick={() => setIsLightboxOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setIsLightboxOpen(true);
              }
            }}
            aria-label="Open image gallery"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized
            />

            {currentImage.label && (
              <div className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                {currentImage.label}
              </div>
            )}

            {galleryImages.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  onClick={(event) => {
                    event.stopPropagation();
                    handlePreviousImage();
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleNextImage();
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {galleryImages.map((image, index) => (
              <button
                key={`${image.src}-${image.label}`}
                type="button"
                ref={(element) => {
                  thumbnailRefs.current[index] = element;
                }}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 shrink-0 overflow-hidden rounded-md border text-left md:w-24 ${
                  index === currentImageIndex
                    ? "border-primary"
                    : "border-border"
                }`}
                aria-label={
                  image.label
                    ? `Select ${image.label}`
                    : `Select photo ${index + 1}`
                }
                aria-current={index === currentImageIndex}
              >
                {image.label ? (
                  <>
                    <div className="relative aspect-square w-full bg-muted">
                      <Image
                        src={image.src}
                        alt={image.label}
                        fill
                        className="object-cover"
                        sizes="96px"
                        unoptimized
                      />
                    </div>
                    <div className="line-clamp-1 px-1.5 py-1 text-[10px] text-muted-foreground">
                      {image.label}
                    </div>
                  </>
                ) : (
                  <div className="relative h-full w-full bg-muted">
                    <Image
                      src={image.src}
                      alt={`Photo ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                      unoptimized
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{property.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{property.address}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-lg font-semibold">
                {lowestBedroomPrice !== null
                  ? `${lowestBedroomPrice} EUR/month`
                  : "Price on request"}
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 py-2"
                >
                  <Users className="h-4 w-4" />
                  <span>{property.total_people} People</span>
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 py-2"
                >
                  <Bed className="h-4 w-4" />
                  <span>{property.total_bedrooms} Bedrooms</span>
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 py-2"
                >
                  <Bath className="h-4 w-4" />
                  <span>{property.total_bathrooms} Bathrooms</span>
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 py-2"
                >
                  <Maximize2 className="h-4 w-4" />
                  <span>{formatSqtToSqm(property.size_sqft)}m²</span>
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 py-2"
                >
                  <Wifi className="h-4 w-4" />
                  <span>WiFi: {property.wifi ? "Yes" : "No"}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 py-2"
                >
                  <Wind className="h-4 w-4" />
                  <span>AC: {property.ac ? "Yes" : "No"}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 py-2"
                >
                  <Car className="h-4 w-4" />
                  <span>Parking: {property.parking ? "Yes" : "No"}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 py-2"
                >
                  <Utensils className="h-4 w-4" />
                  <span>Dishwasher: {property.dishwasher ? "Yes" : "No"}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 py-2"
                >
                  <WashingMachine className="h-4 w-4" />
                  <span>
                    Laundry:{" "}
                    {LAUNDRY_LABELS[property.laundry] ?? property.laundry}
                  </span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-lg font-semibold">Bedrooms</h2>
          {bedrooms.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <FieldDescription>
                  No bedroom details available right now.
                </FieldDescription>
              </CardContent>
            </Card>
          ) : (
            <ItemGroup>
              {bedrooms.map((bedroom) => (
                <Item key={bedroom.id} variant="outline" size="sm">
                  <ItemHeader>
                    <ItemTitle>{bedroom.title}</ItemTitle>
                    <div className="text-sm font-semibold">
                      €{bedroom.price}
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </ItemHeader>
                  <ItemContent>
                    <ItemDescription>
                      Available {formatDate(bedroom.available_from_date)} to{" "}
                      {formatDate(bedroom.available_to_date)}
                    </ItemDescription>
                  </ItemContent>
                  <ItemFooter className="items-start gap-2">
                    <div className="flex flex-1 flex-wrap gap-0">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1.5 py-2"
                      >
                        <Users className="h-4 w-4" />
                        <span className="text-xs">
                          {bedroom.total_people} People
                        </span>
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1.5 py-2"
                      >
                        <Bed className="h-4 w-4" />
                        <span className="text-xs">
                          {bedroom.total_beds} Bed
                          {bedroom.total_beds > 1 ? "s" : ""}
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
                        <span className="text-xs">
                          {formatSqtToSqm(bedroom.size_sqft)}m²
                        </span>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toast.success("Added to favorites")}
                      aria-label={`Add ${bedroom.title} to favorites`}
                    >
                      <Heart />
                    </Button>
                  </ItemFooter>
                </Item>
              ))}
            </ItemGroup>
          )}
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-lg font-semibold">Reviews</h2>
          <ItemGroup>
            {reviews.map((review) => (
              <Item key={review.id} variant="outline" size="sm">
                <ItemHeader>
                  <ItemTitle>{review.author}</ItemTitle>
                  <div className="text-sm font-medium">
                    {review.rating.toFixed(1)}/5
                  </div>
                </ItemHeader>
                <ItemContent>
                  <ItemDescription>{formatDate(review.date)}</ItemDescription>
                  <ItemDescription>{review.comment}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </section>
      </div>

      <div className="border-t bg-background/95 p-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl gap-2">
          <Button
            className="flex-1"
            onClick={() => toast.info("Opening message thread")}
          >
            <SendHorizonal className="mr-2 h-4 w-4" />
            Message
          </Button>
        </div>
      </div>

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        index={currentImageIndex}
        slides={galleryImages.map((image) => ({ src: image.src }))}
      />
    </main>
  );
}
