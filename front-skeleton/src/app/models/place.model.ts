// Modèle pour la table des lieux
export interface Place {
    id: number;
    title: string;
    type_id: number;
    address: string | null;
    imageUrl: string | null;
    rating?: number | null;
    opening_hours: string | null;
    updatedAt?: string| Date | null;
    createdAt?: string| Date;
}
