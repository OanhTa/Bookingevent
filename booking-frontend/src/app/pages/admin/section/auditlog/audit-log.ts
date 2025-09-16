import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuditLog, AuditLogServices } from '../../../../services/AuditLogServices';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterFormComponent } from '../../../../components/filter-form/filter-form';
import { FormField } from '../../../../models/FormField';
import { ModalFormComponent } from '../../../../components/model/form-model/model-components';
import { ExportService } from '../../../../services/ExportService';
import { ButtonModule } from 'primeng/button';
import { TableAction } from '../../../../models/TableAction';
import { TableComponent } from '../../../../components/table/table-component';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.html',
  imports: [
    TableModule, 
    TabsModule,
    TableComponent,
    CommonModule,
    ButtonModule,
    FormsModule,
    FilterFormComponent,
    ModalFormComponent,
  ],
})
export class AuditLogComponent implements OnInit {
  logs: AuditLog[] = [];
  totalRecords = 0;
  loading = true;
  columns: any[] = [];
  actions: TableAction<any>[] = [];

  showModalForm = false;
  modalTitle = '';
  modalFields: FormField[] = [
    { label: 'HTTP status code', name: 'statusCode', type: 'select', required: true, validators: ['required'], options: []},
    { label: 'HTTP method', name: 'httpMethod', type: 'select', required: true, validators: ['required'], options: []},
    { label: 'URL', name: 'url', type: 'text', required: true, validators: ['required'] },
    { label: 'Client IP Address', name: 'clientIpAddress', type: 'text' },
    { label: 'Exceptions', name: 'hasException', type: 'select', options: []},
    { label: 'User name', name: 'userName', type: 'text' },
    { label: 'Time', name: 'executionTime', type: 'date' },
    { label: 'Duration', name: 'executionDuration', type: 'number' },
    { label: 'Application name', name: 'applicationName', type: 'text' },
    { label: 'Correlation Id', name: 'correlationId', type: 'text' },
  ];
  modelFormData: any = null;

  filterFields0 = [
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
  filterFields1 = [
    { key: 'startDate', label: 'Thời gian', type: 'date' },
    { key: 'httpMethod', label: 'Phương thức', type: 'select', options: [
        { name: 'GET', code: 'GET' },
        { name: 'POST', code: 'POST' },
        { name: 'PUT', code: 'PUT' },
        { name: 'DELETE', code: 'DELETE' },
    ]},
    { key: 'id', label: 'Khóa chính', type: 'text' },
    { key: 'url', label: 'Tên đối tượng', type: 'text' },
  ];


  constructor(
    private auditLogService: AuditLogServices,
    private exportService: ExportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.columns = [
      { field: 'executionTime', header: 'Thời gian' },
      { field: 'httpMethod', header: 'Phương thức' },
      { field: 'entity', header: 'Tên đối tượng' },
      { field: 'entityId', header: 'Khóa chính' }
    ];

    this.actions = [
      // { label: 'Chi tiết', callback: (r) => this.loadLogs() },
      // { label: 'Chi tiết', callback: (r) => this.loadLogs() },
    ];
  }

  loadLogs(event: TableLazyLoadEvent) {
    this.loading = true;
    const page = (event.first ?? 0) / (event.rows ?? 5) + 1;
    const pageSize = event.rows ?? 5;

    this.auditLogService.getAll(page, pageSize).subscribe((res: any) => {
      this.logs = res.data.data;
      this.totalRecords = res.data.totalCount;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  onFilterSubmit(filterData: { [key: string]: any }) {
    this.auditLogService.getSearch(filterData).subscribe((res: any) => {
      this.logs = res.data
      this.cdr.detectChanges();
    });
  }

  openViewDetail(data: any) {
    this.modalTitle = `Xem chi tiết`;
    this.modelFormData = { ...data };
    this.showModalForm = true;
  }

  exportExcel() {
    this.exportService.exportExcel(this.logs, 'logs-exportexcel');
  }
}
