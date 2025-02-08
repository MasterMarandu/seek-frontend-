import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TaskListComponent } from "../task-list/task-list.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // Si HomeComponent también es standalone
  imports: [TaskListComponent], // Importar TaskListComponent aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  navigateToAddTask(): void {
    console.log('Navegando a /tasks/add');
    this.router.navigate(['/tasks/add']);
  }
}
