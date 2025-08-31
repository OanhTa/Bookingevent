import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    RouterModule
  ],
  templateUrl: './add-event.html'
})
export class AddEvent{

}