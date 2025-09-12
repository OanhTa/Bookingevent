import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { FilterFormComponent } from "../../../../components/filter-form/filter-form";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  standalone: true,
  imports: [
    CommonModule, 
    NgChartsModule,
    FilterFormComponent
  ]
})
export class DashBoard  {
  filterFields1 = [
      { key: 'startDate', label: 'Bắt đầu', type: 'date' },
      { key: 'endDate', label: 'Kết thúc', type: 'date' },    
  ];

  stats = {
    totalUsers: 1500,
    newUsersThisMonth: 120,
    activeUsers: 980,
    lockedUsers: 50,
    byRole: { Admin: 5, Teacher: 20, Student: 1400, Guest: 75 },
    registrationsByDate: [
      { date: "2025-09-01", count: 5 },
      { date: "2025-09-02", count: 12 }
    ]
  };

  roleChartData: ChartConfiguration<'doughnut'>['data'];
  activityChartData: ChartConfiguration<'bar'>['data'];

  constructor() {
    this.roleChartData = {
      labels: Object.keys(this.stats.byRole),
      datasets: [{ data: Object.values(this.stats.byRole) }]
    };

    this.activityChartData = {
      labels: this.stats.registrationsByDate.map(r => r.date),
      datasets: [
        { data: this.stats.registrationsByDate.map(r => r.count), label: 'Đăng ký mới' }
      ]
    };
  }
}
