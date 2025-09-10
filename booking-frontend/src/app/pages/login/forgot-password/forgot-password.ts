import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { RequestPasswordResetDto } from "../../../models/UserDto";
import { AuthServices } from "../../../services/AuthServices";
import { MessageService } from "primeng/api";
import { ProgressSpinner } from 'primeng/progressspinner';
import { BlockUI } from 'primeng/blockui';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    RouterModule,
    ProgressSpinner,BlockUI
  ],
  standalone: true,
  templateUrl: './forgot-password.html',
})
export class ForgotPasswordComponent  {
    email: string = '';
    loading = false
    constructor(
      private authService: AuthServices,
      private messageService: MessageService,
    ) {}

    onSubmit() {
    this.loading = true
    const dto: RequestPasswordResetDto = { email: this.email };
    this.authService.requestPasswordReset(dto).subscribe({
      next: res => {
        this.loading = false
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: res.message });
      },
      error: err => {
        this.loading = false
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: err.error?.message || 'Có lỗi xảy ra' });
      }
    })
  }
}