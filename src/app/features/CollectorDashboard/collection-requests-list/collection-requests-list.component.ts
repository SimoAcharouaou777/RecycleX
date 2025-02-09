import {Component, OnInit} from '@angular/core';
import {
  CollectionRequest,
  CollectionRequestService
} from "../../../shared/services/collectorService/collection-request.service";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Request} from "../../collection/store/request.model";

@Component({
  selector: 'app-collection-requests-list',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    DatePipe
  ],
  templateUrl: './collection-requests-list.component.html',
  styleUrl: './collection-requests-list.component.css'
})
export class CollectionRequestsListComponent implements OnInit{
  requests: Request[] = [];

  ngOnInit(): void {
    this.requests = JSON.parse(localStorage.getItem('progressRequests') || '[]');
  }

  occupyRequest(req: Request): void {
    req.status = 'Occupied';
    this.updateRequestStatus(req);
  }

  startCollection(req: Request): void {
    req.status = 'In Progress';
    this.updateRequestStatus(req);
  }

  validateRequest(req: Request): void {
    req.status = 'Validated';
    this.updateRequestStatus(req);
  }
  rejectRequest(req: Request): void {
    req.status = 'Rejected';
    this.updateRequestStatus(req);
  }

  updateRequestStatus(req: Request): void {
    const allRequests = JSON.parse(localStorage.getItem('progressRequests') || '[]');
    const updatedRequests = allRequests.map((r: Request) =>
    r.address === req.address && r.userEmail === req.userEmail ? req : r
    );
    localStorage.setItem('progressRequests', JSON.stringify(updatedRequests));
  }

  getWasteTypesString(req: Request): string {
    return req.wastes.map(w => w.type).join(', ');
  }

  getTotalWeight(wastes: { type: string; weight: number }[]): number {
    return (wastes ?? []).reduce((total, waste) => total + waste.weight, 0);
  }

}
