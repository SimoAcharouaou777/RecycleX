import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorDashboardComponent } from './collector-dashboard.component';

describe('CollectorDashboardComponent', () => {
  let component: CollectorDashboardComponent;
  let fixture: ComponentFixture<CollectorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectorDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
