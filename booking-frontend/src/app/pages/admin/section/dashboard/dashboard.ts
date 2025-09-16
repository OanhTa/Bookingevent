import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component } from "@angular/core";
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ReportServices } from "../../../../services/ReportService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  standalone: true,
  imports: [
    CommonModule, 
    NgChartsModule
  ]
})
export class DashBoard  {
  roleChartData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  activityChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  logChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };

  stats: any;

  constructor(
    private reportServices : ReportServices,
    private cdr : ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.reportServices.GetUserStats().subscribe((res: any) => {
      this.stats = res.data;
      this.roleChartData = {
        labels: Object.keys(this.stats.byRole),
        datasets: [
          {
            data: Object.values(this.stats.byRole),
            backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722']
          }
        ]
      };

      this.activityChartData = {
        labels: this.stats.registrationsByDate.map((r: any) =>
          new Date(r.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
        ),
        datasets: [
          {
            data: this.stats.registrationsByDate.map((r: any) => r.count),
            label: 'Đăng ký mới',
            backgroundColor: '#42A5F5'
          }
        ]
      };
      this.logChartData = {
        labels: this.stats.logsByDate.map((l: any) => 
          new Date(l.date).toLocaleDateString('vi-VN')  
        ),
        datasets: [
          {
            data: this.stats.logsByDate.map((l: any) => l.count),
            label: 'Audit Logs',
            fill: false,
            borderColor: '#FF4081',
            tension: 0.3
          }
        ]
      };

      this.cdr.detectChanges();
    });
  }
}