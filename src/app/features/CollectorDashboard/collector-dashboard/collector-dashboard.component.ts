import { Component } from '@angular/core';
import {CollectorSidebarComponent} from "../../../shared/collector-sidebar/collector-sidebar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-collector-dashboard',
  standalone: true,
  imports: [
    CollectorSidebarComponent,
    RouterOutlet
  ],
  templateUrl: './collector-dashboard.component.html',
  styleUrl: './collector-dashboard.component.css'
})
export class CollectorDashboardComponent {

}
