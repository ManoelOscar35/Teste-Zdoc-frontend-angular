import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario, FuncionarioService } from '../../services/funcionario.service';

interface FuncionarioModel {
  nome: string;
  cargo: string;
  dataAdmissao: string; // formato 'YYYY-MM-DD'
  salario: number;
  status: 'Ativo' | 'Inativo';
}

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  formFuncionario!: FormGroup;
  isEditando = false;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
    this.carregarLista();
  }

  private criarFormulario(): void {
    this.formFuncionario = this.fb.group({
      id: "",
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      cargo: ['', [Validators.required, Validators.maxLength(50)]],
      dataAdmissao: ['', Validators.required],
      salario: [0, [Validators.required, Validators.min(0)]],
      status: ['Ativo', Validators.required]
    });
  }

  carregarLista(): void {
    this.funcionarioService.getFuncionarios().subscribe({
      next: (lista: Funcionario[]) => this.funcionarios = lista,
      error: (err: Error) => console.error('Erro ao carregar funcionários:', err)
    });
  }

  onSalvar(): void {
    if (this.formFuncionario.invalid) {
      this.formFuncionario.markAllAsTouched();
      return;
    }

    const dados: Funcionario = this.formFuncionario.value;

    if (this.isEditando) {
      this.funcionarioService.updateFuncionario(dados).subscribe({
        next: () => {
          this.carregarLista();
          this.onCancelar();
        },
        error: (err: Error) => console.error('Erro ao atualizar funcionário:', err)
      });
    } else {
      // Remover id (fica 0) para criar
      const novoFunc: Partial<FuncionarioModel> = {
        nome: dados.nome,
        cargo: dados.cargo,
        dataAdmissao: dados.dataAdmissao,
        salario: dados.salario,
        status: dados.status
      };
      this.funcionarioService.createFuncionario(novoFunc).subscribe({
        next: () => {
          this.carregarLista();
          this.onCancelar();
        },
        error: (err: Error) => console.error('Erro ao criar funcionário:', err)
      });
    }
  }

  onCancelar(): void {
    this.formFuncionario.reset({
      id: 0,
      nome: '',
      cargo: '',
      dataAdmissao: '',
      salario: 0,
      status: 'Ativo'
    });
    this.isEditando = false;
  }


  onEditar(f: Funcionario): void {
    this.formFuncionario.setValue({
      id: f.id,
      nome: f.nome,
      cargo: f.cargo,
      dataAdmissao: f.dataAdmissao.split('T')[0],
      salario: f.salario,
      status: f.status
    });
    this.isEditando = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onExcluir(id: number): void {
    if (!confirm('Deseja realmente excluir este funcionário?')) return;
    this.funcionarioService.deleteFuncionario(id).subscribe({
      next: () => this.carregarLista(),
      error: (err: Error) => console.error('Erro ao excluir funcionário:', err)
    });
  }
}
