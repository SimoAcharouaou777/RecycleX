import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRequestsListComponent } from './collection-requests-list.component';

describe('CollectionRequestsListComponent', () => {
  let component: CollectionRequestsListComponent;
  let fixture: ComponentFixture<CollectionRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionRequestsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
