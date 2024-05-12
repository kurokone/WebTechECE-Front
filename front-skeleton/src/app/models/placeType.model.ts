// Modèle pour la table des types de lieu
export interface PlaceType {
    id: number;
    name: string;
    updatedAt?: string| Date | null;
    createdAt?: string| Date;
}
