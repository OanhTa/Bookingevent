import { Component } from "@angular/core";
import { Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RequestPasswordResetDto } from "../../../models/UserDto";
import { AuthServices } from "../../../services/AuthServices";
import { MessageService } from "primeng/api";
import { ProgressSpinner } from 'primeng/progressspinner';
import { BlockUI } from 'primeng/blockui';
import { AuthFieldConfig } from "../../../models/AuthFieldConfig";
import { AuthFormComponent } from "../../../components/auth-form/auth-form";

@Component({
  selector: 'app-forgot-password',
  imports: [
    AuthFormComponent,
    RouterModule,
    ProgressSpinner,BlockUI
  ],
  standalone: true,
  templateUrl: './forgot-password.html',
})
export class ForgotPasswordComponent  {
    email: string = '';
    loading = false
    fields: AuthFieldConfig[] = [
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Nhập email của bạn',
        validators: [Validators.required, Validators.email]
      }
    ]

    constructor(
      private authService: AuthServices,
      private messageService: MessageService,
    ) {}

    onSubmit(data: any) {
        this.loading = true
        const dto: RequestPasswordResetDto = { email: data.email };
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