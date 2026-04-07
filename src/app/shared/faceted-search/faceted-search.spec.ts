import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetedSearch } from './faceted-search';

describe('FacetedSearch', () => {
  let component: FacetedSearch;
  let fixture: ComponentFixture<FacetedSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacetedSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacetedSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
