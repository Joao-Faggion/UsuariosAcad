import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';

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

  constructor(private builder: FormBuilder, private service: ApiService, private toastService: NgToastService) { }

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
  }

  enviarForm() {
    this.service.postCadastro(this.submitForm.value).subscribe(res => {
      this.toastService.success({detail: "SUCESSO", summary: "Consulta adicionada", duration: 3000});
      this.submitForm.reset();
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
