import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes =[
{
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsPage, 
    children: [
     
      {
        path: 'shoop-list',
        loadComponent: () => import('./shopping-list/shopping-list.page').then((m) => m.ShoppingListPage),
      },
      {
        path: 'elements-list',
        loadComponent: () => import('./elements-list/elements-list.page').then((m) => m.ElementsListPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/elements-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'elements-list',
    loadComponent: () => import('./elements-list/elements-list.page').then( m => m.ElementsListPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'new-element-modal',
    loadComponent: () => import('./new-element-modal/new-element-modal.page').then( m => m.NewElementModalPage)
  },
];