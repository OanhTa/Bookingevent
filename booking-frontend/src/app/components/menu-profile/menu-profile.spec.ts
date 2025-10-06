import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProfile } from './menu-profile';

describe('MenuProfile', () => {
  let component: MenuProfile;
  let fixture: ComponentFixture<MenuProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
