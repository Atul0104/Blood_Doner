import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NGODashboard } from './ngo-dashboard';

describe('NGODashboard', () => {
  let component: NGODashboard;
  let fixture: ComponentFixture<NGODashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NGODashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NGODashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
