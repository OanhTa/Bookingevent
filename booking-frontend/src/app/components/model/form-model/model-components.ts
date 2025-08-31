import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  templateUrl: './model-components.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class ModalFormComponent {
  @Input() title: string = '';
  @Input() fields: { name: string, label: string, type: string }[] = []; // cấu hình field
  @Input() formData: any = {}; // dữ liệu khi sửa
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if (this.fields.length) {
      const group: any = {};
      this.fields.forEach(f => {
        group[f.name] = [this.formData ? this.formData[f.name] : ''];
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
