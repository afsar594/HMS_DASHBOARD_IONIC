import { Routes } from '@angular/router';
 
export const routes: Routes = [
 {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // Auth module
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-module').then(m => m.AuthModule)
  },

  // Tabs module
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.routes').then(m => m.routes)
  },

  // Wildcard - catch all undefined routes
  {
    path: '**',
    redirectTo: 'auth/login'
  }

];
