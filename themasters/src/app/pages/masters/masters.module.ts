import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MastersPage } from './masters.page';

import { MastersPageRoutingModule } from './masters-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MastersPage }]),
    MastersPageRoutingModule,
  ],
  declarations: [MastersPage],
})
export class MastersPageModule {}
