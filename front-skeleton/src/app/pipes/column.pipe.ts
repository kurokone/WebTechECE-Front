import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'column',
  standalone: true
})
export class ColumnPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return ''; // Gérer les valeurs nulles ou vides
    if(value == 'title'){
      return 'Titre'
    }
    if(value == 'address'){
      return 'Adresse'
    }
    if(value == 'imageUrl'){
      return 'Image'
    }
    if(value == 'director'){
      return 'Auteur'
    }
    if(value == 'releaseDate'){
      return 'Publication'
    }
    if(value == 'posterUrl'){
      return 'Image'
    }
    if(value == 'openingHours'){
      return 'Heure Ouverture'
    }
    if(value == 'firstName'){
      return 'Nom'
    }
    if(value == 'lastName'){
      return 'Prénom'
    }
    if(value == 'birthdate'){
      return 'Date Naissance'
    }
    if(value == 'username'){
      return 'Pseudo'
    }
    if(value == 'password'){
      return 'Mot de Passe'
    }
    if(value == 'updatedAt'){
      return 'Modifié le'
    }
    if(value == 'createdAt'){
      return 'Créé le'
    }
    return value.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

}
