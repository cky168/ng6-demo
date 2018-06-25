import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ShareModule } from '../share/share.module';
@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule
  ],
  declarations: [LoginComponent]
})
export class UserModule { }
