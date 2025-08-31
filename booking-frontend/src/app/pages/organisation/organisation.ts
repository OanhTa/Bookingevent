import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { EventComponent } from '../../components/event/event';

@Component({
  selector: 'app-organisation',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    EventComponent

  ],
  templateUrl: './organisation.html',
  styleUrls: ['./organisation.css']
})
export class Organisation{
  tabs = [
  { label: 'Dashboard', icon: 'fa fa-tachometer' },
  { label: 'Events', icon: 'fa fa-calendar'},
  { label: 'Promotion', icon: 'fa fa-ad' },
  { label: 'Contact List', icon: 'fa fa-address-card'},
  { label: 'Payouts', icon: 'fa fa-credit-card'},
  { label: 'Reports', icon: 'fa fa-chart-pie' },
  { label: 'Subscription', icon: 'fa fa-star'},
  { label: 'Conversion Setup', icon: 'fa fa-plus'},
  { label: 'About', icon: 'fa fa-info-circle'},
  { label: 'My Team', icon: 'fa fa-users'}
];

  activeTab = 0;
}
