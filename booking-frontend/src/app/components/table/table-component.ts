import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TableAction } from '../../models/TableAction';
import { Popover, PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';

interface Column {
  field: string;
  header: string;
}

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
