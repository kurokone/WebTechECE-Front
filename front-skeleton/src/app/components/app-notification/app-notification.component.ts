import { Component } from '@angular/core';
import { NotificationService } from 'services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './app-notification.component.html',
  styleUrls: ['./app-notification.component.scss']
})
export class AppNotificationComponent {
  notifications: any[] = [];
  audio: HTMLAudioElement = new Audio('/assets/audios/success.mp3');

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    // S'abonner aux notifications
    this.notificationService.notificationsSubject.subscribe((notification: any[]) => {
      if(notification.length){
        this.notifications.push(...notification);
        // Jouer l'effet sonore
        this.playNotificationSound();
        setTimeout(() => this.notifications = [], 2000);
      }
    });
  }

  removeNotification(notification: any): void {
    const index = this.notifications.indexOf(notification);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  playNotificationSound(): void {
    // Vérifier si l'audio est chargé avant de le jouer pour éviter les erreurs
    if (this.audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      this.audio.play();
    } else {
      // Si l'audio n'est pas chargé, attendre qu'il le soit avant de le jouer
      this.audio.addEventListener('canplaythrough', () => {
        this.audio.play();
      });
    }
  }
}
