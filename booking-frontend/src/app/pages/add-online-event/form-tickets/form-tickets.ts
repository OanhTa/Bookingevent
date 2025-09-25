import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-ticket',
  templateUrl: './form-tickets.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FormTickets {

  @Input() parentForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    
  }
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

  createTicket(): FormGroup {
    return this.fb.group({
      name: ['Vé Online'],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }
}
