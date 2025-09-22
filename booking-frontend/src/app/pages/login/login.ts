import { Component } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthServices  } from '../../services/AuthServices';
import { LoginRequestDto } from '../../models/LoginRequestDto';
import { MessageService } from 'primeng/api';
import { ProgressSpinner } from 'primeng/progressspinner';
import { BlockUI } from 'primeng/blockui';
import { AuthFieldConfig } from '../../models/AuthFieldConfig';
import { AuthFormComponent } from '../../components/auth-form/auth-form';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterModule,
    AuthFormComponent,
    ProgressSpinner,BlockUI
  ],
  standalone: true,
  templateUrl: './login.html',
})
export class Login {
  email!: string;
  password!: string;
  errorMessage: string = '';
  loading = false

  fields: AuthFieldConfig[] = [
    {
      key: 'email',
      label: 'Tên đăng nhập / Email',
      type: 'email',
      validators: [Validators.required]
    },
    {
      key: 'password',
      label: 'Mật khẩu',
      type: 'password',
      validators: [Validators.required],
    }
  ];

  constructor(
    private authServices: AuthServices, 
    private messageService: MessageService, 
    private router: Router, 
    private cdr: ChangeDetectorRef) {}

  onSubmit(data: any) {
    this.loading = true
    const body: LoginRequestDto = { email : data.email, password: data.password };
    this.authServices.login(body).subscribe({
      next: (res) => {
        this.loading = false
        localStorage.setItem('account', JSON.stringify(res));
        this.messageService.add({severity: 'success',summary: res.message,detail: 'Chào mừng bạn quay lại!'});
        
        if (res.roles.includes('Administrator')) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false
        this.errorMessage = err.error?.message || 'Đăng nhập thất bại';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errorMessage });
        this.cdr.detectChanges();
      }
    });
  }
}
