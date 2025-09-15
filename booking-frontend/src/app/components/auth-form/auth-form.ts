import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

export interface AuthFieldConfig {
  key: string;                 // tên control
  label: string;               // label hiển thị
  type?: 'text' | 'password' | 'email'; // loại input
  placeholder?: string;
  validators?: ValidatorFn[];
}

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.html',
  imports: [
    CommonModule, 
    InputTextModule,
    ButtonModule, 
    ReactiveFormsModule,
    PasswordModule
],
})
export class AuthFormComponent implements OnInit {
  @Input() fields: AuthFieldConfig[] = [];
  @Input() formTitle: string = '';
  @Input() submitLabel: string = 'Submit';
  @Input() formValidators?: ValidatorFn | ValidatorFn[];

  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: any = {};
    this.fields.forEach(f => {
      group[f.key] = ['', f.validators || []];
    });
    this.form = this.fb.group(group, { validators: this.formValidators });
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getControl(key: string) {
    return this.form.get(key);
  }

  getErrorMessages(control: AbstractControl | null, field: AuthFieldConfig): string[] {
    if (!control || !control.errors) return [];
    const messages: string[] = [];
    const errors = control.errors;

    if (errors['required']) messages.push(`${field.label} là bắt buộc.`);
    if (errors['email']) messages.push(`Email không hợp lệ.`);
    if (errors['pattern']) messages.push(`${field.label} không hợp lệ.`);
    if (errors['minlength']) messages.push(`${field.label} tối thiểu ${errors['minlength'].requiredLength} ký tự.`);
    if (errors['maxlength']) messages.push(`${field.label} tối đa ${errors['maxlength'].requiredLength} ký tự.`);
    return messages;
  }
}
