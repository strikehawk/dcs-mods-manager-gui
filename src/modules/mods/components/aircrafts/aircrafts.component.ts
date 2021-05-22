import { Component, OnInit } from '@angular/core';
import { ModsService } from '../../services/mods.service';

interface AircraftVM {
  name: string;
  installed: boolean;
}

@Component({
  selector: 'app-aircrafts',
  templateUrl: './aircrafts.component.html',
  styleUrls: ['./aircrafts.component.scss']
})
export class AircraftsComponent implements OnInit {

  public aircrafts: AircraftVM[];

  constructor(
    private modsService: ModsService
  ) { }

  public async ngOnInit(): Promise<void> {
    this._getData();
  }

  public async enable(aircraft: string): Promise<void> {
    await this.modsService.enableAircraft(aircraft);
    this._getData();
  }

  public async disable(aircraft: string): Promise<void> {
    await this.modsService.disableAircraft(aircraft);
    this._getData();
  }

  private async _getData(): Promise<void> {
    const promises: Promise<string[]>[] = [
      this.modsService.getAvailableAircrafts(),
      this.modsService.getInstalledAircrafts()
    ];

    const results = await Promise.all(promises);
    const availables = results[0];
    const installed = results[1];
    const installedSet = new Set<string>(installed);

    const aircrafts: AircraftVM[] = [];

    for (const av of availables) {
      aircrafts.push({
        name: av,
        installed: installedSet.has(av)
      });
    }

    this.aircrafts = aircrafts;
  }
}
