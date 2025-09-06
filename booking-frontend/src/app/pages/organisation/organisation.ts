import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event';
import { DashboardComponent } from './dashboard/dashboard';

@Component({
  selector: 'app-organisation',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    EventComponent,
    DashboardComponent
  ],
  templateUrl: './organisation.html',
  styleUrls: ['./organisation.css']
})
export class Organisation{
  tabs = [
  { label: 'Tổng quan', icon: 'fa fa-tachometer' },
  { label: 'Sự kiện', icon: 'fa fa-calendar'},
  { label: 'Ưa đãi', icon: 'fa fa-ad' },

  { label: 'Thanh toán', icon: 'fa fa-credit-card'},
  { label: 'Báo cáo', icon: 'fa fa-chart-pie' },

  { label: 'Thành viên', icon: 'fa fa-users'}
];

  activeTab = 0;
}
