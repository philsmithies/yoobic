import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersPage } from './masters.page';

const routes: Routes = [
  {
    path: '',
    component: MastersPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MastersPageRoutingModule {}
