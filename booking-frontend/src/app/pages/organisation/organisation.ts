import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event';
import { DashboardComponent } from './dashboard/dashboard';
import { OrderComponent } from './order/order';
import { MyAccount } from '../admin/my-account/my-account';
import { MemberComponent } from './member/member';

@Component({
  selector: 'app-organisation',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    EventComponent,
    OrderComponent,
    MemberComponent,
    DashboardComponent,
    MyAccount
  ],
  templateUrl: './organisation.html',
  styleUrls: ['./organisation.css']
})
export class Organisation{
 tabs = [
  { label: 'Tổng quan', icon: 'pi pi-chart-bar' },
  { label: 'Sự kiện', icon: 'pi pi-calendar' },
  { label: 'Đơn hàng', icon: 'pi pi-shopping-cart' },
  { label: 'Hồ sơ', icon: 'pi pi-user' },
  { label: 'Thành viên', icon: 'pi pi-users' }
];

  activeTab = 0;
}
