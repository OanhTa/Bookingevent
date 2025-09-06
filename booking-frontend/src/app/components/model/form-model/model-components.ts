import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '../../../models/FormField';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  templateUrl: './model-components.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class ModalFormComponent {
  @Input() title: string = '';
  @Input() fields: FormField[] = [];

  @Input() currentAction!: any; 
  @Input() formData: any = {}; // dữ liệu khi sửa
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  fieldErrors: any = {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['']
    });
  }
  
  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control) return '';

    if (control.hasError('required')) {
      return `${fieldName} là bắt buộc`;
    }
    if (control.hasError('email')) {
      return `Email không hợp lệ`;
    }
    if (control.hasError('minlength')) {
      return `${fieldName} phải ít nhất ${control.getError('minlength').requiredLength} ký tự`;
    }

    return 'Giá trị không xác định';
  }

  ngOnChanges() {
    if (this.fields.length) {
      const group: any = {};
      this.fields.forEach(f => {
        const validators = [];
        if (f.validators?.includes('required')) {
          validators.push(Validators.required);
        }
        if (f.validators?.includes('email')) {
          validators.push(Validators.email);
        }
        if (f.validators?.includes('minlength')) {
          validators.push(Validators.minLength(6));
        }

        group[f.name] = [
          this.formData ? this.formData[f.name] : '',
          validators
        ];
      });
      this.form = this.fb.group(group);
    }
  }
  
  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}
