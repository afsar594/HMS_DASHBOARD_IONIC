import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { TabsPage } from '../tabs/tabs.page';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, TabsPage],
})
export class AuthModule {}
