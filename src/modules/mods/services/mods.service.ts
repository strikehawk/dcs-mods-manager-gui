import { Injectable } from '@angular/core';
import { AircraftLivery } from '../../../../electron/src/model';
import { ElectronService } from '../../core/services/electron.service';

import {
  AVAILABLE_AIRCRAFTS, AVAILABLE_AIRCRAFT_LIVERIES, AVAILABLE_TECH_MODULES, AVAILABLE_AIRCRAFT_KNEEBOARDS,
  DISABLE_AIRCRAFT, DISABLE_AIRCRAFT_LIVERY, DISABLE_TECH_MODULE, DISABLE_AIRCRAFT_KNEEBOARDS,
  ENABLE_AIRCRAFT, ENABLE_AIRCRAFT_LIVERY, ENABLE_TECH_MODULE, ENABLE_AIRCRAFT_KNEEBOARDS,
  INSTALLED_AIRCRAFTS, INSTALLED_AIRCRAFT_LIVERIES, INSTALLED_TECH_MODULES, INSTALLED_AIRCRAFT_KNEEBOARDS
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

  public async enableAircraft(aircraft: string): Promise<void> {
    return this.electronService.getData(ENABLE_AIRCRAFT, aircraft);
  }

  public async disableAircraft(aircraft: string): Promise<void> {
    return this.electronService.getData(DISABLE_AIRCRAFT, aircraft);
  }


  public async getAvailableLiveries(): Promise<AircraftLivery[]> {
    return this.electronService.getData(AVAILABLE_AIRCRAFT_LIVERIES);
  }

  public async getInstalledLiveries(): Promise<AircraftLivery[]> {
    return this.electronService.getData(INSTALLED_AIRCRAFT_LIVERIES);
  }

  public async enableAircraftLivery(aircraft: string, livery: string): Promise<void> {
    return this.electronService.getData(ENABLE_AIRCRAFT_LIVERY, aircraft, livery);
  }

  public async disableAircraftLivery(aircraft: string, livery: string): Promise<void> {
    return this.electronService.getData(DISABLE_AIRCRAFT_LIVERY, aircraft, livery);
  }

  public async getAvailableTechModules(): Promise<string[]> {
    return this.electronService.getData(AVAILABLE_TECH_MODULES);
  }

  public async getInstalledTechModules(): Promise<string[]> {
    return this.electronService.getData(INSTALLED_TECH_MODULES);
  }

  public async enableTechModule(module: string): Promise<void> {
    return this.electronService.getData(ENABLE_TECH_MODULE, module);
  }

  public async disableTechModule(module: string): Promise<void> {
    return this.electronService.getData(DISABLE_TECH_MODULE, module);
  }


  public async getAvailableAircraftKneeboards(): Promise<string[]> {
    return this.electronService.getData(AVAILABLE_AIRCRAFT_KNEEBOARDS);
  }

  public async getInstalledAircraftKneeboards(): Promise<string[]> {
    return this.electronService.getData(INSTALLED_AIRCRAFT_KNEEBOARDS);
  }

  public async enableAircraftKneeboards(aircraft: string): Promise<void> {
    return this.electronService.getData(ENABLE_AIRCRAFT_KNEEBOARDS, aircraft);
  }

  public async disableAircraftKneeboards(aircraft: string): Promise<void> {
    return this.electronService.getData(DISABLE_AIRCRAFT_KNEEBOARDS, aircraft);
  }
}
