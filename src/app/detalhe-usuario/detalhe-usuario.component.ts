import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detalhe-usuario',
  templateUrl: './detalhe-usuario.component.html',
  styleUrls: ['./detalhe-usuario.component.scss']
})
export class DetalheUsuarioComponent implements OnInit {

  public usuarioId!: number;
  usuarioDetails!: Usuario;

  constructor(private activatedRoute: ActivatedRoute, private service: ApiService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.usuarioId = val['id'];
      this.fetchUsuarioDetails(this.usuarioId);
    });
  }

  fetchUsuarioDetails(usuarioId: number) {
    this.service.getCadastroUsuarioByID(usuarioId).subscribe(res => {
      this.usuarioDetails = res; 
      console.log(this.usuarioDetails);
    })
  }

}
