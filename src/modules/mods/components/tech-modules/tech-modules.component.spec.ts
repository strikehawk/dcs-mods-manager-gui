import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechModulesComponent } from './tech-modules.component';

describe('TechModulesComponent', () => {
  let component: TechModulesComponent;
  let fixture: ComponentFixture<TechModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechModulesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
