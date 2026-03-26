"use client";

import { ImageGallery } from "./ImageGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MapPin,
  Euro,
  Bed,
  Bath,
  Maximize2,
  X,
  SkipForward,
  Heart,
  Star,
  Home,
  Bus,
  Moon,
  Users,
  Sparkles,
  BookOpen,
  Compass,
  Target,
} from "lucide-react";
import type { House } from "@/types/house";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../../../../components/ui/item";
import CircularProgress from "@/components/customized/progress/progress-07";

// Map preference names to icons
const preferenceIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Location: MapPin,
  Price: Euro,
  Amenities: Home,
  Transport: Bus,
  "Sleep Schedule": Moon,
  "Social Preference": Users,
  "Cleanliness Level": Sparkles,
  "Academic Focus": BookOpen,
  Lifestyle: Compass,
  "Main Priority": Target,
};

interface HouseDetailsCardProps {
  house: House;
  onDiscard: () => void;
  onSkip: () => void;
  onMatch: () => void;
}

export function HouseDetailsCard({
  house,
  onDiscard,
  onSkip,
  onMatch,
}: HouseDetailsCardProps) {
  return (
    <Card className="relative flex w-full max-h-[66vh] flex-col overflow-hidden shadow-lg md:max-h-[90vh] md:max-w-md pt-0">
      {/* Image Gallery */}
      <ImageGallery images={house.images} />

      {/* Header Info */}
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <Euro className="h-5 w-5" />
          <span>
            {house.price}
            <span className="text-sm font-normal text-muted-foreground">
              /month
            </span>
          </span>
        </CardTitle>
        <CardAction className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {house.location}
        </CardAction>
      </CardHeader>

      {/* Tabs Content */}
      <CardContent>
        <Tabs
          defaultValue="info"
          className="flex flex-1 flex-col overflow-hidden"
        >
          <TabsList className="w-full" variant="line">
            <TabsTrigger value="info" className="flex-1">
              Info
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">
              Reviews ({house.reviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            {/* House Info */}
            <div>
              <h3 className="mb-3 text-sm font-semibold">Property Details</h3>
              <div className="flex gap-1">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 py-2"
                >
                  <Bed className="h-4 w-4" />
                  <span className="text-xs">{house.beds} Beds</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 py-2"
                >
                  <Bath className="h-4 w-4" />
                  <span className="text-xs">
                    {house.hasPrivateBathroom ? "Private" : "Shared"}
                  </span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 py-2"
                >
                  <Maximize2 className="h-4 w-4" />
                  <span className="text-xs">{house.size}m²</span>
                </Badge>
              </div>
            </div>

            {/* Match Scores */}
            <div>
              <h3 className="mb-3 mt-3 text-sm font-semibold">Match Scores</h3>
              <ItemGroup className="grid grid-cols-2">
                {house.matchScores.map((match, index) => {
                  const Icon = preferenceIcons[match.preference] || Target;
                  return (
                    <Item key={index} variant="outline" size="xs">
                      <ItemMedia variant="icon">
                        <Icon className="h-4 w-4" />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{match.preference}</ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <span className="flex items-center gap-1 text-xs">
                          {match.score}
                          <CircularProgress value={match.score} />
                        </span>
                      </ItemActions>
                    </Item>
                  );
                })}
              </ItemGroup>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <ItemGroup>
              {house.reviews.map((review) => (
                <Item key={review.id} variant="outline">
                  <ItemContent>
                    <ItemDescription>
                      {new Date(review.date).toLocaleDateString()}
                    </ItemDescription>
                    <ItemTitle>{review.author}</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <Star className="h-3 w-3" />
                    <span className="text-xs">{review.rating}</span>
                  </ItemActions>
                  {review.comment}
                </Item>
              ))}
            </ItemGroup>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Actions */}
      <CardFooter className="justify-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" size="icon-lg" onClick={onDiscard}>
                <X className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Discard</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon-lg" onClick={onSkip}>
                <SkipForward className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Skip</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="default" size="icon-lg" onClick={onMatch}>
                <Heart className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Match</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
