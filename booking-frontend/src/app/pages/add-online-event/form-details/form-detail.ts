import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CategoryServer } from '../../../services/CategoryService';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { UploadServices } from '../../../services/UploadService';
import { ButtonModule } from 'primeng/button';
import { Editor } from 'primeng/editor';

@Component({
  selector: 'app-form-detail',
  standalone: true,
  imports: [
    CommonModule, ButtonModule,
    ReactiveFormsModule,
    Select, DatePickerModule,FluidModule,
    Editor
  ],
  templateUrl: './form-detail.html',
})
export class FormDetail{
  @Input() parentForm!: FormGroup;

  categories$!: Observable<any[]>;
  previewUrl: string | null = null;

  constructor(
    private categoryService: CategoryServer,
    private uploadServices: UploadServices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategory();
    this.detailForm.get('thumbnail')?.valueChanges.subscribe(val => {
      this.previewUrl = val;
    });
  }

  showError(controlName: string, errorKey: string): boolean {
    const control = this.detailForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorKey));//ép kiểu về boolean
  }

  get detailForm(): FormGroup {
    return this.parentForm.get('detail') as FormGroup;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadServices.uploadPoster(file).subscribe({
      next: (res :any) => {
        if (res.success && res.avatarUrl) {
          this.detailForm.get('thumbnail')?.setValue(res.avatarUrl);
          this.previewUrl = res.avatarUrl;
 
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Upload lỗi:', err);
      }
    });
    }
  }

}