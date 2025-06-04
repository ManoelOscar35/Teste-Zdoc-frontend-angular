// src/app/services/funcionario.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  dataAdmissao: string; // formato 'YYYY-MM-DD'
  salario: number;
  status: 'Ativo' | 'Inativo';
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private readonly apiUrl = `${environment.apiUrl}/Funcionarios`;

  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  createFuncionario(funcionario: Partial<Funcionario>): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  updateFuncionario(funcionario: Funcionario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${funcionario.id}`, funcionario);
  }

  deleteFuncionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
