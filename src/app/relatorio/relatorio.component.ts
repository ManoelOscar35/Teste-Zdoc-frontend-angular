import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../services/relatorio.service';
import { Funcionario } from '../services/funcionario.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  listaFuncionarios: Funcionario[] = [];
  carregando = false;
  erro: string | null = null;

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.gerarRelatorio();
  }

  gerarRelatorio(): void {
    this.carregando = true;
    this.erro = null;
    this.relatorioService.getRelatorioFuncionarios().subscribe({
      next: lista => {
        this.listaFuncionarios = lista;
        this.carregando = false;
      },
      error: err => {
        console.error('Erro ao gerar relatório:', err);
        this.erro = 'Falha ao carregar dados do relatório.';
        this.carregando = false;
      }
    });
  }
}
