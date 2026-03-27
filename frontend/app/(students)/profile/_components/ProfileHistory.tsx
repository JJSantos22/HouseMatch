"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Pencil, Check, Home, X } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type HouseReview = {
  id: string;
  name: string;
  datesOfStay: string;
  review: string;
  score: number; // 1-5
};

type ProfileHistoryProps = {
  houses: HouseReview[];
  onUpdateHouse: (
    houseId: string,
    review: string,
    score: number,
  ) => Promise<void>;
};

export function ProfileHistory({ houses, onUpdateHouse }: ProfileHistoryProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editReview, setEditReview] = useState("");
  const [editScore, setEditScore] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEdit = (house: HouseReview) => {
    setEditingId(house.id);
    setEditReview(house.review);
    setEditScore(Math.min(5, Math.max(1, house.score)));
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditReview("");
    setEditScore(1);
  };

  const handleConfirm = async (houseId: string) => {
    setIsUpdating(true);
    try {
      const normalizedScore = Math.min(5, Math.max(1, editScore));
      await onUpdateHouse(houseId, editReview, normalizedScore);
      setEditingId(null);
      setEditReview("");
      setEditScore(1);
    } catch (error) {
      console.error("Failed to update house review:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (houses.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            House Review History
          </CardTitle>
          <CardDescription>
            Your reviews and ratings for houses you&apos;ve visited
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm text-center py-8">
            No house reviews yet. Start exploring houses to add reviews!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Renting History</CardTitle>
        <CardDescription>
          Review your experience in your previous accomodations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {houses.map((house, index) => {
            const isEditing = editingId === house.id;
            const scoreLabel = `${Math.min(5, Math.max(1, house.score))}/5`;

            return (
              <Item key={house.id} variant="outline">
                {index > 0 && <Separator className="mb-4" />}
                <ItemContent>
                  <ItemDescription>{house.datesOfStay}</ItemDescription>
                  <ItemTitle>{house.name} {isEditing || <ItemDescription>{scoreLabel}</ItemDescription>}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  {!isEditing ? (
                    <Button
                      variant="default"
                      size="icon-sm"
                      onClick={() => handleEdit(house)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={handleCancel}
                        disabled={isUpdating}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="default"
                        size="icon-sm"
                        onClick={() => handleConfirm(house.id)}
                        disabled={isUpdating}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </ItemActions>
                <ItemFooter>
                  {isEditing ? (
                    <>
                      <FieldGroup className="gap-3">
                        <Field>
                          <FieldLabel htmlFor={`review-${house.id}`}>
                            Rating
                          </FieldLabel>
                          <Select
                            value={String(editScore)}
                            onValueChange={(value) =>
                              setEditScore(Number(value))
                            }
                          >
                            <SelectTrigger
                              className="w-24"
                              aria-label={`Score for ${house.name}`}
                            >
                              <SelectValue placeholder="Score" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((score) => (
                                <SelectItem key={score} value={String(score)}>
                                  {score}/5
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>

                        <Field>
                          <FieldLabel htmlFor={`review-${house.id}`}>
                            Review
                          </FieldLabel>
                          <Textarea
                            id={`review-${house.id}`}
                            value={editReview}
                            onChange={(e) => setEditReview(e.target.value)}
                            placeholder="Write your review..."
                            rows={3}
                          />
                        </Field>
                      </FieldGroup>
                    </>
                  ) : (
                    <>{house.review || "No review provided"}</>
                  )}
                </ItemFooter>
              </Item>
            );
          })}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
