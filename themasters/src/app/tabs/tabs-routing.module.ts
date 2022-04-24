import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'masters',
        loadChildren: () =>
          import('../pages/masters/masters.module').then(
            (m) => m.MastersPageModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('../pages/account/account.module').then(
            (m) => m.AccountPageModule
          ),
      },
      {
        path: 'myNotes',
        loadChildren: () =>
          import('../pages/myNotes/myNotes.module').then(
            (m) => m.NotesPageModule
          ),
      },
      {
        path: 'details',
        loadChildren: () =>
          import('../pages/details/details.module').then(
            (m) => m.DetailsPageModule
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('../pages/chat/chat.module').then((m) => m.ChatPageModule),
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
