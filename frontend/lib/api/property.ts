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
