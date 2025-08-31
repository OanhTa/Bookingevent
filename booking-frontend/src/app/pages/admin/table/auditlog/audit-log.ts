import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ChangeDetectorRef } from '@angular/core';
import { AuditLog, AuditLogServices } from '../../../../services/AuditLogServices';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    NgClass,
    FormsModule,
    TableModule,
    SelectModule
  ],
  templateUrl: './audit-log.html',
})
export class AuditLogComponent implements OnInit {
  logs: AuditLog[] = [];
  actions = [
    { label: 'Tất cả', value: null },
    { label: 'CREATE', value: 'CREATE' },
    { label: 'UPDATE', value: 'UPDATE' },
    { label: 'DELETE', value: 'DELETE' },
    { label: 'LOGIN', value: 'LOGIN' },
  ];

  selectedAction: string | null = null;

  constructor(private auditLogService: AuditLogServices, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.auditLogService.getAll().subscribe({
      next: (res : any) => {
        this.logs = res;
        this.cdr.detectChanges(); 
      },
      error: (err : any) => {
        console.error('Lỗi khi tải audit logs:', err);
      }
    });

  }


  get filteredLogs(): AuditLog[] {
    if (!this.selectedAction) return this.logs;
    return this.logs.filter(log => log.action === this.selectedAction);
  }
}
