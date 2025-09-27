import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-form-ticket',
  templateUrl: './form-tickets.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputNumberModule
  ]
})
export class FormTickets {

  @Input() parentForm!: FormGroup;

  ticketTypes = [
    { label: 'Vé Thường', value: 'Vé Thường' },
    { label: 'Vé VIP', value: 'Vé VIP' },
    { label: 'Vé Sinh viên', value: 'Vé Sinh viên' },
    { label: 'Khác...', value: 'Khác' }
  ];
  get tickets(): FormArray {
    return this.parentForm.get('tickets') as FormArray;
  }

  showError(index: number, controlName: string, errorKey: string): boolean {
    const group = this.tickets.at(index) as FormGroup;
    const control = group.get(controlName);
    return !!(control && control.touched && control.hasError(errorKey));
  }
}
