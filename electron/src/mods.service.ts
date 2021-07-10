import * as fs from "fs-extra";
import * as path from "path";

import { BrowserWindow } from "electron";

import { BaseService } from "./base.service";
import { AircraftLivery } from "./model";
import { AVAILABLE_AIRCRAFTS, AVAILABLE_AIRCRAFT_LIVERIES, AVAILABLE_TECH_MODULES, DISABLE_AIRCRAFT, DISABLE_AIRCRAFT_LIVERY, DISABLE_TECH_MODULE, ENABLE_AIRCRAFT, ENABLE_AIRCRAFT_LIVERY, ENABLE_TECH_MODULE, INSTALLED_AIRCRAFTS, INSTALLED_AIRCRAFT_LIVERIES, INSTALLED_TECH_MODULES } from "./channels";
import { AppState } from "./app-state";
import { utils } from "mocha";

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

    this._setupMessage(AVAILABLE_TECH_MODULES, this._getAvailableTechModules.bind(this));
    this._setupMessage(INSTALLED_TECH_MODULES, this._getInstalledTechModules.bind(this));
    this._setupMessage(ENABLE_TECH_MODULE, this._enableTechModule.bind(this));
    this._setupMessage(DISABLE_TECH_MODULE, this._disableTechModule.bind(this));
  }

  private async _getAvailableAircrafts(): Promise<string[]> {
    const aircraftsFolder = this.appState.config.modsAircraftFolder;

    const aircrafts: string[] = [];

    let aircraftFolder: string;
    let itemFsStats: fs.Stats;
    for (let folder of await fs.readdir(aircraftsFolder)) {
      aircraftFolder = path.join(aircraftsFolder, folder);
      itemFsStats = fs.lstatSync(aircraftFolder);
      if (!itemFsStats.isDirectory() && !itemFsStats.isSymbolicLink()) {
        continue;
      }

      aircrafts.push(folder);
    }

    return aircrafts;
  }

  private async _getInstalledAircrafts(): Promise<string[]> {
    const aircraftsFolder = this.appState.config.dcsAircraftFolder;

    const aircrafts: string[] = [];

    let aircraftFolder: string;
    let itemFsStats: fs.Stats;
    for (let folder of await fs.readdir(aircraftsFolder)) {
      aircraftFolder = path.join(aircraftsFolder, folder);
      itemFsStats = fs.lstatSync(aircraftFolder);
      if (!itemFsStats.isDirectory() && !itemFsStats.isSymbolicLink()) {
        continue;
      }

      aircrafts.push(folder);
    }

    return aircrafts;
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

  private async _getAvailableLiveries(): Promise<AircraftLivery[]> {
    const liveriesFolder = this.appState.config.modsLiveriesFolder;

    const liveries: AircraftLivery[] = [];

    let aircraftFolder: string;
    let itemFsStats: fs.Stats;
    for (let aircraft of await fs.readdir(liveriesFolder)) {
      aircraftFolder = path.join(liveriesFolder, aircraft);
      itemFsStats = fs.lstatSync(aircraftFolder);
      if (!itemFsStats.isDirectory() && !itemFsStats.isSymbolicLink()) {
        continue;
      }

      for (let livery of await fs.readdir(aircraftFolder)) {
        liveries.push({ aircraft, livery });
      }
    }

    return liveries;
  }

  private async _getInstalledLiveries(): Promise<AircraftLivery[]> {
    const liveriesFolder = this.appState.config.dcsLiveriesFolder;

    const liveries: AircraftLivery[] = [];

    let aircraftFolder: string;
    let itemFsStats: fs.Stats;
    for (let aircraft of await fs.readdir(liveriesFolder)) {
      aircraftFolder = path.join(liveriesFolder, aircraft);
      itemFsStats = fs.lstatSync(aircraftFolder);
      if (!itemFsStats.isDirectory() && !itemFsStats.isSymbolicLink()) {
        continue;
      }

      for (let livery of await fs.readdir(aircraftFolder)) {
        liveries.push({ aircraft, livery });
      }
    }

    return liveries;
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

  private async _getAvailableTechModules(): Promise<string[]> {
    const parentFolder = this.appState.config.modsTechFolder;

    const items: string[] = [];

    let modFolder: string;
    let itemFsStats: fs.Stats;
    for (let folder of await fs.readdir(parentFolder)) {
      modFolder = path.join(parentFolder, folder);
      itemFsStats = fs.lstatSync(modFolder);
      if (!itemFsStats.isDirectory() && !itemFsStats.isSymbolicLink()) {
        continue;
      }

      items.push(folder);
    }

    return items;
  }

  private async _getInstalledTechModules(): Promise<string[]> {
    const parentFolder = this.appState.config.dcsTechFolder;

    const items: string[] = [];

    let modFolder: string;
    let itemFsStats: fs.Stats;
    for (let folder of await fs.readdir(parentFolder)) {
      modFolder = path.join(parentFolder, folder);
      itemFsStats = fs.lstatSync(modFolder);
      if (!itemFsStats.isDirectory() && !itemFsStats.isSymbolicLink()) {
        continue;
      }

      items.push(folder);
    }

    return items;
  }

  private async _enableTechModule(module: string): Promise<void> {
    if (!module) {
      throw new Error("Module name cannot be empty.");
    }

    const moduleFolder = path.join(this.appState.config.modsTechFolder, module);
    const symlinkFolder = path.join(this.appState.config.dcsTechFolder, module);

    try {
      await fs.createSymlink(moduleFolder, symlinkFolder, "dir");
    } catch (error) {
      console.error(error);
      throw new Error("Could not link the tech module.");
    }
  }

  private async _disableTechModule(module: string): Promise<void> {
    if (!module) {
      throw new Error("Module name cannot be empty.");
    }

    const symlinkFolder = path.join(this.appState.config.dcsTechFolder, module);

    try {
      await fs.remove(symlinkFolder);
    } catch (error) {
      console.error(error);
      throw new Error("Could not unlink the tech module.");
    }
  }
}
