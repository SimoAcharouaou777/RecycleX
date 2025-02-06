import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsDashboardComponent } from './rewards-dashboard.component';

describe('RewardsDashboardComponent', () => {
  let component: RewardsDashboardComponent;
  let fixture: ComponentFixture<RewardsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RewardsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
