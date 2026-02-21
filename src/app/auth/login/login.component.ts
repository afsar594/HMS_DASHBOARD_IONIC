import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
 import { AuthService } from '../auth-service';
import { 
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton, IonSpinner } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
 @Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
    imports: [IonSpinner, 
      IonContent,
   IonCard,
   IonCardHeader,
   IonCardContent,
   IonItem,
   IonInput,
       CommonModule,   // ✅ MUST

   IonButton,ReactiveFormsModule],
 })
export class LoginComponent { 
  loginForm:any;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.authService.login(payload).subscribe({
      next: (res) => {
        if (res.accessToken) {
          // ✅ Save tokens
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('expiry', res.expiry);
          localStorage.setItem('userInfo', JSON.stringify(res.hmsUser));

          // Remember Me
          if (this.loginForm.value.rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          }

          // Navigate to dashboard/tab
          this.router.navigate(['/tabs/tab3']);
        } else {
          this.showError('Invalid login response');
        }
      },
      error: (err) => {
        this.showError(err?.error?.message || 'Login failed');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  private showError(message: string) {
    this.loading = false;
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 3000;
    toast.color = 'danger';
      toast.position = 'top';
    document.body.appendChild(toast);
    toast.present();
  }
}