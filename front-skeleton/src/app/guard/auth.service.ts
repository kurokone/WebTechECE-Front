import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  saveCurrentUser(email: string, full_name: string): void {
    localStorage.setItem('currentUser', JSON.stringify({ email, full_name }));
  }

  getCurrentUser(): { email: string, full_name: string } | null {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      return JSON.parse(currentUserString);
    } else {
      return null;
    }
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        // Stockez le jeton d'authentification ou tout autre identifiant de connexion approprié dans le stockage local
        localStorage.setItem('accessToken', response.accessToken);
        this.loggedIn.next(true);
      })
    );
  }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password }).pipe(
      tap(response => {
        // Traitez la réponse de l'inscription si nécessaire
      })
    );
  }

  signOut(): void {
    // Supprimez le jeton d'authentification du stockage local
    localStorage.removeItem('accessToken');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
