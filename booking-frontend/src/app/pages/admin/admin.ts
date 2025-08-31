import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SidebarRight } from './sidebar-right/sidebar-right';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    SidebarRight
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin{

}
