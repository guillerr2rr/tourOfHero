import { PersonaConPoderes } from './personaConPoderes';

export interface Villain extends PersonaConPoderes {
  id: number;
  name: string;
  alterEgo?: string;
  lastName?: string;
  age: number;
  power: string;
  fechoria: string;
   
}
