import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomPreloadingStrategy } from '@/router/customPreloadingStrategy';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/views/welcome/welcome.component').then((mod) => mod.WelcomeComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('@/views/home/home.component').then((mod) => mod.HomeComponent),
    children: [
      {
        path: 'list',
        loadComponent: () => import('@/views/list/list.component').then((mod) => mod.ListComponent),
      },
      {
        path: 'person',
        loadComponent: () => import('@/views/person/person.component').then((mod) => mod.PersonComponent),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('@/components/login/login.component').then((mod) => mod.LoginComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
