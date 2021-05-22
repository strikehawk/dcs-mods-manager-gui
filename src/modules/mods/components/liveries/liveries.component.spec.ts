import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveriesComponent } from './liveries.component';

describe('LiveriesComponent', () => {
  let component: LiveriesComponent;
  let fixture: ComponentFixture<LiveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
