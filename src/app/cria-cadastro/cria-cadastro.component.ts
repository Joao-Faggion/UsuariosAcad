import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-cria-cadastro',
  templateUrl: './cria-cadastro.component.html',
  styleUrls: ['./cria-cadastro.component.scss']
})
export class CriaCadastroComponent implements OnInit {

  public planos: string[] = ["Mensal", "Trimestral", "Semestral", "Anual"];
  public generos: string[] = ["Masculino", "Feminino"];
  public listaImportante: string[] = ["Queima de Gordura", "Energia e Stamina", "Criar massa magra e músuclos", "Vida Mais Saudável", "Fitness"];

  public submitForm!: FormGroup;
  public idAtualizaUsuario!: number;
  public isUpdateActive: boolean = false;

  constructor(private builder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private service: ApiService, private toastService: NgToastService) { }

  ngOnInit(): void {
    this.submitForm = this.builder.group({
      nome: [''],
      sobrenome: [''],
      email: [''],
      telefone: [''],
      peso: [''],
      altura: [''],
      imc: [''],
      imcResultado: [''],
      genero: [''],
      precisaPersonal: [''],
      plano: [''],
      importante: [''],
      fezAcadAntes: [''],
      dataConsulta: [''],
    });

    this.submitForm.controls['altura'].valueChanges.subscribe(res => {
      this.calcularIMC(res);
    })

    this.activatedRoute.params.subscribe(val => {
      this.idAtualizaUsuario = val['id'];
      this.service.getCadastroUsuarioByID(this.idAtualizaUsuario).subscribe(res => {
        this.isUpdateActive = true;
        this.preenchaFormToUpdate(res)
      })
    })
  }

  atualizar() {
    this.service.updateCadastroUsuario(this.submitForm.value, this.idAtualizaUsuario).subscribe(res => {
      try {
        this.toastService.success({ detail: "SUCESSO", summary: "Usuário Alterado", duration: 3000 });
      }
      catch (e) {
        console.log(e)
      }
      finally {
        this.submitForm.reset();

        setTimeout(() => {
          this.router.navigate(['lista'])
        }, 1500)


      }


    })
  }

  preenchaFormToUpdate(usuario: Usuario) {
    this.submitForm.setValue({
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      telefone: usuario.telefone,
      peso: usuario.peso,
      altura: usuario.altura,
      imc: usuario.imc,
      imcResultado: usuario.imcResultado,
      genero: usuario.genero,
      precisaPersonal: usuario.precisaPersonal,
      plano: usuario.plano,
      importante: usuario.importante,
      fezAcadAntes: usuario.fezAcadAntes,
      dataConsulta: usuario.dataConsulta,
    })
  }



  enviarForm() {
    this.service.postCadastro(this.submitForm.value).subscribe(res => {
      this.toastService.success({ detail: "SUCESSO", summary: "Consulta adicionada", duration: 3000 });
      setTimeout(() => {
        window.location.reload()
      }, 3001);
    })
  }

  calcularIMC(value: number) {
    const peso = this.submitForm.value.peso; // weight in kilograms
    const altura = value; // height in meters
    const imc = peso / (altura * altura);
    this.submitForm.controls['imc'].patchValue(imc);
    switch (true) {
      case imc < 18.5:
        this.submitForm.controls['imcResultado'].patchValue("Abaixo do Peso");
        break;
      case (imc >= 18.5 && imc < 25):
        this.submitForm.controls['imcResultado'].patchValue("Normal");
        break;
      case (imc >= 25 && imc < 30):
        this.submitForm.controls['imcResultado'].patchValue("Acima do Peso");
        break;

      default:
        this.submitForm.controls['imcResultado'].patchValue("Obeso");
        break;
    }
  }



}
