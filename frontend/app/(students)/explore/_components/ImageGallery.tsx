"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  onClose?: () => void;
}

export function ImageGallery({ images, onClose }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
        <div className="flex h-full items-center justify-center text-muted-foreground">
          No images available
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-black cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={images[currentIndex]}
          alt={`House image ${currentIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 448px"
          unoptimized
        />

        {onClose && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-2 z-10 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((src) => ({ src }))}
        index={currentIndex}
        on={{ view: ({ index }) => setCurrentIndex(index) }}
      />
    </>
  );
}
