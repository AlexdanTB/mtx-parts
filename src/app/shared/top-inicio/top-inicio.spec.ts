import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInicio } from './top-inicio';

describe('TopInicio', () => {
  let component: TopInicio;
  let fixture: ComponentFixture<TopInicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopInicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopInicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
