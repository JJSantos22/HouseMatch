import { apiRequest } from "./client";
import type { BedroomDetailResponse } from "./property";

export async function getFavorites(userId: string): Promise<BedroomDetailResponse[]> {
  return apiRequest<BedroomDetailResponse[]>("/api/favorite", {
    headers: { "X-User-Id": userId },
  });
}

export async function addFavorite(userId: string, bedroomId: string): Promise<void> {
  return apiRequest<void>(`/api/favorite/${bedroomId}`, {
    method: "POST",
    headers: { "X-User-Id": userId },
  });
}

export async function removeFavorite(userId: string, bedroomId: string): Promise<void> {
  return apiRequest<void>(`/api/favorite/${bedroomId}`, {
    method: "DELETE",
    headers: { "X-User-Id": userId },
  });
}
