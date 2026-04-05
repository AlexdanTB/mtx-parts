import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselNosotros } from './carousel-nosotros';

describe('CarouselNosotros', () => {
  let component: CarouselNosotros;
  let fixture: ComponentFixture<CarouselNosotros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselNosotros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselNosotros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
