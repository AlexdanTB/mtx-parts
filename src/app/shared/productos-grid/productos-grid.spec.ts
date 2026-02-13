import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosGrid } from './productos-grid';

describe('ProductosGrid', () => {
  let component: ProductosGrid;
  let fixture: ComponentFixture<ProductosGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
