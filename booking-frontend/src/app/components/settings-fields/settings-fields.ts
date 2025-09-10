// settings-fields.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SettingField } from '../../models/SettingDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-settings-fields',
  templateUrl: './settings-fields.html',
  imports: [
    CommonModule,
    FormsModule,
    InputNumber,
    InputTextModule
  ]
})
export class SettingsFieldsComponent {
  @Input() fields: SettingField[] = [];
  @Input() settings: any = {};

  @Output() save = new EventEmitter<void>();

  onSave() {
    this.save.emit();
  }
}
