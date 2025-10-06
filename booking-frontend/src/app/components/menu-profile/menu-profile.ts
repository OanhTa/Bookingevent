import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-profile',
  imports: [CommonModule,RouterModule ],
  templateUrl: './menu-profile.html',
  styleUrl: './menu-profile.css'
})
export class MenuProfile {
  isSubMenuOpen = false; // trạng thái mở/đóng submenu

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
