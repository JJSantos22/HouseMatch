"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Loader2,
  User,
  Phone,
  Moon,
  Users,
  Volume2,
  Sparkles,
  BookOpen,
  UserRoundPlus,
} from "lucide-react";
import { FormEvent, useState, useMemo } from "react";
import { Separator } from "./ui/separator";

const ADVANCED_WEIGHT_DEFAULT = 3;

const advancedPreferenceParameters = [
  { key: "sleepSchedule", label: "Sleep Schedule" },
  { key: "socialPreference", label: "Social Preference" },
  { key: "cleanlinessLevel", label: "Cleanliness Level" },
  { key: "academic", label: "Academic Focus" },
  { key: "noise", label: "Noise Level" },
  { key: "guestFrequency", label: "Guest Frequency" },
] as const;

type AdvancedPreferenceWeightKey =
  (typeof advancedPreferenceParameters)[number]["key"];
type AdvancedPreferenceWeights = Record<AdvancedPreferenceWeightKey, number>;

const advancedPreferenceWeightsDefault: AdvancedPreferenceWeights = {
  sleepSchedule: ADVANCED_WEIGHT_DEFAULT,
  socialPreference: ADVANCED_WEIGHT_DEFAULT,
  cleanlinessLevel: ADVANCED_WEIGHT_DEFAULT,
  academic: ADVANCED_WEIGHT_DEFAULT,
  noise: ADVANCED_WEIGHT_DEFAULT,
  guestFrequency: ADVANCED_WEIGHT_DEFAULT,
};

export type ProfileData = {
  fullName: string;
  university: string;
  phone: string;
  sleepSchedule: string;
  socialPreference: string;
  noise: string;
  academic: string;
  cleanlinessLevel: string;
  guestFrequency: string;
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
      noise: initialData.noise || "",
      academic: initialData.academic || "",
      cleanlinessLevel: initialData.cleanlinessLevel || "",
      guestFrequency: initialData.guestFrequency || "",
    }),
    [initialData],
  );

  const [formData, setFormData] = useState<ProfileData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [advancedPreferenceWeights, setAdvancedPreferenceWeights] =
    useState<AdvancedPreferenceWeights>(advancedPreferenceWeightsDefault);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdvancedPreferenceWeightChange = (
    parameter: AdvancedPreferenceWeightKey,
    value: number,
  ) => {
    setAdvancedPreferenceWeights((prev) => ({ ...prev, [parameter]: value }));
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
        <CardTitle className="text-primary">{title}</CardTitle>
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
                <FieldLegend className="text-primary">Define Your Personality</FieldLegend>
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
                      htmlFor="noise"
                      className="flex items-center gap-2"
                    >
                      <Volume2 className="h-4 w-4" />
                      Noise Level
                    </FieldLabel>
                    <Select
                      value={formData.noise}
                      onValueChange={(value) =>
                        handleInputChange("noise", value)
                      }
                    >
                      <SelectTrigger id="noise" className="w-full">
                        <SelectValue placeholder="Select noise level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          Low - Prefer a quiet space
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium - Comfortable with some activity
                        </SelectItem>
                        <SelectItem value="high">
                          High - Fine with a lively environment
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="guestFrequency"
                      className="flex items-center gap-2"
                    >
                      <UserRoundPlus className="h-4 w-4" />
                      Guest Frequency
                    </FieldLabel>
                    <Select
                      value={formData.guestFrequency}
                      onValueChange={(value) =>
                        handleInputChange("guestFrequency", value)
                      }
                    >
                      <SelectTrigger id="guestFrequency" className="w-full">
                        <SelectValue placeholder="Select guest frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <Separator />

              <Accordion type="single" collapsible>
                <AccordionItem value="advanced-preferences">
                  <AccordionTrigger className="text-primary">Weight Your Personality Traits</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-1">
                      <FieldDescription>
                        Set how important each parameter is for matching.
                      </FieldDescription>
                      {advancedPreferenceParameters.map(({ key, label }) => {
                        const currentWeight = advancedPreferenceWeights[key];

                        return (
                          <Field key={key}>
                            <div className="flex items-center justify-between">
                              <FieldLabel htmlFor={`weight-${key}`}>
                                {label}
                              </FieldLabel>
                              <span className="text-sm font-medium text-muted-foreground tabular-nums">
                                {currentWeight}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 pt-1">
                              <span className="w-8 shrink-0 text-xs text-muted-foreground">
                                Low
                              </span>
                              <Slider
                                id={`weight-${key}`}
                                className="flex-1"
                                min={1}
                                max={5}
                                step={1}
                                value={[currentWeight]}
                                onValueChange={([value]) =>
                                  handleAdvancedPreferenceWeightChange(
                                    key,
                                    value,
                                  )
                                }
                              />
                              <span className="w-8 shrink-0 text-right text-xs text-muted-foreground">
                                High
                              </span>
                            </div>
                          </Field>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator />

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
