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
  { label: 'Tổng quan', icon: 'pi pi-chart-bar' },
  { label: 'Sự kiện', icon: 'pi pi-calendar' },
  { label: 'Ưu đãi', icon: 'pi pi-gift' },
  { label: 'Thanh toán', icon: 'pi pi-credit-card' },
  { label: 'Báo cáo', icon: 'pi pi-chart-pie' },
  { label: 'Thành viên', icon: 'pi pi-users' }
];

  activeTab = 0;
}
