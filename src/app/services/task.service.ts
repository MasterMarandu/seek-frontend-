import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { StorageService } from '../_services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks'; // URL de la API

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, this.getHttpOptions());
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, this.getHttpOptions());
  }

  updateTask(id: number, updatedTask: Task): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Task>(url, updatedTask, this.getHttpOptions());
  }

  deleteTask(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, this.getHttpOptions());
  }

  private getHttpOptions(): object {
    const token = this.storageService.getToken(); // Obtén el token del almacenamiento
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return { headers };
    }
    return {};
  }
}
