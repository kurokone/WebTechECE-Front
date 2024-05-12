import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EntityService } from "./entity.service";
import { Review } from "../models/review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends EntityService<Review> {

  constructor(http: HttpClient) {
    super(http, 'reviews');
  }

  getReviewByEntity(entityName: string, entityId: string){
    return this.http.get(`${this.apiUrl}/by/entity/${entityName}/${entityId}`);
  }
  getReviewStatistics(){
    return this.http.get(`${this.apiUrl}/statistics`);
  }

  // Vous pouvez ajouter des méthodes spécifiques pour les films ici si nécessaire
}
