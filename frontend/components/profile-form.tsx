"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Loader2,
  User,
  GraduationCap,
  Phone,
  Moon,
  Users,
  Sparkles,
  BookOpen,
  Compass,
  Target,
} from "lucide-react";
import { FormEvent, useState, useMemo } from "react";

export type ProfileData = {
  fullName: string;
  university: string;
  phone: string;
  sleepSchedule: string;
  socialPreference: string;
  cleanlinessLevel: string;
  academic: string;
  lifestyle: string;
  priority: string;
};

type ProfileFormProps = {
  initialData?: Partial<ProfileData>;
  onSubmit: (data: ProfileData) => Promise<void>;
  isLoading?: boolean;
  isInitialLoading?: boolean;
  submitButtonText?: string;
  title?: string;
  description?: string;
  onSuccess?: () => void;
  successMessage?: string;
};

export function ProfileForm({
  initialData = {},
  onSubmit,
  isLoading = false,
  isInitialLoading = false,
  submitButtonText = "Save Profile",
  title = "Your Profile",
  description = "Tell us about yourself to find the perfect roommate match.",
  onSuccess,
  successMessage = "Profile saved successfully!",
}: ProfileFormProps) {
  const initialFormData = useMemo(
    () => ({
      fullName: initialData.fullName || "",
      university: initialData.university || "",
      phone: initialData.phone || "",
      sleepSchedule: initialData.sleepSchedule || "",
      socialPreference: initialData.socialPreference || "",
      cleanlinessLevel: initialData.cleanlinessLevel || "",
      academic: initialData.academic || "",
      lifestyle: initialData.lifestyle || "",
      priority: initialData.priority || "",
    }),
    [initialData],
  );

  const [formData, setFormData] = useState<ProfileData>(initialFormData);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      await onSubmit(formData);
      toast.success(successMessage);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <FieldDescription>{description}</FieldDescription>}
      </CardHeader>
      <CardContent>
        {isInitialLoading ? (
          <div className="space-y-6">
            {/* Basic Information Skeletons */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Separator */}
            <div className="border-t my-6" />

            {/* Preference Skeletons - 2x3 Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>

            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Basic Information */}
              <Field>
                <FieldLabel
                  htmlFor="fullName"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Full Name
                </FieldLabel>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  required
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="university"
                  className="flex items-center gap-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  University
                </FieldLabel>
                <Input
                  id="university"
                  type="text"
                  placeholder="University of Example"
                  value={formData.university}
                  onChange={(e) =>
                    handleInputChange("university", e.target.value)
                  }
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number (Optional)
                </FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </Field>

              <FieldSeparator />

              {/* Personality Traits - 2x3 Grid */}
              <FieldSet>
                <FieldLegend>Preferences</FieldLegend>
                <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
                  <Field>
                    <FieldLabel
                      htmlFor="sleepSchedule"
                      className="flex items-center gap-2"
                    >
                      <Moon className="h-4 w-4" />
                      Sleep Schedule
                    </FieldLabel>
                    <Select
                      value={formData.sleepSchedule}
                      onValueChange={(value) =>
                        handleInputChange("sleepSchedule", value)
                      }
                    >
                      <SelectTrigger id="sleepSchedule" className="w-full">
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="early-bird">Early bird</SelectItem>
                        <SelectItem value="normal">Normal schedule</SelectItem>
                        <SelectItem value="night-owl">Night owl</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="socialPreference"
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      Social Preference
                    </FieldLabel>
                    <Select
                      value={formData.socialPreference}
                      onValueChange={(value) =>
                        handleInputChange("socialPreference", value)
                      }
                    >
                      <SelectTrigger id="socialPreference" className="w-full">
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="introverted">Introverted</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="cleanlinessLevel"
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      Cleanliness Level
                    </FieldLabel>
                    <Select
                      value={formData.cleanlinessLevel}
                      onValueChange={(value) =>
                        handleInputChange("cleanlinessLevel", value)
                      }
                    >
                      <SelectTrigger id="cleanlinessLevel" className="w-full">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relaxed">Relaxed</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="very-clean">Very clean</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="academic"
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      Academic Focus
                    </FieldLabel>
                    <Select
                      value={formData.academic}
                      onValueChange={(value) =>
                        handleInputChange("academic", value)
                      }
                    >
                      <SelectTrigger id="academic" className="w-full">
                        <SelectValue placeholder="Select academic focus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">
                          Casual - Relaxed approach
                        </SelectItem>
                        <SelectItem value="balanced">
                          Balanced - Mix of both
                        </SelectItem>
                        <SelectItem value="intensive">
                          Intensive - Highly focused
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="lifestyle"
                      className="flex items-center gap-2"
                    >
                      <Compass className="h-4 w-4" />
                      Lifestyle
                    </FieldLabel>
                    <Select
                      value={formData.lifestyle}
                      onValueChange={(value) =>
                        handleInputChange("lifestyle", value)
                      }
                    >
                      <SelectTrigger id="lifestyle" className="w-full">
                        <SelectValue placeholder="Select lifestyle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homebody">
                          Homebody - Prefer staying in
                        </SelectItem>
                        <SelectItem value="flexible">
                          Flexible - Mix of both
                        </SelectItem>
                        <SelectItem value="adventurous">
                          Adventurous - Love going out
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="priority"
                      className="flex items-center gap-2"
                    >
                      <Target className="h-4 w-4" />
                      Main Priority
                    </FieldLabel>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        handleInputChange("priority", value)
                      }
                    >
                      <SelectTrigger id="priority" className="w-full">
                        <SelectValue placeholder="Select main priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fitness">Fitness Focused</SelectItem>
                        <SelectItem value="career">
                          Career / Hustle Mode
                        </SelectItem>
                        <SelectItem value="social">Social / Party</SelectItem>
                        <SelectItem value="erasmus">
                          Erasmus / International Experience
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </FieldSet>

              {error && (
                <FieldDescription className="text-red-600">
                  {error}
                </FieldDescription>
              )}

              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    submitButtonText
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
