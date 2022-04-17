import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { MyMenuComponent } from './mymenu/mymenu.component';

@NgModule({
  declarations: [ProfileComponent, MyMenuComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProfileComponent, MyMenuComponent],
})
export class SharedModule {}
