import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GETINVOLVED } from './get-involved';

describe('GETINVOLVED', () => {
  let component: GETINVOLVED;
  let fixture: ComponentFixture<GETINVOLVED>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GETINVOLVED]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GETINVOLVED);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
