import * as fs from "fs-extra";
import * as path from "path";

import { BrowserWindow } from "electron";

import { BaseService } from "./base.service";
import { AircraftLivery } from "./model";
import { AVAILABLE_AIRCRAFTS, AVAILABLE_AIRCRAFT_LIVERIES, DISABLE_AIRCRAFT, DISABLE_AIRCRAFT_LIVERY, ENABLE_AIRCRAFT, ENABLE_AIRCRAFT_LIVERY, INSTALLED_AIRCRAFTS, INSTALLED_AIRCRAFT_LIVERIES } from "./channels";
import { AppState } from "./app-state";

export class ModsService extends BaseService {
  public win: BrowserWindow;

  constructor(
    appState: AppState
  ) {
    super(appState);
  }

  public setup(): void {
    this._setupMessage(AVAILABLE_AIRCRAFTS, this._getAvailableAircrafts.bind(this));
    this._setupMessage(INSTALLED_AIRCRAFTS, this._getInstalledAircrafts.bind(this));
    this._setupMessage(ENABLE_AIRCRAFT, this._enableAircraft.bind(this));
    this._setupMessage(DISABLE_AIRCRAFT, this._disableAircraft.bind(this));

    this._setupMessage(AVAILABLE_AIRCRAFT_LIVERIES, this._getAvailableLiveries.bind(this));
    this._setupMessage(INSTALLED_AIRCRAFT_LIVERIES, this._getInstalledLiveries.bind(this));
    this._setupMessage(ENABLE_AIRCRAFT_LIVERY, this._enableAircraftLivery.bind(this));
    this._setupMessage(DISABLE_AIRCRAFT_LIVERY, this._disableAircraftLivery.bind(this));
  }

  private async _getAvailableAircrafts(): Promise<string[]> {
    const aircraftsFolder = this.appState.config.modsAircraftFolder;

    const aircrafts: string[] = [];

    for (let folder of await fs.readdir(aircraftsFolder)) {
      aircrafts.push(folder);
    }

    return aircrafts;
  }

  private async _getAvailableLiveries(): Promise<AircraftLivery[]> {
    const liveriesFolder = this.appState.config.modsLiveriesFolder;

    const liveries: AircraftLivery[] = [];

    let aircraftFolder: string;
    for (let aircraft of await fs.readdir(liveriesFolder)) {
      aircraftFolder = path.join(liveriesFolder, aircraft);
      for (let livery of await fs.readdir(aircraftFolder)) {
        liveries.push({ aircraft, livery });
      }
    }

    return liveries;
  }

  private async _getInstalledAircrafts(): Promise<string[]> {
    const aircraftsFolder = this.appState.config.dcsAircraftFolder;

    const aircrafts: string[] = [];

    for (let folder of await fs.readdir(aircraftsFolder)) {
      aircrafts.push(folder);
    }

    return aircrafts;
  }

  private async _getInstalledLiveries(): Promise<AircraftLivery[]> {
    const liveriesFolder = this.appState.config.dcsLiveriesFolder;

    const liveries: AircraftLivery[] = [];

    let aircraftFolder: string;
    for (let aircraft of await fs.readdir(liveriesFolder)) {
      aircraftFolder = path.join(liveriesFolder, aircraft);
      for (let livery of await fs.readdir(aircraftFolder)) {
        liveries.push({ aircraft, livery });
      }
    }

    return liveries;
  }

  private async _enableAircraft(aircraft: string): Promise<void> {
    if (!aircraft) {
      throw new Error("Aircraft name cannot be empty.");
    }

    const aircraftFolder = path.join(this.appState.config.modsAircraftFolder, aircraft);
    const symlinkFolder = path.join(this.appState.config.dcsAircraftFolder, aircraft);

    try {
      await fs.createSymlink(aircraftFolder, symlinkFolder, "dir");
    } catch (error) {
      console.error(error);
      throw new Error("Could not link the aircraft.");
    }
  }

  private async _disableAircraft(aircraft: string): Promise<void> {
    if (!aircraft) {
      throw new Error("Aircraft name cannot be empty.");
    }

    const symlinkFolder = path.join(this.appState.config.dcsAircraftFolder, aircraft);

    try {
      await fs.remove(symlinkFolder);
    } catch (error) {
      console.error(error);
      throw new Error("Could not unlink the aircraft.");
    }
  }

  private async _enableAircraftLivery(aircraft: string, livery: string): Promise<void> {
    if (!aircraft) {
      throw new Error("Aircraft name cannot be empty.");
    }

    if (!livery) {
      throw new Error("Livery name cannot be empty.");
    }

    const aircraftFolder = path.join(this.appState.config.modsLiveriesFolder, aircraft, livery);
    const symlinkFolder = path.join(this.appState.config.dcsLiveriesFolder, aircraft, livery);

    try {
      await fs.createSymlink(aircraftFolder, symlinkFolder, "dir");
    } catch (error) {
      console.error(error);
      throw new Error("Could not link the aircraft livery.");
    }
  }

  private async _disableAircraftLivery(aircraft: string, livery: string): Promise<void> {
    if (!aircraft) {
      throw new Error("Aircraft name cannot be empty.");
    }

    if (!livery) {
      throw new Error("Livery name cannot be empty.");
    }

    const symlinkFolder = path.join(this.appState.config.dcsLiveriesFolder, aircraft, livery);

    try {
      await fs.remove(symlinkFolder);
    } catch (error) {
      console.error(error);
      throw new Error("Could not unlink the aircraft livery.");
    }
  }
}
