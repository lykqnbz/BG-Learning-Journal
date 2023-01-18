import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomPreloadingStrategy } from '@/router/customPreloadingStrategy';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/views/welcome/welcome.view').then((mod) => mod.WelcomeView),
  },
  {
    path: 'home',
    loadComponent: () => import('@/views/home/home.view').then((mod) => mod.HomeView),
    children: [
      {
        path: 'list',
        loadComponent: () => import('@/views/home/list/list.view').then((mod) => mod.ListView),
      },
      {
        path: 'person',
        loadComponent: () => import('@/views/home/person/person.view').then((mod) => mod.PersonView),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('@/views/login/login.view').then((mod) => mod.LoginView),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
