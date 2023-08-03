import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriaCadastroComponent } from './cria-cadastro/cria-cadastro.component';
import { ListaCadastroComponent } from './lista-cadastro/lista-cadastro.component';
import { DetalheUsuarioComponent } from './detalhe-usuario/detalhe-usuario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cadastro',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    component: CriaCadastroComponent
  },
  {
    path: 'lista',
    component: ListaCadastroComponent
  },
  {
    path: 'detalhes/:id',
    component: DetalheUsuarioComponent
  },
  {
    path: 'atualizar/:id',
    component: CriaCadastroComponent

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
