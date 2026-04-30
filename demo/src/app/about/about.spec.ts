import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABOUT } from './about';

describe('ABOUT', () => {
  let component: ABOUT;
  let fixture: ComponentFixture<ABOUT>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ABOUT]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ABOUT);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
