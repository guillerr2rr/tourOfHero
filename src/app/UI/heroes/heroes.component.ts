import { heroDAO } from './../../DAO/hero.DAO';
import { Component, OnInit } from '@angular/core';

import { Hero } from '../../Model/Domain/hero';
import { HeroService } from '../../Service/hero.service';
import { HeroModel } from '../../Model/Views/Dynamic/HeroModel';
import { PrimeIcons } from 'primeng/api';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService, public heroModel: HeroModel,private HeroDao:heroDAO) {}

  ngOnInit(): void {
    this.heroService.getHeroes();
  }
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
  
    // Obtener el último héroe para calcular el nuevo id
    this.HeroDao.getHeroes().subscribe(heroes => {
      const lastHero = heroes[heroes.length - 1];
      const newId = lastHero ? lastHero.id + 1 : 1; // Si no hay héroes, asigna el id 1
  
      const newHero: Hero = { id: newId, name };
      
      this.heroService.addHero(newHero);
    });
  }
  

  delete(hero: Hero): void {
    this.heroModel.heroes = this.heroModel.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id);
  }
}
