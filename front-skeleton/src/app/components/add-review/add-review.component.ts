import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importer FormBuilder et FormGroup
import { AuthService } from 'guard/auth.service';
import { NotificationService } from 'services/notification.service';
import { ReviewService } from 'services/review.service';

@Component({
  selector: 'add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent {

  @Input() entityName?: string
  @Input() entity: any
  @Output() closeModal = new EventEmitter<any>();

  reviewForm?: FormGroup; // Déclarer une variable pour le formulaire
  modal: any
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
     private reviewService: ReviewService,
     private notificationService: NotificationService,
     private authService: AuthService,
    ){} // Injecter FormBuilder dans le constructeur

  ngOnInit(): void {
    this.initForm(); // Initialiser le formulaire
    this.showModal();
  }

  initForm(): void {
    this.reviewForm = this.fb.group({ // Utiliser FormBuilder pour créer le formulaire
      full_name: ['', Validators.required], // Champ obligatoire
      email: ['', [Validators.required, Validators.email]], // Champ obligatoire et format email
      summary: '',
      review: '',
      rating: [5, Validators.required] // Valeur par défaut 5, champ obligatoire
    });
  }

  showModal(): void {
    this.modal = new (window as any).bootstrap.Modal(document.getElementById('addReviewFormModal'), {backdrop: 'static'});
    this.modal.show(); // Afficher le modal
  }

  onCancel(): void {
    this.closeModal.emit(null)
    this.modal.hide()
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.reviewForm?.valid) { // Vérifier si le formulaire est valide
      const reviewData = this.reviewForm.value; // Obtenir les données du formulaire
      reviewData.createdAt = new Date()
      reviewData.entityType = this.entityName
      reviewData.entityId = this.entity.id

      console.log({reviewData});



      this.reviewService.addEntity({ review: reviewData }).subscribe(
        (data: any)=>{
          console.log(data);
          this.notificationService.addNotification("Avis laissé avec succès !")
          this.closeModal.emit({type:'REVIEW', entity:this.entity })
          this.modal.hide()

          this.authService.saveCurrentUser(reviewData.email, reviewData.full_name)

          
          this.notificationService.addNotification("Erreur serveur, merci de réessayer plus tard !")
          this.modal.hide()
        },
      )
    } else {
      // Afficher des messages d'erreur appropriés si le formulaire est invalide
    }
  }
}
