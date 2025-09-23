import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    RouterModule,
    ButtonModule
  ],
  templateUrl: './add-event.html'
})
export class AddEvent{
  eventTypes = [
    {
      title: 'Tạo sự kiện trực tuyến',
      icon: 'fas fa-video',
      link: '/create-online-event'
    },
    {
      title: 'Tạo sự kiện tại địa điểm',
      icon: 'fas fa-map-marker-alt',
      link: '/create-venue-event'
    }
  ];
}