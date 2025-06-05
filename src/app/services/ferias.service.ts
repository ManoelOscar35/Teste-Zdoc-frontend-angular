// src/app/services/ferias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// src/app/models/ferias.ts
export interface Ferias {
  id: number;
  dataInicio: string;    // formato “YYYY-MM-DD”
  dataTermino: string;   // formato “YYYY-MM-DD”
  status: 'Pendente' | 'Aprovada' | 'Recusada';
  funcionarioId: number;
}


@Injectable({
  providedIn: 'root'
})
export class FeriasService {
  private readonly apiUrl = `${environment.apiUrl}/Ferias`;

  constructor(private http: HttpClient) {}

  getFerias(): Observable<Ferias[]> {
    return this.http.get<Ferias[]>(this.apiUrl);
  }

  getFeriasById(id: number): Observable<Ferias> {
    return this.http.get<Ferias>(`${this.apiUrl}/${id}`);
  }

  createFerias(nova: Omit<Ferias, 'id'>): Observable<Ferias> {
    return this.http.post<Ferias>(this.apiUrl, nova);
  }

  updateFerias(ferias: Ferias): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${ferias.id}`, ferias);
  }

  deleteFerias(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
