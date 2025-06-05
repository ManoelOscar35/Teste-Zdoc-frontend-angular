// src/app/ferias/ferias.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeriasService, Ferias } from '../../services/ferias.service';
import { FuncionarioService, Funcionario } from '../../services/funcionario.service';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {
  listaFerias: Ferias[] = [];
  listaFuncionarios: Funcionario[] = [];
  formFerias!: FormGroup;
  isEditando = false;

  constructor(
    private fb: FormBuilder,
    private feriasService: FeriasService,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
    this.carregarFuncionarios();
    this.carregarFerias();
  }

  private criarFormulario(): void {
    this.formFerias = this.fb.group({
      id: [0],
      funcionarioId: [null, Validators.required],
      dataInicio: ['', Validators.required],
      dataTermino: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  private carregarFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe({
      next: lista => (this.listaFuncionarios = lista),
      error: (err: Error) => console.error('Erro ao carregar funcionários:', err)
    });
  }

  carregarFerias(): void {
    this.feriasService.getFerias().subscribe({
      next: (lista: Ferias[]) => (this.listaFerias = lista),
      error: (err: Error) => console.error('Erro ao carregar férias:', err)
    });
  }

  onSalvar(): void {
    if (this.formFerias.invalid) {
      this.formFerias.markAllAsTouched();
      return;
    }
    const formValue: Ferias = this.formFerias.value;

    if (this.isEditando) {
      this.feriasService.updateFerias(formValue).subscribe({
        next: () => {
          this.carregarFerias();
          this.onCancelar();
        },
        error: (err: Error) => console.error('Erro ao atualizar férias:', err)
      });
    } else {
      const nova: Omit<Ferias, 'id'> = {
        funcionarioId: formValue.funcionarioId,
        dataInicio: formValue.dataInicio,
        dataTermino: formValue.dataTermino,
        status: formValue.status
      };
      this.feriasService.createFerias(nova).subscribe({
        next: () => {
          this.carregarFerias();
          this.onCancelar();
        },
        error: (err: Error) => console.error('Erro ao criar férias:', err)
      });
    }
  }

  getNomeFuncionario(id: number): string {
  const f = this.listaFuncionarios.find(x => x.id === id);
  return f ? f.nome : '-';
}

  onCancelar(): void {
    this.formFerias.reset({
      id: 0,
      funcionarioId: null,
      dataInicio: '',
      dataTermino: '',
      status: ''
    });
    this.isEditando = false;
  }

  onEditar(fer: Ferias): void {
    this.formFerias.setValue({
      id: fer.id,
      funcionarioId: fer.funcionarioId,
      dataInicio: fer.dataInicio,
      dataTermino: fer.dataTermino,
      status: fer.status
    });
    this.isEditando = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onExcluir(id: number): void {
    if (!confirm('Deseja realmente excluir esta férias?')) {
      return;
    }
    this.feriasService.deleteFerias(id).subscribe({
      next: () => this.carregarFerias(),
      error: (err: Error) => console.error('Erro ao excluir férias:', err)
    });
  }
}
