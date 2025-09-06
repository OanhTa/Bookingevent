import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  @Input() parentForm!: FormGroup;

  constructor(private fb: FormBuilder) {
   
  }

  get ticketForm(): FormGroup {
    return this.parentForm.get('ticket') as FormGroup;
  }

  ngOnInit(): void {  
    const ticketGroup = this.fb.group({
      price: [''],
      ticketQuantity: ['']
    });
    this.parentForm.setControl('ticket', ticketGroup);
  }
}
