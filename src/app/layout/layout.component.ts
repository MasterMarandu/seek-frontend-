// layout.component.ts
import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  username = '';

  constructor(private storageService: StorageService) {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
      this.showAdminBoard = user.roles.includes('ROLE_ADMIN');
    }
  }

  logout(): void {
    this.storageService.clean();
    //window.location.reload();
  }
}
