import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { ModalFormComponent } from '../../../components/model/form-model/model-components';
import { FormField } from '../../../models/FormField';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports:[
    CommonModule,
    FormsModule,
    ModalFormComponent,
  ]
})
export class DashboardComponent {
  chart!: Chart;
  selectedMetric = 'views';

  stats = [
    {
      title: 'Doanh thu (VND)',
      value: '$550.00',
      change: '0.00% từ giai đoạn trước',
      bg: 'bg-purple-500'
    },
    {
      title: 'Đơn đặt hàng',
      value: '2',
      change: '0.00% từ giai đoạn trước',
      bg: 'bg-red-500'
    },
    {
      title: 'Lượt xem trang',
      value: '30',
      change: '0.00% từ giai đoạn trước',
      bg: 'bg-sky-500'
    },
    {
      title: 'Bán vé',
      value: '3',
      change: '0.00% từ giai đoạn trước',
      bg: 'bg-green-500'
    }
  ];

  dataSets: any = {
    revenue: [550, 600, 580, 620, 590, 610, 640],
    orders: [2, 3, 1, 4, 2, 5, 3],
    views: [30, 40, 35, 50, 45, 60, 70],
    tickets: [3, 5, 2, 4, 6, 7, 5]
  };

  showModalForm = false
  modalTitle = '';
  modalFields: FormField[] = [
    { label: 'Tên tổ chức', name: 'name', type: 'text', required: true, validators: ['required'] },
    { label: 'Giới thiệu', name: 'about', type: 'text', required: false },
    { label: 'Email', name: 'email', type: 'email', required: true, validators: ['required', 'email'] },
    { label: 'Số điện thoại', name: 'phone', type: 'text', required: true, validators: ['required'] },
    { label: 'Website', name: 'website', type: 'text', required: false },
    { label: 'Facebook', name: 'facebook', type: 'text', required: false },
    { label: 'Instagram', name: 'instagram', type: 'text', required: false },
    { label: 'LinkedIn', name: 'linkedin', type: 'text', required: false },
    { label: 'Youtube', name: 'youtube', type: 'text', required: false },
    { label: 'Địa chỉ 1', name: 'address1', type: 'text', required: true, validators: ['required'] },
    { label: 'Địa chỉ 2', name: 'address2', type: 'text', required: false },
    { label: 'Quốc gia', name: 'country', type: 'text', required: true, validators: ['required'] },
    { label: 'Tỉnh/Thành phố', name: 'city', type: 'text', required: true, validators: ['required'] },
    { label: 'Mã bưu điện', name: 'zipcode', type: 'text', required: false },
  ];

  modelFormData: any = null;
  showConfirm = false;

  openAdd() {
    this.modalTitle = 'Thêm tổ chức';
    this.modelFormData = {};
    this.showModalForm = true;
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: this.getLabel(this.selectedMetric),
          data: this.dataSets[this.selectedMetric],
          borderColor: 'rgb(34,197,94)',
          backgroundColor: 'rgba(34,197,94,0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  updateChart() {
    this.chart.data.datasets[0].label = this.getLabel(this.selectedMetric);
    this.chart.data.datasets[0].data = this.dataSets[this.selectedMetric];
    this.chart.update();
  }

  getLabel(metric: string): string {
    switch (metric) {
      case 'revenue': return 'Doanh thu';
      case 'orders': return 'Đơn đặt hàng';
      case 'views': return 'Lượt xem trang';
      case 'tickets': return 'Bán vé';
      default: return '';
    }
  }
  onSave(data: any){
    console.log("onsave")
    console.log(data)
  }
}
