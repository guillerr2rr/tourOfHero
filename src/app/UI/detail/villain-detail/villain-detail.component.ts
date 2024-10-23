import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VillainService } from '../../../Service/villain.service';
import { VillainModel } from '../../../Model/Views/Dynamic/VillainModel';
import { PowerModel } from '../../../Model/Views/Dynamic/powerModel';
import { FechoriaModel } from '../../../Model/Views/Dynamic/fechoriaModel';
@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.css'],
})
export class VillainDetailComponent implements OnInit, OnChanges {
  selectedPower: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private villainService: VillainService,
    private location: Location,
    public villainModel: VillainModel,
    public powerModel: PowerModel,
    public fechoriaModel: FechoriaModel
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.villainService.getVillain(id);
    this.selectedPower = this.villainModel.villain?.power;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.villainService.getVillain(id);
    this.selectedPower = this.villainModel.villain?.power;
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.villainModel.villain) {
      this.villainService.updateVillain(this.villainModel.villain);
      this.goBack();
    }
  }
}
