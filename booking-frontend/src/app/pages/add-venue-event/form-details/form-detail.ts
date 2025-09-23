import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CategoryServer } from '../../../services/CategoryService';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { UploadServices } from '../../../services/UploadService';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form-detail',
  standalone: true,
  imports: [
    CommonModule, ButtonModule,
    ReactiveFormsModule,
    Select, DatePickerModule,FluidModule
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
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategory();

    const detailGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], 
      thumbnail: [''], 
      categoryId: [null, [Validators.required]], 
      date: ['', [Validators.required]], 
      time: ['', [Validators.required]], 
      duration: ['', [Validators.required]], 
      location: ['Offline'], 
      description: ['', [Validators.required, Validators.minLength(10)]],

      // thêm địa điểm
      venue: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    });

    detailGroup.valueChanges.subscribe(values => {
      const { venue, address1, city, state} = values;
      const location = [venue, address1, city, state]
        .filter(x => !!x) 
        .join(', ');
      
      detailGroup.get('location')?.setValue(location, { emitEvent: false });
    });
    this.parentForm.setControl('detail', detailGroup);
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