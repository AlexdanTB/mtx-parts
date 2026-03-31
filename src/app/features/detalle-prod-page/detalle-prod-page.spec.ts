import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProdPage } from './detalle-prod-page';

describe('DetalleProdPage', () => {
  let component: DetalleProdPage;
  let fixture: ComponentFixture<DetalleProdPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleProdPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleProdPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
