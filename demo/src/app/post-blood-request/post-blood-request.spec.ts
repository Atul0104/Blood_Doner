import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBloodRequest } from './post-blood-request';

describe('PostBloodRequest', () => {
  let component: PostBloodRequest;
  let fixture: ComponentFixture<PostBloodRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostBloodRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostBloodRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
