import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@zuokin-photos/frontend-tools';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SomethingIsBrokenComponent } from '@zuokin-photos/frontend-tools';


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
    path: '**',
    component: SomethingIsBrokenComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
