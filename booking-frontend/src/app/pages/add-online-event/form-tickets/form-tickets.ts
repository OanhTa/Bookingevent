import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-ticket',
  templateUrl: './form-tickets.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule   
  ]
})
export class FormTickets {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      status: ['draft', Validators.required]
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      console.log('Form data:', this.eventForm.value);
      // gọi API lưu dữ liệu ở đây
    }
  }
}
