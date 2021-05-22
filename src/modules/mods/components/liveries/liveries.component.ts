import { Component, OnInit } from '@angular/core';

import { ModsService } from '../../services/mods.service';

import { AircraftLivery } from '../../../../../electron/src/model';

interface LiveryVM {
  aircraft: string;
  name: string;
  installed: boolean;
}

@Component({
  selector: 'app-liveries',
  templateUrl: './liveries.component.html',
  styleUrls: ['./liveries.component.scss']
})
export class LiveriesComponent implements OnInit {

  public liveries: LiveryVM[];

  constructor(
    private modsService: ModsService
  ) { }

  public async ngOnInit(): Promise<void> {
    this._getData();
  }

  public async enable(aircraft: string, livery: string): Promise<void> {
    await this.modsService.enableAircraftLivery(aircraft, livery);
    this._getData();
  }

  public async disable(aircraft: string, livery: string): Promise<void> {
    await this.modsService.disableAircraftLivery(aircraft, livery);
    this._getData();
  }

  private async _getData(): Promise<void> {
    const promises: Promise<AircraftLivery[]>[] = [
      this.modsService.getAvailableLiveries(),
      this.modsService.getInstalledLiveries()
    ];

    const results = await Promise.all(promises);
    const availables = results[0];
    const installed = results[1];

    const liveries: LiveryVM[] = [];

    for (const av of availables) {
      liveries.push({
        aircraft: av.aircraft,
        name: av.livery,
        installed: !!installed.find(o => o.aircraft === av.aircraft && o.livery === av.livery)
      });
    }

    this.liveries = liveries;
  }
}
