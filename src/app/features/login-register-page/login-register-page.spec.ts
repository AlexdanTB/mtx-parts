import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterPage } from './login-register-page';

describe('LoginRegisterPage', () => {
  let component: LoginRegisterPage;
  let fixture: ComponentFixture<LoginRegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegisterPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
