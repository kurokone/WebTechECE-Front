// Modèle pour la table des avis
export interface Review {
    id?: number;
    user?: any;
    user_id?: number;
    entity_id?: number;
    entity_type?: 'movie' | 'place';
    rating: number;
    full_name: string,
    email: string,
    summary: string | null;
    review: string | null;
    updatedAt?: string| Date | null;
    createdAt?: string| Date;
}
