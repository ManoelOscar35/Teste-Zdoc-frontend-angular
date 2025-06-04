import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
   { path: 'funcionarios', loadChildren: () => import('./components/funcionarios/funcionarios.module').then(m => m.FuncionariosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
