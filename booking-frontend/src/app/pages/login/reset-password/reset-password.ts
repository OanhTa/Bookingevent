import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthServices } from '../../../services/AuthServices';
import { ProgressSpinner } from 'primeng/progressspinner';
import { BlockUI } from 'primeng/blockui';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule, FormsModule, 
    ButtonModule, InputTextModule,
    ProgressSpinner,BlockUI
],
  providers: [MessageService],
  templateUrl: './reset-password.html', // tách ra HTML
})
export class ResetPasswordComponent {
  password = '';
  confirmPassword = '';
  token: string | null = null;
  loading = false

  constructor(
    private route: ActivatedRoute,
    private authService: AuthServices,
    private messageService: MessageService,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit() {
    this.loading = true
    if (this.password !== this.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Mật khẩu không khớp' });
      return;
    }

    if (!this.token) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Token không hợp lệ' });
      return;
    }

    this.authService.resetPassword({ token: this.token, newPassword: this.password }).subscribe({
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
