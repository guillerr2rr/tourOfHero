import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PowerModel {
  powers: string[] = [
    'Really Smart',
    'Super Flexible',
    'Super Hot',
    'Weather Changer',
  ];
  power: string | undefined;
}
