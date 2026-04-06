import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroInicio } from './hero-inicio';

describe('HeroInicio', () => {
  let component: HeroInicio;
  let fixture: ComponentFixture<HeroInicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroInicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroInicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
