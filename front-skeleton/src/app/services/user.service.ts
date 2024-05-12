import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'models/user.model';
import { EntityService } from "./entity.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService extends EntityService<User> {

  constructor(http: HttpClient) {
    super(http, 'users');
  }

    register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // Exemple de méthode pour la connexion de l'utilisateur
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

    // Exemple de méthode pour récupérer les détails de l'utilisateur actuellement connecté
  getUserDetails(): Observable<User> {
    // Supposez que vous avez une route protégée pour récupérer les détails de l'utilisateur
    return this.http.get<User>(`${this.apiUrl}/details`);
  }

  // Exemple de méthode pour mettre à jour le profil de l'utilisateur
  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, user);
  }

  // Exemple de méthode pour modifier le mot de passe de l'utilisateur
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/password`, { oldPassword, newPassword });
  }

  // Exemple de méthode pour déconnecter l'utilisateur
  logout(): Observable<any> {
    // Vous pouvez implémenter la déconnexion côté serveur si nécessaire
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }

  // Vous pouvez ajouter des méthodes spécifiques pour les films ici si nécessaire
}


