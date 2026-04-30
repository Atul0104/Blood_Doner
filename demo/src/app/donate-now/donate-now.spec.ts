import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateNow } from './donate-now';

describe('DonateNow', () => {
  let component: DonateNow;
  let fixture: ComponentFixture<DonateNow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonateNow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateNow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
