import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'guard/auth.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup|undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signIn() {
    if (this.signInForm?.invalid) {
      return;
    }

    const username = this.signInForm?.value.username;
    const password = this.signInForm?.value.password;

    // Appelez votre service d'authentification pour connecter l'utilisateur
    this.authService.signIn(username, password).subscribe(response => {
      // Si la connexion réussit, redirigez l'utilisateur vers la page d'accueil par exemple
      this.router.navigate(['/']);
    }, error => {
      // Gérez les erreurs de connexion, par exemple afficher un message d'erreur à l'utilisateur
      console.error('Erreur de connexion:', error);
    });
  }
}
