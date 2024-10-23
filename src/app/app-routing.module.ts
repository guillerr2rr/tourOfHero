import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './UI/listas/heroe/heroes.component';
import { DashboardComponent } from './UI/dashboard/dashboard.component';
import { HeroDetailComponent } from './UI/hero-detail/hero-detail.component';
import { FormularioComponentHeroe } from './UI/formularioHeroes/formulario.component';
import { VillainsComponent } from './UI/listas/villains/villains.component'; 
import { FormularioComponentVillain } from './UI/formularioVillains/formulario.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'villains', component: VillainsComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'newHeroes', component: FormularioComponentHeroe },
  { path: 'newVillains', component: FormularioComponentVillain },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
