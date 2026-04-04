import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrosPage } from './nosotros-page';

describe('NosotrosPage', () => {
  let component: NosotrosPage;
  let fixture: ComponentFixture<NosotrosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosotrosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosotrosPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
