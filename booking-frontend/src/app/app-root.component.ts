// app-root.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ToastModule
  ],
  template: `
    <router-outlet></router-outlet>
    <p-toast></p-toast>
  `
})
export class AppRootComponent {
  
}
