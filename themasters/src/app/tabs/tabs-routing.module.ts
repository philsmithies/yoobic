import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../pages/login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../pages/tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
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
        path: 'tab5',
        loadChildren: () =>
          import('../pages/myNotes/myNotes.module').then(
            (m) => m.FeedPageModule
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
