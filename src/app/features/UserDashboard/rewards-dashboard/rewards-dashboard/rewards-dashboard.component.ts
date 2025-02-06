import { Component } from '@angular/core';
import {SidebarComponent} from "../../../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-rewards-dashboard',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './rewards-dashboard.component.html',
  styleUrl: './rewards-dashboard.component.css'
})
export class RewardsDashboardComponent {

}
