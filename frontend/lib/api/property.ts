import { apiRequest } from "./client";

export interface BedroomMapResponse {
  id: string;
  title: string;
  price: number;
}

export interface PropertyMapResponse {
  id: string;
  lat: number;
  lng: number;
  bedrooms: BedroomMapResponse[];
}

export interface BedroomResponse {
  id: string;
  title: string;
  total_people: number;
  total_beds: number;
  available_beds: number;
  price: number;
  size_sqft: number;
  furnished: boolean;
  private_bath: boolean;
  available_from_date: string;
  available_to_date: string;
  min_stay_months: number;
  photos: string[];
  is_active: boolean;
}

export interface PropertyResponse {
  id: string;
  title: string;
  address: string;
  lat: number;
  lng: number;
  total_people: number;
  total_bedrooms: number;
  total_bathrooms: number;
  laundry: string;
  dishwasher: boolean;
  parking: boolean;
  ac: boolean;
  wifi: boolean;
  size_sqft: number;
  photos: string[];
}

export interface BedroomDetailResponse {
  bedroom: BedroomResponse;
  property: PropertyResponse;
}

export interface BedroomsDetailResponse {
  bedrooms: BedroomResponse[];
  property: PropertyResponse;
}

export interface PropertyMatchReasonResponse {
  trait: string;
  student_value: string;
  property_value: string;
  weight: number;
  points: number;
  score: number;
}

export interface PropertyMatchResponse {
  property: PropertyResponse;
  score: number;
  reasoning: PropertyMatchReasonResponse[];
}

export async function getPropertiesForMap(): Promise<PropertyMapResponse[]> {
  return apiRequest<PropertyMapResponse[]>("/api/property/map");
}

export async function getProperty(propertyId: string): Promise<PropertyResponse> {
  return apiRequest<PropertyResponse>(`/api/property/${propertyId}`);
}

export async function getBedroomDetail(propertyId: string, bedroomId: string): Promise<BedroomDetailResponse> {
  return apiRequest<BedroomDetailResponse>(`/api/property/${propertyId}/bedroom/${bedroomId}`);
}

export async function getPropertyById(propertyId: string): Promise<PropertyResponse> {
  return apiRequest<PropertyResponse>(`/api/property/${propertyId}`);
}

export async function getPropertyMatch(
  propertyId: string,
  userId: string,
): Promise<PropertyMatchResponse> {
  return apiRequest<PropertyMatchResponse>(`/api/property/${propertyId}/match`, {
    headers: { "X-User-Id": userId },
  });
}

export async function getBedroomsByPropertyId(propertyId: string): Promise<BedroomsDetailResponse> {
  return apiRequest<BedroomsDetailResponse>(`/api/property/${propertyId}/bedroom`);
}

export interface BedroomMatchResponse {
  bedroom: BedroomResponse;
  property: PropertyResponse;
  score: number;
  breakdown: { trait: string; weight: number; match: boolean }[];
}

export interface BedroomMatchesResponse {
  matches: BedroomMatchResponse[];
}

export async function getMatches(userId: string): Promise<BedroomMatchesResponse> {
  return apiRequest<BedroomMatchesResponse>("/api/property/matches", {
    headers: { "X-User-Id": userId },
  });
}
