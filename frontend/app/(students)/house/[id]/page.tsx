"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Phone,
  SendHorizonal,
} from "lucide-react";
import {
  getBedroomsByPropertyId,
  getPropertyMatch,
  type BedroomResponse,
  type PropertyMatchResponse,
  type PropertyMatchReasonResponse,
  type PropertyResponse,
} from "@/lib/api/property";
import { addFavorite, removeFavorite } from "@/lib/api/favorites";
import { ApiError } from "@/lib/api/client";
import CircularProgress from "@/components/customized/progress/progress-07";
import { useAuthStore } from "@/lib/auth/store";
import { Button } from "@/components/ui/button";
import { BedroomAmenityBadges } from "@/components/BedroomAmenityBadges";
import { PropertyAmenityBadges } from "@/components/PropertyAmenityBadges";
import {
  Card,
  CardAction,
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
  ItemActions,
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

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=900&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=900&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=900&fit=crop",
];

function formatDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
}

function formatTrait(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeScore(value: number) {
  return Math.max(0, Math.min(100, value));
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
  const userId = useAuthStore((state) => state.session?.userId);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const [isLoading, setIsLoading] = useState(true);
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());
  const [poppingId, setPoppingId] = useState<string | null>(null);
  const [property, setProperty] = useState<PropertyResponse | null>(null);
  const [bedrooms, setBedrooms] = useState<BedroomResponse[]>([]);
  const [propertyMatch, setPropertyMatch] =
    useState<PropertyMatchResponse | null>(null);
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

      if (!isHydrated) {
        return;
      }

      try {
        setIsLoading(true);

        const detailsPromise = getBedroomsByPropertyId(propertyId);
        const matchPromise: Promise<PropertyMatchResponse | null> = userId
          ? getPropertyMatch(propertyId, userId)
          : Promise.resolve(null);

        const [detailsData, matchData] = await Promise.all([
          detailsPromise,
          matchPromise,
        ]);

        setProperty(detailsData.property);
        setBedrooms(detailsData.bedrooms);
        setPropertyMatch(matchData);
        setReviews(getMockReviews(propertyId, detailsData.property.title));
      } catch (error) {
        console.error("Failed to load house details:", error);
        toast.error("Failed to load house details");
      } finally {
        setIsLoading(false);
      }
    }

    loadHouseDetails();
  }, [propertyId, userId, isHydrated]);

  const matchReasoning = useMemo<PropertyMatchReasonResponse[]>(
    () => propertyMatch?.reasoning.slice(0, 18) ?? [],
    [propertyMatch],
  );

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

  const bedroomPriceRange = useMemo(() => {
    if (bedrooms.length === 0) {
      return null;
    }

    const prices = bedrooms.map((bedroom) => bedroom.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return { min, max };
  }, [bedrooms]);

  const currentImage = galleryImages[currentImageIndex];

  const handleFavoriteToggle = async (bedroomId: string) => {
    if (!userId) return;
    setPoppingId(bedroomId);
    setTimeout(() => setPoppingId(null), 200);

    if (favoritedIds.has(bedroomId)) {
      try {
        await removeFavorite(userId, bedroomId);
        setFavoritedIds((prev) => { const s = new Set(prev); s.delete(bedroomId); return s; });
        toast.success("Removed from favorites");
      } catch {
        toast.error("Failed to remove from favorites");
      }
    } else {
      try {
        await addFavorite(userId, bedroomId);
        setFavoritedIds((prev) => new Set(prev).add(bedroomId));
        toast.success("Added to favorites");
      } catch (error) {
        if (error instanceof ApiError && error.status === 409) {
          setFavoritedIds((prev) => new Set(prev).add(bedroomId));
          toast.info("Already in your favorites");
        } else {
          toast.error("Failed to add to favorites");
        }
      }
    }
  };

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
              <CardAction>
                {propertyMatch ? (
                  <CircularProgress
                    value={normalizeScore(propertyMatch.score)}
                    size={62}
                    showLabel
                    renderLabel={(value) => `${value}%`}
                    labelClassName="text-[11px] font-semibold"
                  />
                ) : null}
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-lg font-semibold">
                {bedroomPriceRange !== null ? (
                  bedroomPriceRange.min === bedroomPriceRange.max ? (
                    <>
                      €{bedroomPriceRange.min}
                      <span className="text-muted-foreground">/month</span>
                    </>
                  ) : (
                    <>
                      €{bedroomPriceRange.min} - {bedroomPriceRange.max}
                      <span className="text-muted-foreground">/month</span>
                    </>
                  )
                ) : (
                  "Price on request"
                )}
              </div>

              <PropertyAmenityBadges property={property} showOverview />
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
                    <BedroomAmenityBadges bedroom={bedroom} />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleFavoriteToggle(bedroom.id)}
                      aria-label={`${favoritedIds.has(bedroom.id) ? "Remove" : "Add"} ${bedroom.title} ${favoritedIds.has(bedroom.id) ? "from" : "to"} favorites`}
                    >
                      <Heart
                        className={`transition-transform duration-200 ${poppingId === bedroom.id ? "scale-150" : "scale-100"} ${favoritedIds.has(bedroom.id) ? "fill-current text-red-500" : ""}`}
                      />
                    </Button>
                  </ItemFooter>
                </Item>
              ))}
            </ItemGroup>
          )}
        </section>
        
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Match by Category</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {propertyMatch
              ? "Trait-by-trait compatibility breakdown"
              : userId
                ? "No match score available for this property right now."
                : "Sign in to view your match score for this property."}
          </p>
          {matchReasoning.length === 0 ? (
            <FieldDescription className="mt-3">
              Trait-by-trait breakdown will appear here when available.
            </FieldDescription>
          ) : (
            <ItemGroup className="grid grid-cols-2">
              {matchReasoning.map((reason) => {
                const categoryScore = normalizeScore(reason.score);

                return (
                  <Item key={reason.trait} size="xs">
                    <ItemContent>
                      <ItemTitle>{formatTrait(reason.trait)}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <CircularProgress
                        value={categoryScore}
                        size={34}
                        showLabel
                        renderLabel={() => `${categoryScore}`}
                        labelClassName="text-[9px] font-semibold"
                      />
                    </ItemActions>
                  </Item>
                );
              })}
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
            variant="outline"
            className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => toast.info("Call feature coming soon")}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
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
