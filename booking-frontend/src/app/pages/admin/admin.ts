import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    Header,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin{

}
