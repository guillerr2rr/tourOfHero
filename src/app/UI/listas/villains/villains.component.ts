import { Component, OnInit } from "@angular/core";
import { Villain } from "../../../Model/Domain/villano";
import { VillainService } from "../../../Service/villain.service";
import { VillainModel } from "../../../Model/Views/Dynamic/VillainModel";
import { villainDAO } from "../../../DAO/villain.DAO";
import { Router } from "@angular/router";
 


@Component({
  selector: 'app-villains',
  template: `
    <app-esquema-lista
      *ngIf="this.villainModel.villains.length > 0"
      [title]="title"
      [params]="this.villainModel.villains"
    ></app-esquema-lista>
  `,
})
export class VillainsComponent implements OnInit {
  title: string = 'Villains';
  villains: Villain[] = [];

  constructor(
    private villainService: VillainService,
    public villainModel: VillainModel,
    private VillainDao: villainDAO,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.villains = this.villainService.getVillainesArray();
  }

  goToDetail(villainId: number) {
    this.router.navigate(['/detail', villainId]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this.VillainDao.getVillaines().subscribe((villains) => {
      const lastVillain = villains[villains.length - 1];
      const newId = lastVillain ? lastVillain.id + 1 : 1;
      const newVillain: Villain = {
        id: newId,
        name,
        lastName: '',
        age: 0,
        power: '',
        fechoria: ""
      };

      this.villainService.addVillain(newVillain);
    });
  }

  delete(villain: Villain): void {
    this.villainModel.villains = this.villainModel.villains.filter((h) => h !== villain);
    this.villainService.deleteVillain(villain.id);
  }
}
