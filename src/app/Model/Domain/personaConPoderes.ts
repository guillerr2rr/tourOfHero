export interface PersonaConPoderes {
  id: number;
  name: string;
  alterEgo?: string;
  lastName?: string;
  age: number;
  power: string;
  [key: string]: any;
}
