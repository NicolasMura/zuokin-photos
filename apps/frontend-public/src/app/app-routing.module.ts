import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, SomethingIsBrokenComponent } from '@zuokin-photos/frontend-tools';
import {  } from '@zuokin-photos/frontend-tools';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountComponent } from './components/account/account.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: '**',
    component: SomethingIsBrokenComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      // Tell the router to use the hash instead of HTML5 pushstate.
      useHash: true,

      // For the demonstration of this polyfill, I am disabling the native
      // scroll retention and restoration behaviors of Angular 6+.
      scrollPositionRestoration: "disabled",
      anchorScrolling: "disabled",
      enableTracing: false
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
