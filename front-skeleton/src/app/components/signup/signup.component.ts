import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'guard/auth.service';


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm?: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
   
    const password = formGroup?.get('password')?.value;
    const confirmPassword = formGroup?.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  signUp() {
    if (!this.signupForm || this.signupForm.invalid) {
      return;
    }

    const username = this.signupForm.value.username;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.authService?.register(username, email, password).subscribe(response => {
      // Traitez la réponse de l'inscription, par exemple redirigez l'utilisateur vers une page de confirmation
    }, error => {
      // Gérez les erreurs de l'inscription, par exemple affichez un message d'erreur à l'utilisateur
      console.error('Erreur d\'inscription:', error);
    });
  }
}