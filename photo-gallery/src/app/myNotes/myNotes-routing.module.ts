import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyNotesPage } from './myNotes.page';

const routes: Routes = [
  {
    path: '',
    component: MyNotesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedPageRoutingModule {}
