import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftKneeboardsComponent } from './aircraft-kneeboards.component';

describe('AircraftKneeboardsComponent', () => {
  let component: AircraftKneeboardsComponent;
  let fixture: ComponentFixture<AircraftKneeboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AircraftKneeboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftKneeboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
