import { Component, Input } from '@angular/core';
import { CategoryServer } from '../../../services/CategoryService';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,  
  ],
  templateUrl: './form-detail.html',
})
export class FormDetail{
  @Input() parentForm!: FormGroup;

  categories$!: Observable<any[]>;
  eventTypes = ['Webinar', 'Workshop', 'Online Classes', 'Talk Show'];
  bannerFile: File | null = null;

  constructor(
    private categoryService: CategoryServer,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategory();

    const detailGroup = this.fb.group({
      name: [''],
      categoryId: [null],
      date: [''],
      time: [''],
      duration: [''],
      location: ['Online'],
      description: ['']
    });
    this.parentForm.setControl('detail', detailGroup);
  }

  get detailForm(): FormGroup {
    return this.parentForm.get('detail') as FormGroup;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bannerFile = file;
      // TODO: upload file -> backend -> lấy link -> patch vào form
      // this.eventForm.patchValue({ bannerUrl: 'https://your-cdn/' + file.name });
    }
  }

  selectType(type: string) {
    // this.eventForm.patchValue({ type });
  }

}