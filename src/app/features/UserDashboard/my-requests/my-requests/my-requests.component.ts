import { Component } from '@angular/core';
import {SidebarComponent} from "../../../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.css'
})
export class MyRequestsComponent {

}
