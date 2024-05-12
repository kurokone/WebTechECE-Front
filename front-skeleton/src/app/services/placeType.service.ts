import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EntityService } from "./entity.service";
import { PlaceType } from "../models/placeType.model";

@Injectable({
  providedIn: 'root'
})
export class PlaceTypeService extends EntityService<PlaceType> {

  constructor(http: HttpClient) {
    super(http, 'placeTypes');
  }

  // Vous pouvez ajouter des méthodes spécifiques pour les films ici si nécessaire
}
