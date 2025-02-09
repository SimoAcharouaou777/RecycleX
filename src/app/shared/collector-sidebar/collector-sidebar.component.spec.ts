import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorSidebarComponent } from './collector-sidebar.component';

describe('CollectorSidebarComponent', () => {
  let component: CollectorSidebarComponent;
  let fixture: ComponentFixture<CollectorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectorSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
