import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./features/auth/components/login/login.component";
import {SignupComponent} from "./features/auth/components/signup/signup.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./features/home/component/home/home.component";
import {authGuard} from "./core/guard/auth.guard";
import {DashboardComponent} from "./features/UserDashboard/dashboard/dashboard.component";
import {MyProfileComponent} from "./features/UserDashboard/my-profile/my-profile/my-profile.component";
import {
  RewardsDashboardComponent
} from "./features/UserDashboard/rewards-dashboard/rewards-dashboard/rewards-dashboard.component";
import {MyRequestsComponent} from "./features/UserDashboard/my-requests/my-requests/my-requests.component";
import {SettingsComponent} from "./features/UserDashboard/settings/settings/settings.component";
import {
  MyRequestProgressComponent
} from "./features/UserDashboard/my-request-progress/my-request-progress/my-request-progress.component";
import {
  CollectorDashboardComponent
} from "./features/CollectorDashboard/collector-dashboard/collector-dashboard.component";
import {
  CollectionRequestsListComponent
} from "./features/CollectorDashboard/collection-requests-list/collection-requests-list.component";

export const routes: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'profile', component: MyProfileComponent },
      { path: 'rewards', component: RewardsDashboardComponent },
      { path: 'my-requests', component: MyRequestsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'my-requests-progress', component: MyRequestProgressComponent},
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ],
  },
  {
    path: 'collector-dashboard',
    component:CollectorDashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['collector'] },
    children: [
      { path: 'requests', component: CollectionRequestsListComponent },
      { path: '', redirectTo: 'requests', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
