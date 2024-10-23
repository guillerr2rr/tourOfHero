import { PersonaConPoderes } from './personaConPoderes';

export interface Villain extends PersonaConPoderes {
 
  fechoria: string;
  [key: string]: any;
}
