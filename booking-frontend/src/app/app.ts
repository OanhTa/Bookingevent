import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  providers: [MessageService], 
  template: `
    <router-outlet></router-outlet>
    <p-toast></p-toast>
  `,
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('booking-frontend');
  
}
