import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MovieService } from 'services/movie.service';
import { NotificationService } from 'services/notification.service';
import { PlaceService } from 'services/place.service';
import { ReviewService } from 'services/review.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent implements OnInit {

  @Input() entity: any;
  @Input() model: any;
  @Input() entityName?: string;
  @Output() closeModal = new EventEmitter<any>();
  @ViewChild('confirmModal') confirmModal?: ElementRef;
  modal?: any
  name: string = ''

  constructor(
    private movieService: MovieService,
    private placeService: PlaceService,
    private userService: UserService,
    private reviewService: ReviewService,
    private notificationService: NotificationService,
  ) {

  }

  ngOnInit(): void {
    this.showModal()
    console.log(this.entity);
    if (this.entityName === "users") {
      this.name = this.entity.firstName + " " + this.entity.lastName
    } else {
      this.name = this.entity?.title || this.entity?.name
    }
  }

  showModal(): void {
    this.modal = new (window as any).bootstrap.Modal(document.getElementById('confirmModal'), { backdrop: 'static'});
    this.modal.show(); // Afficher le modal
  }


  confirmDeletion() {

    let service: any;

    if (this.entityName === "review") {
      service = this.reviewService
    } else if (this.entityName === "places") {
      service = this.placeService
    } else if (this.entityName === "users") {
      service = this.userService
    } else if (this.entityName === "movies") {
      service = this.movieService
    }

    service.deleteEntity(this.entity.id!).subscribe(
      (deletedData: any)=>{
        console.log({deletedData});

      }
    )
    this.modal.hide();

    this.notificationService.addNotification(`Données supprimée avec success !`)
    this.closeModal.emit({
      type: 'DELETE',
      id: this.entity.id
    })
  }

  cancelDeletion() {
    this.modal.hide();
    this.closeModal.emit(null)
  }

}
