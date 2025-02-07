import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestProgressComponent } from './my-request-progress.component';

describe('MyRequestProgressComponent', () => {
  let component: MyRequestProgressComponent;
  let fixture: ComponentFixture<MyRequestProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRequestProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyRequestProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
