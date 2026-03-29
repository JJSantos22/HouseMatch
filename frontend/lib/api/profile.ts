import { z } from "zod";
import { apiRequest } from "@/lib/api/client";
import type { ProfileData } from "@/components/profile-form";

// Personality level enum matching backend
const personalityLevelSchema = z.enum([
  // Schedule
  "EARLY_BIRD",
  "BALANCED",
  "NIGHT_OWL",
  // Social
  "INTROVERT",
  "AMBIVERT",
  "EXTROVERT",
  // Noise
  "LOW",
  "MEDIUM",
  "HIGH",
  // Academic
  "CASUAL",
  "INTENSIVE",
  // Cleanliness
  "RELAXED",
  "MODERATE",
  "STRICT",
  // Guest frequency
  "LOW",
  "MEDIUM",
  "HIGH",
]);

// Personality traits object
const personalityTraitsSchema = z.object({
  schedule: personalityLevelSchema,
  social: personalityLevelSchema,
  noise: personalityLevelSchema,
  academic: personalityLevelSchema,
  cleanliness: personalityLevelSchema,
  guest_frequency: personalityLevelSchema,
});

// PUT request schema (snake_case for backend)
const updateProfileRequestSchema = z.object({
  name: z.string().min(1),
  university: z.string().min(1).optional(),
  phone: z.string().optional(),
  schedule: personalityLevelSchema,
  social: personalityLevelSchema,
  noise: personalityLevelSchema,
  academic: personalityLevelSchema,
  cleanliness: personalityLevelSchema,
  guest_frequency: personalityLevelSchema,
});

// GET response schema with snake_case → camelCase transform
const profileResponseSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    role: z.enum(["student", "landlord"]),
    university: z.string().nullish(),
    phone: z.string().nullish(),
    email: z.string().email(),
    personality_traits: personalityTraitsSchema.nullish(),
  })
  .transform(({ personality_traits, ...rest }) => ({
    ...rest,
    personalityTraits: personality_traits,
  }));

export type PersonalityLevel = z.infer<typeof personalityLevelSchema>;
export type UpdateProfileRequest = z.input<typeof updateProfileRequestSchema>;
export type ProfileResponse = z.output<typeof profileResponseSchema>;

/**
 * Maps user-friendly form values to backend PersonalityLevel enum values
 */
function mapFormValueToPersonalityLevel(
  field: keyof ProfileData,
  value: string,
): PersonalityLevel {
  // Sleep schedule mapping
  if (field === "sleepSchedule") {
    if (value === "early-bird") return "EARLY_BIRD";
    if (value === "night-owl") return "NIGHT_OWL";
    if (value === "normal") return "BALANCED"; // "normal" → BALANCED
  }

  // Social preference mapping
  if (field === "socialPreference") {
    if (value === "introverted") return "INTROVERT";
    if (value === "balanced") return "AMBIVERT";
    if (value === "social") return "EXTROVERT";
  }

  // Noise mapping
  if (field === "noise") {
    if (value === "low") return "LOW";
    if (value === "medium") return "MEDIUM";
    if (value === "high") return "HIGH";
  }

  // Academic focus mapping
  if (field === "academic") {
    if (value === "casual") return "CASUAL";
    if (value === "intensive") return "INTENSIVE";
    if (value === "balanced") return "BALANCED";
  }

  // Cleanliness level mapping
  if (field === "cleanlinessLevel") {
    if (value === "relaxed") return "RELAXED";
    if (value === "very-clean") return "STRICT";
    if (value === "average") return "MODERATE"; 
  }

  // Guest frequency mapping
  if (field === "guestFrequency") {
    if (value === "low") return "LOW";
    if (value === "medium") return "MEDIUM";
    if (value === "high") return "HIGH";
  }

  throw new Error(`Unknown field for personality level mapping: ${field}`);
}

/**
 * Maps backend PersonalityLevel enum values to user-friendly form values
 */
function mapPersonalityLevelToFormValue(
  field: keyof ProfileData,
  value: PersonalityLevel,
): string {
  // Sleep schedule reverse mapping
  if (field === "sleepSchedule") {
    if (value === "EARLY_BIRD") return "early-bird";
    if (value === "NIGHT_OWL") return "night-owl";
    return "normal";
  }

  // Social preference reverse mapping
  if (field === "socialPreference") {
    if (value === "INTROVERT") return "introverted";
    if (value === "AMBIVERT") return "balanced";
    return "social";
  }

  // Noise reverse mapping
  if (field === "noise") {
    if (value === "LOW") return "low";
    if (value === "MEDIUM") return "medium";
    return "high";
  }

  // Academic focus reverse mapping
  if (field === "academic") {
    if (value === "CASUAL") return "casual";
    if (value === "INTENSIVE") return "intensive";
    return "balanced";
  }

  // Cleanliness level reverse mapping
  if (field === "cleanlinessLevel") {
    if (value === "RELAXED") return "relaxed";
    if (value === "STRICT") return "very-clean";
    return "average";
  }

  // Guest frequency reverse mapping
  if (field === "guestFrequency") {
    if (value === "LOW") return "low";
    if (value === "MEDIUM") return "medium";
    return "high";
  }

  return "";
}

/**
 * Transforms ProfileData (form) → UpdateProfileRequest (backend)
 */
export function mapProfileDataToUpdateRequest(
  data: ProfileData,
): UpdateProfileRequest {
  return {
    name: data.fullName,
    phone: data.phone || "",
    schedule: mapFormValueToPersonalityLevel("sleepSchedule", data.sleepSchedule),
    social: mapFormValueToPersonalityLevel(
      "socialPreference",
      data.socialPreference,
    ),
    noise: mapFormValueToPersonalityLevel("noise", data.noise),
    academic: mapFormValueToPersonalityLevel("academic", data.academic),
    cleanliness: mapFormValueToPersonalityLevel(
      "cleanlinessLevel",
      data.cleanlinessLevel,
    ),
    guest_frequency: mapFormValueToPersonalityLevel("guestFrequency", data.guestFrequency),
  };
}

/**
 * Transforms ProfileResponse (backend) → ProfileData (form)
 */
export function mapProfileResponseToProfileData(
  response: ProfileResponse,
): ProfileData {
  const traits = response.personalityTraits;

  if (!traits) {
    // If no personality traits, return minimal profile data
    return {
      fullName: response.name,
      university: response.university || "",
      phone: response.phone || "",
      sleepSchedule: "",
      socialPreference: "",
      noise: "",
      academic: "",
      cleanlinessLevel: "",
      guestFrequency: "",
    };
  }

  return {
    fullName: response.name,
    university: response.university || "",
    phone: response.phone || "",
    sleepSchedule: mapPersonalityLevelToFormValue("sleepSchedule", traits.schedule),
    socialPreference: mapPersonalityLevelToFormValue(
      "socialPreference",
      traits.social,
    ),
    noise: mapPersonalityLevelToFormValue("noise", traits.noise),
    academic: mapPersonalityLevelToFormValue("academic", traits.academic),
    cleanlinessLevel: mapPersonalityLevelToFormValue(
      "cleanlinessLevel",
      traits.cleanliness,
    ),
    guestFrequency: mapPersonalityLevelToFormValue("guestFrequency", traits.guest_frequency),
  };
}

/**
 * Fetches the user's profile from the backend
 * @param userId - The user's UUID
 * @returns ProfileResponse containing the user's profile data
 */
export async function getProfile(userId: string): Promise<ProfileResponse> {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await apiRequest<unknown>("/api/profile", {
    method: "GET",
    headers: {
      "X-User-Id": userId,
    },
  });

  return profileResponseSchema.parse(response);
}

/**
 * Updates the user's profile (or creates if doesn't exist)
 * @param userId - The user's UUID
 * @param payload - ProfileData from the form
 */
export async function updateProfile(
  userId: string,
  payload: ProfileData,
): Promise<void> {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const request = mapProfileDataToUpdateRequest(payload);
  const validatedRequest = updateProfileRequestSchema.parse(request);

  await apiRequest<void>("/api/profile", {
    method: "PUT",
    headers: {
      "X-User-Id": userId,
    },
    body: validatedRequest,
  });
}

export type Laundry = "BUILDING" | "HOUSE" | "NONE";

export interface SearchPreferences {
  minPrice?: number;
  maxPrice?: number;
  minStayMonths?: number;
  availableFrom?: string;
  furnished?: boolean;
  privateBath?: boolean;
  privateRoom?: boolean;
  maxRoommates?: number;
  maxBedrooms?: number;
  dishwasher?: boolean;
  parking?: boolean;
  ac?: boolean;
  wifi?: boolean;
  laundry?: Laundry;
  centerLat?: number;
  centerLng?: number;
  radiusKm?: number;
}

export async function updateSearchPreferences(
  userId: string,
  preferences: SearchPreferences,
): Promise<void> {
  await apiRequest<void>("/api/profile/search-preferences", {
    method: "PUT",
    headers: { "X-User-Id": userId },
    body: {
      min_price: preferences.minPrice,
      max_price: preferences.maxPrice,
      min_stay_months: preferences.minStayMonths,
      available_from: preferences.availableFrom,
      furnished: preferences.furnished,
      private_bath: preferences.privateBath,
      private_room: preferences.privateRoom,
      max_roommates: preferences.maxRoommates,
      max_bedrooms: preferences.maxBedrooms,
      dishwasher: preferences.dishwasher,
      parking: preferences.parking,
      ac: preferences.ac,
      wifi: preferences.wifi,
      laundry: preferences.laundry,
      center_lat: preferences.centerLat,
      center_lng: preferences.centerLng,
      radius_km: preferences.radiusKm,
    },
  });
}
