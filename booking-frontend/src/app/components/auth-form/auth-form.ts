import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule, AsyncValidatorFn } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { PasswordValidationService } from '../../utils/password-validator';
import { from, map } from 'rxjs';

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
    PasswordModule, DividerModule
],
})
export class AuthFormComponent implements OnInit {
  messPassword: any;

  @Input() fields: AuthFieldConfig[] = [];
  @Input() formTitle: string = '';
  @Input() submitLabel: string = 'Submit';
  @Input() formValidators?: ValidatorFn | ValidatorFn[];

  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private passwordValidation: PasswordValidationService,
  ) {}

  ngOnInit(): void {
    const group: any = {};
    this.fields.forEach(f => {
      if (f.type === 'password' || f.key.toLowerCase().includes('password')) {
        group[f.key] = [
            '',
            f.validators || [],
            [this.passwordAsyncValidator()]  
        ];
      } else {
        group[f.key] = ['', f.validators || []];
      }
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

  passwordAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return from(this.passwordValidation.validate(control.value)).pipe(
        map(result => {
          return result.isValid ? null : { passwordWeak: result.errors };
        })
      );
    };
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
    if (errors['passwordMismatch']) messages.push(`Mật khẩu nhập lại không khớp.`);
 
    if (errors['passwordWeak']) {
      if (Array.isArray(errors['passwordWeak'])) {
        messages.push(...errors['passwordWeak']); // lấy từng lỗi chi tiết từ service
      } else {
        messages.push(errors['passwordWeak']); // fallback nếu chỉ là string
      }
    }
    return messages;
  }
}
