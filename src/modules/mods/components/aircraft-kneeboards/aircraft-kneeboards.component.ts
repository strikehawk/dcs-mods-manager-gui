import { Component, OnInit } from '@angular/core';
import { ModsService } from '../../services/mods.service';

interface AircraftKneeboardsVM {
  name: string;
  installed: boolean;
}

@Component({
  selector: 'app-aircraft-kneeboards',
  templateUrl: './aircraft-kneeboards.component.html',
  styleUrls: ['./aircraft-kneeboards.component.scss']
})
export class AircraftKneeboardsComponent implements OnInit {

  public kneeboards: AircraftKneeboardsVM[];

  constructor(
    private modsService: ModsService
  ) { }

  public ngOnInit(): void {
    this._getData();
  }

  public async enable(aircraft: string): Promise<void> {
    await this.modsService.enableAircraftKneeboards(aircraft);
    this._getData();
  }

  public async disable(aircraft: string): Promise<void> {
    await this.modsService.disableAircraftKneeboards(aircraft);
    this._getData();
  }

  private async _getData(): Promise<void> {
    const promises: Promise<string[]>[] = [
      this.modsService.getAvailableAircraftKneeboards(),
      this.modsService.getInstalledAircraftKneeboards()
    ];

    const results = await Promise.all(promises);
    const availables = results[0];
    const installed = results[1];
    const installedSet = new Set<string>(installed);

    const kneeboards: AircraftKneeboardsVM[] = [];

    for (const av of availables) {
      kneeboards.push({
        name: av,
        installed: installedSet.has(av)
      });
    }

    this.kneeboards = kneeboards;
  }
}
