import { Injectable } from '@angular/core';

export interface CollectionRequest {
  id: string;
  userEmail: string;
  details: string;
  status: 'Pending' | 'Occupied' | 'In Progress' | 'Validated' | 'Rejected';
}

@Injectable({
  providedIn: 'root'
})
export class CollectionRequestService {
  private localStorageKey = 'progressRequests';

  getRequests(): CollectionRequest[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }

  updateRequestStatus(requestId: string, newStatus: CollectionRequest['status']): void {
    const requests = this.getRequests();
    const request = requests.find(r => r.id === requestId);
    if(request) {
      request.status = newStatus;
      localStorage.setItem(this.localStorageKey, JSON.stringify(requests));
    }
  }

  constructor() { }
}
