import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuditLog, AuditLogServices } from '../../../../services/AuditLogServices';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterFormComponent } from '../../../../components/filter-form/filter-form';


@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.html',
  imports: [
    TableModule, 
    CommonModule,
    FormsModule,
    FilterFormComponent
  ],
})
export class AuditLogComponent implements OnInit {
  logs: AuditLog[] = [];
  totalRecords = 0;
  loading = true;

  filterFields = [
    { key: 'startDate', label: 'Ngày bắt đầu', type: 'date' },
    { key: 'endDate', label: 'Ngày kết thúc', type: 'date' },
    { key: 'userName', label: 'Tên định danh', type: 'text' },
    { key: 'url', label: 'URL', type: 'text' },
    { key: 'minDuration', label: 'Thời gian tối thiểu', type: 'number' },
    { key: 'maxDuration', label: 'Thời gian tối đa', type: 'number' },
    { key: 'httpMethod', label: 'HTTP phương thức', type: 'select', options: [
      { name: 'GET', code: 'GET' },
      { name: 'POST', code: 'POST' },
      { name: 'PUT', code: 'PUT' },
      { name: 'DELETE', code: 'DELETE' },
    ]},
    { key: 'statusCode', label: 'HTTP trạng thái', type: 'select', options: [
      { name: '200 OK', code: '200' },
      { name: '400 Bad Request', code: '400' },
      { name: '500 Internal Server Error', code: '500' },
    ]},
    { key: 'applicationName', label: 'Tên ứng dụng', type: 'text' },
    { key: 'ipAddress', label: 'Địa chỉ khách hàng', type: 'text' },
    { key: 'correlationId', label: 'Id tương quan', type: 'text' },
    { key: 'hasException', label: 'Có lỗi', type: 'select', options: [
      { name: 'Có', code: true },
      { name: 'Không', code: false },
    ]},
  ];


  constructor(
    private auditLogService: AuditLogServices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.loading = true;
    this.auditLogService.getAll().subscribe((res: any) => {
      this.logs = res
      this.cdr.detectChanges();
    });
  }

  onFilterSubmit(filterData: { [key: string]: any }) {
    this.auditLogService.getSearch(filterData).subscribe((res: any) => {
      this.logs = res
      this.cdr.detectChanges();
    });
  }

  refresh() {
    this.loadLogs();
  }

  exportExcel() {
    // this.auditLogService.exportExcel().subscribe(blob => {
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = 'AuditLogs.xlsx';
    //   a.click();
    // });
  }
}
