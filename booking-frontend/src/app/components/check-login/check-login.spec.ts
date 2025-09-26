import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLogin } from './check-login';

describe('CheckLogin', () => {
  let component: CheckLogin;
  let fixture: ComponentFixture<CheckLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
