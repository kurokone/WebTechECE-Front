import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EntityService } from "./entity.service";
import { Place } from "../models/place.model";

@Injectable({
  providedIn: 'root'
})
export class PlaceService extends EntityService<Place> {

  constructor(http: HttpClient) {
    super(http, 'places');
  }

  // Vous pouvez ajouter des méthodes spécifiques pour les films ici si nécessaire
}
