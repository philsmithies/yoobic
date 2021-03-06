import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { AvatarComponentModule } from '../../shared/avatar/avatar.module';
import { GithubComponent } from './github/github.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    AvatarComponentModule,
  ],
  declarations: [LoginPage, GithubComponent, FormComponent],
})
export class LoginPageModule {}
