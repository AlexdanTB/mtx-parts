import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatGrids } from './cat-grids';

describe('CatGrids', () => {
  let component: CatGrids;
  let fixture: ComponentFixture<CatGrids>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatGrids]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatGrids);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
