import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinVolunteer } from './join-volunteer';

describe('JoinVolunteer', () => {
  let component: JoinVolunteer;
  let fixture: ComponentFixture<JoinVolunteer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinVolunteer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinVolunteer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
