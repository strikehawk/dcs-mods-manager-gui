import { Injectable } from '@angular/core';
import { AircraftLivery } from '../../../../electron/src/model';
import { ElectronService } from '../../core/services/electron.service';

import {
  AVAILABLE_AIRCRAFTS, AVAILABLE_AIRCRAFT_LIVERIES, DISABLE_AIRCRAFT, DISABLE_AIRCRAFT_LIVERY, ENABLE_AIRCRAFT, ENABLE_AIRCRAFT_LIVERY,
  INSTALLED_AIRCRAFTS, INSTALLED_AIRCRAFT_LIVERIES
} from '../../../../electron/src/channels';

@Injectable({
  providedIn: 'root'
})
export class ModsService {

  constructor(
    private electronService: ElectronService
  ) { }

  public async getAvailableAircrafts(): Promise<string[]> {
    return this.electronService.getData(AVAILABLE_AIRCRAFTS);
  }

  public async getInstalledAircrafts(): Promise<string[]> {
    return this.electronService.getData(INSTALLED_AIRCRAFTS);
  }

  public async getAvailableLiveries(): Promise<AircraftLivery[]> {
    return this.electronService.getData(AVAILABLE_AIRCRAFT_LIVERIES);
  }

  public async getInstalledLiveries(): Promise<AircraftLivery[]> {
    return this.electronService.getData(INSTALLED_AIRCRAFT_LIVERIES);
  }

  public async enableAircraft(aircraft: string): Promise<void> {
    return this.electronService.getData(ENABLE_AIRCRAFT, aircraft);
  }

  public async disableAircraft(aircraft: string): Promise<void> {
    return this.electronService.getData(DISABLE_AIRCRAFT, aircraft);
  }

  public async enableAircraftLivery(aircraft: string, livery: string): Promise<void> {
    return this.electronService.getData(ENABLE_AIRCRAFT_LIVERY, aircraft, livery);
  }

  public async disableAircraftLivery(aircraft: string, livery: string): Promise<void> {
    return this.electronService.getData(DISABLE_AIRCRAFT_LIVERY, aircraft, livery);
  }
}
