import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareNow } from './share-now';

describe('ShareNow', () => {
  let component: ShareNow;
  let fixture: ComponentFixture<ShareNow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareNow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareNow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
