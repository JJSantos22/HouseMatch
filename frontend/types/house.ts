export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface MatchScore {
  preference: string;
  score: number;
  icon?: string;
}

export interface House {
  id: string;
  images: string[];
  location: string;
  price: number;
  latitude: number;
  longitude: number;

  // House info
  beds: number;
  hasPrivateBathroom: boolean;
  size: number;

  // Match scores
  matchScores: MatchScore[];

  // Reviews
  reviews: Review[];
}
