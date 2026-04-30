import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CONTACT } from './contact';

describe('CONTACT', () => {
  let component: CONTACT;
  let fixture: ComponentFixture<CONTACT>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CONTACT]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CONTACT);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
