import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Donationday } from './donationday';

describe('Donationday', () => {
  let component: Donationday;
  let fixture: ComponentFixture<Donationday>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Donationday]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Donationday);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
