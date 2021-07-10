import { Component, OnInit } from '@angular/core';
import { ModsService } from '../../services/mods.service';

interface ModuleVM {
  name: string;
  installed: boolean;
}

@Component({
  selector: 'app-tech-modules',
  templateUrl: './tech-modules.component.html',
  styleUrls: ['./tech-modules.component.scss']
})
export class TechModulesComponent implements OnInit {

  public modules: ModuleVM[];

  constructor(
    private modsService: ModsService
  ) { }

  public ngOnInit(): void {
    this._getData();
  }

  public async enable(module: string): Promise<void> {
    await this.modsService.enableTechModule(module);
    this._getData();
  }

  public async disable(module: string): Promise<void> {
    await this.modsService.disableTechModule(module);
    this._getData();
  }

  private async _getData(): Promise<void> {
    const promises: Promise<string[]>[] = [
      this.modsService.getAvailableTechModules(),
      this.modsService.getInstalledTechModules()
    ];

    const results = await Promise.all(promises);
    const availables = results[0];
    const installed = results[1];
    const installedSet = new Set<string>(installed);

    const modules: ModuleVM[] = [];

    for (const av of availables) {
      modules.push({
        name: av,
        installed: installedSet.has(av)
      });
    }

    this.modules = modules;
  }
}
