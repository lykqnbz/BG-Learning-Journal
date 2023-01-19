import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomPreloadingStrategy } from '@/router/customPreloadingStrategy';
import { PipeModuleModule } from '@/pipes/pipeModule.module';

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
        path: 'charts',
        loadComponent: () => import('@/views/home/charts/charts.view').then((mod) => mod.ChartsView),
      },
      {
        path: 'pipe',
        loadComponent: () => import('@/views/home/pipe/pipe.view').then((mod) => mod.PipeView),
      },
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
  declare: [PipeModuleModule]
})
export class AppRoutingModule { }
