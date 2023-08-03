import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../models/usuario.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-lista-cadastro',
  templateUrl: './lista-cadastro.component.html',
  styleUrls: ['./lista-cadastro.component.scss']
})
export class ListaCadastroComponent implements OnInit {

  public dataSource!: MatTableDataSource<Usuario>;
  public usuarios!: Usuario[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ["id", "nome", "sobrenome", "email", "telefone", "imcResultado", "genero", "plano", "dataConsulta", "acao"];

  constructor(private service: ApiService, private router: Router, private confirm: NgConfirmService, private toastService:NgToastService) {

  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.service.getCadastroUsuario().subscribe(res => {
      this.usuarios = res;
      this.dataSource = new MatTableDataSource(this.usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  edit(id: number) {
    this.router.navigate(['atualizar', id]);
  }

  delete(id: number) {
    this.confirm.showConfirm("Você quer deletar esse usuário?", () => {
      this.service.deleteCadastroUsuario(id).subscribe(res => {
        this.toastService.success({ detail: "SUCESSO", summary: "Usuário Deletado", duration: 3000 });
        this.getUsuarios();
      })
    },
      () => {

      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
