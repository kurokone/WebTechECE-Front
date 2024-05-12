// Modèle pour la table des films
export interface Movie {
  id: number;
  title: string;
  director: string | null;
  release_date: string | null;
  synopsis: string | null;
  posterUrl: string | null;
  imageUrl?: string | null;
  rating?: number | null;
  updatedAt?: string| Date | null;
  createdAt?: string| Date;
}
