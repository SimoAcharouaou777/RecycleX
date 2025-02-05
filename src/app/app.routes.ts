import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./features/auth/components/login/login.component";
import {SignupComponent} from "./features/auth/components/signup/signup.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./features/home/component/home/home.component";
import {authGuard} from "./core/guard/auth.guard";
import {DashboardComponent} from "./features/UserDashboard/dashboard/dashboard.component";

export const routes: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
