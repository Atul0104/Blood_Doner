import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDonar } from './search-donar';

describe('SearchDonar', () => {
  let component: SearchDonar;
  let fixture: ComponentFixture<SearchDonar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDonar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDonar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
