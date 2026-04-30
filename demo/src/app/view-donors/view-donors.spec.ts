import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDonors } from './view-donors';

describe('ViewDonors', () => {
  let component: ViewDonors;
  let fixture: ComponentFixture<ViewDonors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDonors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDonors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
