import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
import { MyMenuComponent } from './mymenu/mymenu.component';

@NgModule({
  declarations: [ProfileComponent, LoginComponent, MyMenuComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProfileComponent, LoginComponent, MyMenuComponent],
})
export class SharedModule {}
