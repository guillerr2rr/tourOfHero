import { Injectable } from '@angular/core';
import { Hero } from '../../Domain/hero';

@Injectable({ providedIn: 'root' })
export class HeroModel {
  heroes: Hero[] = [];
  hero: Hero | undefined;
}
