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
  public listaImportante: string[] = ["Queima de Gordura", "Energia e Stamina", "Criar massa magra e músculos", "Vida Mais Saudável", "Fitness"];
  public imc!: number;
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
    if (this.submitForm.valid) {
      
      try {
        this.service.postCadastro(this.submitForm.value).subscribe(res => {
          this.toastService.success({ detail: "SUCESSO", summary: "Cadastro adicionado.", duration: 3000 });
        }
        )
      }

      catch (e) {
        console.log(e);
      }

      finally {
        setTimeout(() => {
          this.router.navigate(['lista']);
        }, 3002);

      }

    } else {
      this.toastService.error({ detail: "ERRO", summary: "Informe seus dados nos campos solicitados.", duration: 3000 })
    }
  };

  calcularIMC(value: number) {
    const peso = this.submitForm.value.peso; // weight in kilograms
    const altura = value; // height in meters
    const imc1 = peso / (altura * altura);
    var imc = +imc1.toFixed(2);
    this.submitForm.controls['imc'].patchValue(imc);
    switch (true) {
      case imc < 18.5:
        this.submitForm.controls['imcResultado'].patchValue("Abaixo do Peso");
        break;
      case (imc >= 18.5 && imc < 25):
        this.submitForm.controls['imcResultado'].patchValue("Peso Normal");
        break;
      case (imc >= 25 && imc < 30):
        this.submitForm.controls['imcResultado'].patchValue("Acima do Peso");
        break;
      case (imc >= 30 && imc < 35):
        this.submitForm.controls['imcResultado'].patchValue("Obesidade |");
        break;
      case (imc >= 35 && imc < 39.9):
        this.submitForm.controls['imcResultado'].patchValue("Obesidade ||");
        break;

      default:
        this.submitForm.controls['imcResultado'].patchValue("Obesidade |||");
        break;
    }
  }



}
