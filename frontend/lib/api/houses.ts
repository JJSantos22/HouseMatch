import type { House } from "@/types/house";

export interface SimpleHouse {
  id: string;
  price: number;
  score: number;
  latitude: number;
  longitude: number;
}

// Mock data for demonstration
const MOCK_HOUSES: House[] = [
  {
    id: "1",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
    ],
    location: "Baixa, Lisbon",
    price: 450,
    latitude: 38.7223,
    longitude: -9.1393,
    beds: 2,
    hasPrivateBathroom: true,
    size: 45,
    matchScores: [
      { preference: "Location", score: 92 },
      { preference: "Price", score: 85 },
      { preference: "Amenities", score: 78 },
      { preference: "Transport", score: 95 },
    ],
    reviews: [
      {
        id: "r1",
        author: "João Silva",
        rating: 4.5,
        date: "2024-02-15",
        comment:
          "Great location, close to everything. Landlord is very responsive.",
      },
      {
        id: "r2",
        author: "Maria Santos",
        rating: 5.0,
        date: "2024-01-20",
        comment:
          "Perfect for students! Clean, affordable, and in a safe neighborhood.",
      },
    ],
  },
  {
    id: "2",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
    location: "Alfama, Lisbon",
    price: 380,
    latitude: 38.7369,
    longitude: -9.1428,
    beds: 1,
    hasPrivateBathroom: false,
    size: 30,
    matchScores: [
      { preference: "Location", score: 72 },
      { preference: "Price", score: 95 },
      { preference: "Amenities", score: 65 },
      { preference: "Transport", score: 70 },
    ],
    reviews: [
      {
        id: "r3",
        author: "Pedro Costa",
        rating: 4.0,
        date: "2024-03-01",
        comment:
          "Good value for money, but shared bathroom can be inconvenient.",
      },
    ],
  },
  {
    id: "3",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop",
    ],
    location: "Belém, Lisbon",
    price: 520,
    latitude: 38.7169,
    longitude: -9.1333,
    beds: 3,
    hasPrivateBathroom: true,
    size: 65,
    matchScores: [
      { preference: "Location", score: 88 },
      { preference: "Price", score: 70 },
      { preference: "Amenities", score: 98 },
      { preference: "Transport", score: 85 },
    ],
    reviews: [
      {
        id: "r4",
        author: "Ana Rodrigues",
        rating: 5.0,
        date: "2024-02-28",
        comment: "Spacious and modern. Perfect for sharing with roommates!",
      },
      {
        id: "r5",
        author: "Carlos Mendes",
        rating: 4.5,
        date: "2024-01-15",
        comment: "Beautiful area, very peaceful. Highly recommended.",
      },
      {
        id: "r6",
        author: "Sofia Alves",
        rating: 5.0,
        date: "2024-03-10",
        comment: "Amazing place! Clean, spacious, and great landlord.",
      },
    ],
  },
  {
    id: "4",
    images: [
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=600&fit=crop",
    ],
    location: "Chiado, Lisbon",
    price: 410,
    latitude: 38.7282,
    longitude: -9.1501,
    beds: 2,
    hasPrivateBathroom: true,
    size: 40,
    matchScores: [
      { preference: "Location", score: 90 },
      { preference: "Price", score: 80 },
      { preference: "Amenities", score: 75 },
      { preference: "Transport", score: 92 },
    ],
    reviews: [
      {
        id: "r7",
        author: "Miguel Ferreira",
        rating: 4.0,
        date: "2024-02-10",
        comment: "Central location, but can be noisy at night.",
      },
    ],
  },
  {
    id: "5",
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop",
    ],
    location: "Parque das Nações, Lisbon",
    price: 395,
    latitude: 38.7156,
    longitude: -9.1478,
    beds: 1,
    hasPrivateBathroom: true,
    size: 35,
    matchScores: [
      { preference: "Location", score: 75 },
      { preference: "Price", score: 88 },
      { preference: "Amenities", score: 82 },
      { preference: "Transport", score: 90 },
    ],
    reviews: [
      {
        id: "r8",
        author: "Rita Oliveira",
        rating: 4.5,
        date: "2024-03-05",
        comment: "Modern building with great facilities. Love it!",
      },
      {
        id: "r9",
        author: "Tiago Sousa",
        rating: 4.0,
        date: "2024-02-20",
        comment: "Good transport connections and nice neighborhood.",
      },
    ],
  },
];

/**
 * Calculate average match score for a house
 */
function getAverageScore(house: House): number {
  if (house.matchScores.length === 0) return 0;
  const sum = house.matchScores.reduce((acc, score) => acc + score.score, 0);
  return Math.round(sum / house.matchScores.length);
}

/**
 * Get all houses in simplified format (for map display)
 */
export async function getAllHouses(): Promise<SimpleHouse[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return MOCK_HOUSES.map((house) => ({
    id: house.id,
    price: house.price,
    score: getAverageScore(house),
    latitude: house.latitude,
    longitude: house.longitude,
  }));
}

/**
 * Get detailed information for a specific house
 */
export async function getHouseDetails(id: string): Promise<House | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return MOCK_HOUSES.find((house) => house.id === id) ?? null;
}
