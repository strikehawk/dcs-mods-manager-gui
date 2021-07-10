export interface AircraftLivery {
  aircraft: string;
  livery: string;
}

export interface ConfigFile {
  /**
   * The full path to the DCS "user" folder, where custom content should be stored.
   */
  dcsUserFolder: string;

  /**
   * The full path to the folder containing the mods.
   */
  modsFolder: string;
}

export interface Configuration extends ConfigFile {
  dcsUserFolderError?: string;
  modsFolderError?: string;
  dcsAircraftFolder: string;
  dcsLiveriesFolder: string;
  dcsTechFolder: string;
  dcsAircraftKneeboardsFolder: string;
  modsAircraftFolder: string;
  modsLiveriesFolder: string;
  modsTechFolder: string;
  modsAircraftKneeboardsFolder: string;
}
