import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModsService } from '../mods/services/mods.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private modsService: ModsService
  ) { }

  ngOnInit(): void { }

  public async test(): Promise<void> {
    const result = await this.modsService.getAvailableAircrafts();
    console.log(result);
  }
}
