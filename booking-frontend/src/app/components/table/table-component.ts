import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TableAction } from '../../models/TableAction';
import { Popover, PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'table-component',
  templateUrl: 'table-component.html',
  standalone: true,
  imports: [
    TableModule, 
    CommonModule,
    ButtonModule,
    PopoverModule
  ]
})
export class TableComponent<T>    {
  @Input() columns: any[] = [];
  @Input() data: T[] = [];
  @Input() actions: TableAction<T>[] = [];

  @ViewChild('op') op!: Popover;

  dropdownOpen = false;
  selectedRow: any;

  isDate(value: any): boolean {
    if (!value) return false;
    // Chỉ nhận string
    if (typeof value !== 'string') return false;
    // Regex kiểm tra ISO date cơ bản: 2025-09-14T08:20:11
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    if (!isoDateRegex.test(value)) return false;

    const d = new Date(value);
    return !isNaN(d.getTime());
  }


  displayActions(event: Event, rowData: any) {
    this.selectedRow = rowData;
    this.op.toggle(event);
  }

  onActionClick(action: any) {
    if (action.callback) {
      action.callback(this.selectedRow);
    }
    this.op.hide();              
  }
}
