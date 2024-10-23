import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VillainService } from '../../../Service/villain.service';
import { VillainModel } from '../../../Model/Views/Dynamic/VillainModel';
import { Villain } from '../../../Model/Domain/villano';
import { villainDAO } from '../../../DAO/villain.DAO';

@Component({
  selector: 'app-villains',
  template: `
    <app-esquema-lista
      *ngIf="villainModel.villains.length > 0"
      [title]="title"
      [params]="villainModel.villains"
      (delete)="delete($event)"
      (edit)="goToDetail($event)"
    ></app-esquema-lista>
  `,
})
export class VillainsComponent implements OnInit {
  title: string = 'Villains';

  constructor(
    private villainService: VillainService,
    public villainModel: VillainModel,
    private villainDao: villainDAO,
    private router: Router
  ) {}

  
  ngOnInit(): void {
    this.villainModel.villains = this.villainService.getVillainsArray();
  }

  goToDetail(villain: Villain) {
    this.router.navigate(['/detail/villain/', villain.id]);
  }

  add(name: string): void {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    this.villainDao.getVillains().subscribe((villains) => {
      const newId = villains.length ? villains[villains.length - 1].id + 1 : 1;
      const newVillain: Villain = {
        id: newId,
        name: trimmedName,
        lastName: '',
        age: 0,
        power: '',
        fechoria: ''
      };

      this.villainService.addVillain(newVillain);
    });
  }

  delete(villain: Villain): void {
    this.villainModel.villains = this.villainModel.villains.filter(
      (h) => h.id !== villain.id
    );
    this.villainService.deleteVillain(villain.id);
  }
}
