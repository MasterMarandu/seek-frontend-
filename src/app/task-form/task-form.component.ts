import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  task: Task = { id: 0, title: '', description: '', status: 'por_hacer' };

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute // Inyecta ActivatedRoute para acceder al estado
  ) {}

  ngOnInit(): void {
    const state = window.history.state;
    if (state && state.task) {
      this.task = { ...state.task };
    }
    if (state) {
      try {
        this.task = JSON.parse(state);
      } catch (error) {
        console.error('Error al cargar la tarea:', error);
      }
    }
  }

  onSubmit(): void {
    if (this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
        this.router.navigate(['/home']);
      });
    } else {
      this.taskService.addTask(this.task).subscribe(() => {
        this.router.navigate(['/home']); // Redirige al home después de agregar
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
