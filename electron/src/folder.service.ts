import * as path from "path";
import * as fs from "fs-extra";
import * as os from "os";

export class FolderService {
  public getCandidateDcsFolderPath(): string {
    const homedir = os.homedir();
    return path.join(homedir, "Saved Games", "DCS");
  }

  /**
   * Builds the full path to the DCS user folder containing the aircraft mods.
   * @param {string} dcsUserFolder The full path to the DCS user folder.
   * @returns {string} The full path to the DCS aircraft mods folder.
   */
  public getDcsAircraftFolder(dcsUserFolder: string): string {
    if (!dcsUserFolder) {
      throw new Error("DCS user folder cannot be empty.");
    }

    return path.join(dcsUserFolder, "Mods", "aircraft");
  }

  /**
  * Builds the full path to the DCS profile folder containing the aircraft liveries.
  * @param {string} dcsUserFolder The full path to the DCS user folder.
  * @returns {string} The full path to the DCS aircraft liveries folder.
  */
  public getDcsLiveriesFolder(dcsUserFolder: string): string {
    if (!dcsUserFolder) {
      throw new Error("DCS user folder cannot be empty.");
    }

    return path.join(dcsUserFolder, "Liveries");
  }

  /**
  * Builds the full path to the DCS profile folder containing the 'tech' modules.
  * @param {string} dcsUserFolder The full path to the DCS user folder.
  * @returns {string} The full path to the DCS tech folder.
  */
   public getDcsTechFolder(dcsUserFolder: string): string {
    if (!dcsUserFolder) {
      throw new Error("DCS user folder cannot be empty.");
    }

    return path.join(dcsUserFolder, "Mods", "tech");
  }

  /**
  * Builds the full path to the folder containing the aircraft mods, based on the root Mods directory.
  * @param {string} modsFolder The full path to the root Mods folder.
  * @returns {string} The full path to the aircraft mods folder.
  */
  public getModsAircraftFolder(modsFolder: string): string {
    if (!modsFolder) {
      throw new Error("Root mods folder cannot be empty.");
    }

    return path.join(modsFolder, "Aircrafts");
  }

  /**
  * Builds the full path to the folder containing the aircraft liveries mods, based on the root Mods directory.
  * @param {string} modsFolder The full path to the root Mods folder.
  * @returns {string} The full path to the aircraft liveries mods folder.
  */
  public getModsLiveriesFolder(modsFolder: string): string {
    if (!modsFolder) {
      throw new Error("Root mods folder cannot be empty.");
    }

    return path.join(modsFolder, "Liveries");
  }

  /**
  * Builds the full path to the folder containing the tech mods, based on the root Mods directory.
  * @param {string} modsFolder The full path to the root Mods folder.
  * @returns {string} The full path to the tech mods folder.
  */
   public getModsTechFolder(modsFolder: string): string {
    if (!modsFolder) {
      throw new Error("Root mods folder cannot be empty.");
    }

    return path.join(modsFolder, "Tech");
  }

  public isDcsUserFolderValid(dcsUserFolder: string): any {
    if (!dcsUserFolder) {
      return {
        custom: "DCS user folder cannot be empty."
      };
    }

    if (!fs.existsSync(dcsUserFolder)) {
      return {
        custom: `Specified DCS user folder '${dcsUserFolder}' does not exist.`
      };
    }

    return null;
  }

  public isModsFolderValid(modsFolder: string): any {
    if (!modsFolder) {
      return {
        custom: "Mods folder cannot be empty."
      };
    }

    if (!fs.existsSync(modsFolder)) {
      return {
        custom: `Specified mods folder '${modsFolder}' does not exist.`
      };
    }

    return null;
  }

  public checkDcsUserFolderStructure(dcsUserFolder: string): void {
    if (!dcsUserFolder) {
      throw new Error("DCS user folder cannot be empty.");
    }

    if (!fs.existsSync(dcsUserFolder)) {
      throw new Error(`Specified DCS user folder '${dcsUserFolder}' does not exist.`);
    }

    fs.ensureDirSync(this.getDcsAircraftFolder(dcsUserFolder));
    fs.ensureDirSync(this.getDcsLiveriesFolder(dcsUserFolder));
    fs.ensureDirSync(this.getDcsTechFolder(dcsUserFolder));
  }

  public checkModsFolderStructure(modsFolder: string): void {
    if (!modsFolder) {
      throw new Error("Mods folder cannot be empty.");
    }

    if (!fs.existsSync(modsFolder)) {
      throw new Error(`Specified mods folder '${modsFolder}' does not exist.`);
    }

    fs.ensureDirSync(this.getModsAircraftFolder(modsFolder));
    fs.ensureDirSync(this.getModsLiveriesFolder(modsFolder));
    fs.ensureDirSync(this.getModsTechFolder(modsFolder));
  }
}
