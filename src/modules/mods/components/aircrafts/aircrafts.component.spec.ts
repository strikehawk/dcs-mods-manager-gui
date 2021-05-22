import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftsComponent } from './aircrafts.component';

describe('AircraftsComponent', () => {
  let component: AircraftsComponent;
  let fixture: ComponentFixture<AircraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AircraftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
