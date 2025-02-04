import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsDisplayComponent } from './points-display.component';

describe('PointsDisplayComponent', () => {
  let component: PointsDisplayComponent;
  let fixture: ComponentFixture<PointsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
