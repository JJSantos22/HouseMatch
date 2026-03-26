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
  // Cleanliness
  "RELAXED",
  "MODERATE",
  "STRICT",
  // Academic
  "CASUAL",
  "INTENSIVE",
  // Lifestyle
  "HOMEBODY",
  "FLEXIBLE",
  "ADVENTUROUS",
  // Priority
  "FITNESS_FOCUSED",
  "HUSTLE_MODE",
  "PARTY_DRIVEN",
  "ERASMUS_MODE",
]);

// Personality traits object
const personalityTraitsSchema = z.object({
  schedule: personalityLevelSchema,
  social: personalityLevelSchema,
  cleanliness: personalityLevelSchema,
  academic: personalityLevelSchema,
  lifestyle: personalityLevelSchema,
  priority: personalityLevelSchema,
});

// PUT request schema (snake_case for backend)
const updateProfileRequestSchema = z.object({
  name: z.string().min(1),
  university: z.string().min(1),
  phone: z.string().optional(),
  schedule: personalityLevelSchema,
  social: personalityLevelSchema,
  cleanliness: personalityLevelSchema,
  academic: personalityLevelSchema,
  lifestyle: personalityLevelSchema,
  priority: personalityLevelSchema,
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
    return "BALANCED"; // "normal" → BALANCED
  }

  // Social preference mapping
  if (field === "socialPreference") {
    if (value === "introverted") return "INTROVERT";
    if (value === "balanced") return "AMBIVERT";
    // "social" or "very-social" → EXTROVERT
    return "EXTROVERT";
  }

  // Cleanliness level mapping
  if (field === "cleanlinessLevel") {
    if (value === "relaxed") return "RELAXED";
    if (value === "very-clean") return "STRICT";
    // "clean" or "average" → MODERATE
    return "MODERATE";
  }

  // Academic focus mapping
  if (field === "academic") {
    if (value === "casual") return "CASUAL";
    if (value === "intensive") return "INTENSIVE";
    return "BALANCED";
  }

  // Lifestyle mapping
  if (field === "lifestyle") {
    if (value === "homebody") return "HOMEBODY";
    if (value === "adventurous") return "ADVENTUROUS";
    return "FLEXIBLE";
  }

  // Priority mapping
  if (field === "priority") {
    if (value === "fitness") return "FITNESS_FOCUSED";
    if (value === "career") return "HUSTLE_MODE";
    if (value === "social") return "PARTY_DRIVEN";
    if (value === "erasmus") return "ERASMUS_MODE";
    return "HUSTLE_MODE"; // default for students
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

  // Cleanliness level reverse mapping
  if (field === "cleanlinessLevel") {
    if (value === "RELAXED") return "relaxed";
    if (value === "STRICT") return "very-clean";
    return "average";
  }

  // Academic focus reverse mapping
  if (field === "academic") {
    if (value === "CASUAL") return "casual";
    if (value === "INTENSIVE") return "intensive";
    return "balanced";
  }

  // Lifestyle reverse mapping
  if (field === "lifestyle") {
    if (value === "HOMEBODY") return "homebody";
    if (value === "ADVENTUROUS") return "adventurous";
    return "flexible";
  }

  // Priority reverse mapping
  if (field === "priority") {
    if (value === "FITNESS_FOCUSED") return "fitness";
    if (value === "HUSTLE_MODE") return "career";
    if (value === "PARTY_DRIVEN") return "social";
    if (value === "ERASMUS_MODE") return "erasmus";
    return "career";
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
    university: data.university,
    phone: data.phone || "",
    schedule: mapFormValueToPersonalityLevel("sleepSchedule", data.sleepSchedule),
    social: mapFormValueToPersonalityLevel(
      "socialPreference",
      data.socialPreference,
    ),
    cleanliness: mapFormValueToPersonalityLevel(
      "cleanlinessLevel",
      data.cleanlinessLevel,
    ),
    academic: mapFormValueToPersonalityLevel("academic", data.academic),
    lifestyle: mapFormValueToPersonalityLevel("lifestyle", data.lifestyle),
    priority: mapFormValueToPersonalityLevel("priority", data.priority),
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
      cleanlinessLevel: "",
      academic: "",
      lifestyle: "",
      priority: "",
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
    cleanlinessLevel: mapPersonalityLevelToFormValue(
      "cleanlinessLevel",
      traits.cleanliness,
    ),
    academic: mapPersonalityLevelToFormValue("academic", traits.academic),
    lifestyle: mapPersonalityLevelToFormValue("lifestyle", traits.lifestyle),
    priority: mapPersonalityLevelToFormValue("priority", traits.priority),
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
