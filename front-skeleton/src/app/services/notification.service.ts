import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  addNotification(message: string) {
    const newNotification = { message };
    const updatedNotifications = [...this.notificationsSubject.getValue(), newNotification];
    this.notificationsSubject.next(updatedNotifications);
    setTimeout(() => this.notificationsSubject.next([]), 2000); // Supprime automatiquement la notification après 5 secondes
  }

}
