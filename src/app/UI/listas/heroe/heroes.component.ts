import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../../../Service/hero.service';
import { HeroModel } from '../../../Model/Views/Dynamic/HeroModel';
import { Hero } from '../../../Model/Domain/hero';
import { heroDAO } from '../../../DAO/hero.DAO';

@Component({
  selector: 'app-heroes',
  template: `
    <app-esquema-lista
      *ngIf="heroModel.heroes.length > 0"
      [title]="title"
      [params]="heroModel.heroes"
      (delete)="delete($event)"
      (edit)="goToDetail($event)"
    ></app-esquema-lista>
  `,
})
export class HeroesComponent implements OnInit {
  title: string = 'Heroes';

  constructor(
    private heroService: HeroService,
    public heroModel: HeroModel,
    private heroDao: heroDAO,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.heroModel.heroes = this.heroService.getHeroesArray();
  }

  goToDetail(hero: Hero) {
    this.router.navigate(['/detail/hero/', hero.id]);
  }

  add(name: string): void {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    this.heroDao.getHeroes().subscribe((heroes) => {
      const newId = heroes.length ? heroes[heroes.length - 1].id + 1 : 1;
      const newHero: Hero = {
        id: newId,
        name: trimmedName,
        lastName: '',
        age: 0,
        power: '',
      };

      this.heroService.addHero(newHero);
    });
  }

  delete(hero: Hero): void {
    this.heroModel.heroes = this.heroModel.heroes.filter(
      (h) => h.id !== hero.id
    );
    this.heroService.deleteHero(hero.id);
  }
}
