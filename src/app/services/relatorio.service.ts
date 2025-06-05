// src/app/services/relatorio.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario, FuncionarioService } from './funcionario.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  constructor(private funcionarioService: FuncionarioService) {}

  /**
   * Retorna todos os funcionários para montar o relatório.
   */
  getRelatorioFuncionarios(): Observable<Funcionario[]> {
    return this.funcionarioService.getFuncionarios();
  }
}
