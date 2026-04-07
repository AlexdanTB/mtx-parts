import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderMarcas } from './slider-marcas';

describe('SliderMarcas', () => {
  let component: SliderMarcas;
  let fixture: ComponentFixture<SliderMarcas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderMarcas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderMarcas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
