import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formFields } from 'db/local';
import {  removePluralSuffix } from 'helpers/utiles';
import { FormFields } from 'models/formFields.model';
import { MovieService } from 'services/movie.service';
import { NotificationService } from 'services/notification.service';
import { PlaceService } from 'services/place.service';
import { ReviewService } from 'services/review.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrl: './add-edit-form.component.scss'
})
export class AddEditFormComponent implements OnInit {
  @Input() entityName: keyof FormFields = "users";
  @Input() title?: string;
  @Input() model?: any;
  @Input() entity?: any;
  @Output() closeModal = new EventEmitter<any>();
  @ViewChild('formModal') formModal?: ElementRef;
  modal?: any
  inputs: string[] = []
  selectedFiles: any = {}
  currentValue: string = "2";
  isSubmitting: boolean = false
  messageError = ""

  form?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private placeService: PlaceService,
    private userService: UserService,
    private reviewService: ReviewService,
    private notificationService: NotificationService,
  ) {

  }
  ngOnInit(): void {
    this.showModal();

    const notAllowed = ["id", 'createdAt', "updatedAt", 'entityId', 'entityType'];
    this.inputs = formFields[this.entityName as string]
    console.log(this.inputs);


    const defaultValue: any = {};
    this.inputs.forEach((key) => {
      if (this.inputType(key) === 'file') {
        defaultValue[key] = ['']; // Ne pas initialiser avec une valeur par défaut pour le champ de fichier
      } else {
        defaultValue[key] = [this.entity ? this.entity[key] : '', Validators.required];
      }
      // if (key.toLocaleLowerCase() === 'email') {
      //   defaultValue[key].push(Validators.email)
      // }
    });
    this.form = this.fb.group(defaultValue);
    console.log({ entityName: this.entityName, entity: this.entity, model: this.model });

  }

  onFileSelected(event: any) {
    const { name } = event.target
    const file: File = event.target.files[0];
    this.selectedFiles = { ...this.selectedFiles, [name]: file }
  }

  inputType(name: string): string {
    const lowerCaseName = name.toLowerCase();

    if (["synopsis", "content", 'opening_hours', 'review'].includes(lowerCaseName)) {
      return 'text';
    } else if (['image', 'posterurl', 'imageurl'].includes(lowerCaseName)) {
      return 'file';
    } else if (lowerCaseName.includes('date')) {
      return 'date';
    } else if (lowerCaseName.includes('email')) {
      return 'email';
    } else if (lowerCaseName.includes('password')) {
      return 'password';
    } else if (lowerCaseName.includes('rating')) {
      return 'range';
    } else {
      return 'input';
    }
  }

  updateValue(value: any) {
    this.currentValue = value.toString();
  }

  getCurrentValue(): number {
    return parseInt(this.currentValue, 10); // Convertit currentValue en nombre avec base 10
  }
  showModal(): void {
    this.modal = new (window as any).bootstrap.Modal(document.getElementById('formModal'), { backdrop: 'static'});
    this.modal.show(); // Afficher le modal
  }

  async onSubmit(): Promise<void> {
    this.isSubmitting = true
    if (this.form?.valid) {
      console.log(this.form.value);
      const data: any = { ...this.form.value, ...this.selectedFiles };
      let formData: any = new FormData()


      for (const key in data) {
        if (data[key] instanceof File) {
          const file: File = data[key];
          formData.append(key, file)
          delete data[key]
        }
      }

      let service: any = this.getService()

      if (this.entity && this.entity.id) {
        // update
        data.id = this.entity.id;
        for (const key in data) {
          if (this.inputType(key) === "file") {
            if (!(data[key] instanceof File)) {
              data[key] = this.entity[key]
            }
          }
        }
        data.updatedAt = new Date()
        formData.append(removePluralSuffix(this.entityName as string), new Blob([JSON.stringify(data)], { type: 'application/json' }))

        service.updateEntity(data.id, formData).subscribe(
          (data: any) => {
            // console.log(data);
            this.notificationService.addNotification(`Données modifiée avec success !`)
            this.closeModal.emit({
              type: "UPDATE",
              entity: data
            });
          },
          (error: any) => {
            console.log({ error });
          })

      } else {
        // add
        data.createdAt = new Date()
        formData.append(removePluralSuffix(this.entityName as string), new Blob([JSON.stringify(data)], { type: 'application/json' }))

        service.addEntity(formData).subscribe(
          (data: any) => {
            this.notificationService.addNotification(`Données ajoutée avec success !`)

            this.closeModal.emit({
              type: "ADD",
              entity: data
            });
          },
          (error: any) => {
            this.messageError = error.message
            setTimeout(() => {
              this.messageError = ""
            }, 5000)
          }
        )


      }



      this.modal.hide();
      this.isSubmitting = false
    }
  }

  onCancel(): void {
    this.closeModal.emit(null);
    this.modal.hide();
  }

  getService() {
    if (this.entityName === "review") {
      return this.reviewService
    } else if (this.entityName === "places") {
      return this.placeService
    } else if (this.entityName === "users") {
      return this.userService
    } else if (this.entityName === "movies") {
      return this.movieService
    }
    return null
  }

  shouldShowError(name: string): boolean {
    const control = this.form?.get(name);
    return !!(control && control.errors && (control.dirty || control.touched || this.isSubmitting));
  }

  isRequiredError(name: string): boolean {
    return this.form?.get(name)?.errors?.['required'];
  }

  isEmailError(name: string): boolean {
    return this.form?.get(name)?.errors?.['email'];
  }
}
