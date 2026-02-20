import { Component, EnvironmentInjector, inject } from '@angular/core';
 
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, logOutOutline } from 'ionicons/icons';
import {
 IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonButton,
 IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
   
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth/auth-service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
   imports: [IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonButton,
    IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
    ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private api: AuthService) {
    addIcons({ triangle, ellipse, square, logOutOutline });
  }
  ngOnInit() {}
  logout() {
    this.api.logout();
  }
  cards = [
    {
      title: 'Vacant',
      value: 10,
      actionLabel: 'View Rooms',
      color: 'linear-gradient(90deg, #4caf50, #8fc692)',
    },
    {
      title: 'Occupid',
      value: 5,
      actionLabel: 'View Rooms',
      color: 'linear-gradient(90deg, #f44336, #ee807e)',
    },
    {
      title: 'Total Pax',
      value: 50,
      actionLabel: 'View Guests',
      color: 'linear-gradient(90deg, #2196f3, #7ebef3)',
    },
    {
      title: 'Today Checkout',
      value: 3,
      actionLabel: 'View Checkouts',
      color: 'linear-gradient(90deg, #ff9800, #edb868)',
    },
    {
      title: 'Zxp Arrivals',
      value: 8,
      actionLabel: 'View Arrivals',
      color: 'linear-gradient(90deg, #9c27b0, #a668b0)',
    },
  ];

  getCardIcon(title: string): string {
    const icons: { [key: string]: string } = {
      Vacant: '🔓',
      Occupid: '🛏️',
      'Total Pax': '👥',
      'Today Checkout': '🚪',
      'Zxp Arrivals': '✈️',
    };
    return icons[title] || '📊';
  }

  // cards = [
  //   {
  //     title: 'Debit / Credit Card',
  //     value: 0,
  //     actionLabel: 'View Transactions',
  //     color: 'linear-gradient(90deg, #f5c844, #d4a10b)',
  //   },
  //   {
  //     title: 'Bank Transfer / Deposit',
  //     value: 2200,
  //     actionLabel: 'View Payment Slips',
  //     color: 'linear-gradient(90deg, #a0a8bf, #6b7388)',
  //   },
  //   {
  //     title: 'Cheques',
  //     value: 0,
  //     actionLabel: 'View Cheques',
  //     color: 'linear-gradient(90deg, #b0b0b0, #7a7a7a)',
  //   },
  // ];
}
