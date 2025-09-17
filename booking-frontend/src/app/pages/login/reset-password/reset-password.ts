import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthServices } from '../../../services/AuthServices';
import { ProgressSpinner } from 'primeng/progressspinner';
import { BlockUI } from 'primeng/blockui';
import { AuthFieldConfig } from '../../../models/AuthFieldConfig';
import { AuthFormComponent } from '../../../components/auth-form/auth-form';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    AuthFormComponent,
    ProgressSpinner,BlockUI
],
  providers: [MessageService],
  templateUrl: './reset-password.html',
})
export class ResetPasswordComponent {
  token: string | null = null;
  loading = false

  fields: AuthFieldConfig[] = [
    {
      key: 'password',
      label: 'Mật khẩu mới',
      type: 'password',
      validators: [Validators.required],
    },
    {
      key: 'confirmPassword',
      label: 'Xác nhận mật khẩu',
      type: 'password',
      validators: [Validators.required],
    }
  ];


  constructor(
    private route: ActivatedRoute,
    private authService: AuthServices,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.router.navigate(['/register']);
     } 
    }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit(value: any) {
    this.loading = true
    if (!this.token) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Token không hợp lệ' });
      return;
    }

    this.authService.resetPassword({ token: this.token, newPassword: value.password }).subscribe({
      next: res => {
        this.loading = false
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đặt lại mật khẩu thành công' });
        this.router.navigate(['/login']);
      },
      error: err => {
        this.loading = false
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: err.error?.message || 'Có lỗi xảy ra' });
      }
    });
  }
}
