import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postCadastro(data: Usuario){
    return this.http.post<Usuario>("http://localhost:3000/consulta", data);
  }

  getCadastroUsuario(){
    return this.http.get<Usuario[]>("http://localhost:3000/consulta");
  }

  updateCadastroUsuario(data: Usuario, id: number) {
    return this.http.put<Usuario>(`http://localhost:3000/consulta/${id}`, data);
  }

  deleteCadastroUsuario(id: number){
    return this.http.delete<Usuario>(`http://localhost:3000/consulta/${id}`);
  }

  getCadastroUsuarioByID(id: number){
    return this.http.get<Usuario>(`http://localhost:3000/consulta/${id}`)
  }


}
