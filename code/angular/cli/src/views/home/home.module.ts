import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpInterceptorService } from './http/http-interceptor';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('@views/home/home.view').then((mod) => mod.HomeView),
    children: [
      {
        path: 'pipe',
        loadComponent: () => import('@views/home/pipe/pipe.view').then((mod) => mod.PipeView),
      },
      {
        path: 'http',
        loadComponent: () => import('@views/home/http/http.service').then((mod) => mod.HttpService),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
})
export class HomeModule { }
