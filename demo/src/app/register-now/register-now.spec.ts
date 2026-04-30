import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNow } from './register-now';

describe('RegisterNow', () => {
  let component: RegisterNow;
  let fixture: ComponentFixture<RegisterNow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterNow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
