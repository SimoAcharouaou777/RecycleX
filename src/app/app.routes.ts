import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./features/auth/components/login/login.component";
import {SignupComponent} from "./features/auth/components/signup/signup.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./features/home/component/home/home.component";

export const routes: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
