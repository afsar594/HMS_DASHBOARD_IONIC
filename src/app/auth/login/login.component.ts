import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

 @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
    imports:  [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton],

})
export class LoginComponent {
  constructor(private router: Router) {}

  onLogin() {
    this.router.navigate(['/tabs/tab3']);
  }
}  
