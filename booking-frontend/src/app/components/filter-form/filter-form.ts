import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';

export interface FilterField {
  key: string;
  label: string;
  type: string;   // không bắt buộc literal union nữa
  options?: { name: string; code: any }[];
}

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.html',
  imports: [ 
    CommonModule,
    ButtonModule,
    FormsModule,   
    DatePickerModule,
    Select,
    InputNumber
  ],
  
})
export class FilterFormComponent {
  @Input() fields: FilterField[] = [];   // cha truyền vào
  filterData: { [key: string]: any } = {};
  // Event emitter để gửi dữ liệu về cha khi submit
  @Output() submitFilter = new EventEmitter<{ [key: string]: any }>();
  @Output() exportFilter = new EventEmitter<any>();

  onSubmit() {
    this.submitFilter.emit(this.filterData);
  }

  onExport() {
    this.exportFilter.emit();
  }
}
