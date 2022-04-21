import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProfileComponent],
})
export class SharedModule {}
