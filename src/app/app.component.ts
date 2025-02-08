import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        // Acciones después de que el backend responda correctamente
        console.log('Sesión cerrada exitosamente');
        this.storageService.clean();
        this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
      },
      (error) => {
        // Maneja errores si ocurren durante el proceso de cierre de sesión
        //console.error('Error al cerrar sesión:', error);


        console.log('Sesión cerrada exitosamente');
        this.storageService.clean();
        this.router.navigate(['/login']);
      }
    );
  }
}
