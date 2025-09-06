import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthServices,  } from '../../services/AuthServices';
import { LoginResponseDto } from '../../models/LoginResponseDto';
import { LoginRequestDto } from '../../models/LoginRequestDto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [FormsModule, PasswordModule, InputTextModule, RouterModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email!: string;
  password!: string;
  errorMessage: string = '';

  constructor(
    private authServices: AuthServices, 
    private messageService: MessageService, 
    private router: Router, 
    private cdr: ChangeDetectorRef) {}

  onSubmit() {
    const body: LoginRequestDto = { email : this.email, password: this.password };
    this.authServices.login(body).subscribe({
      next: (res: LoginResponseDto) => {
      const account = {
          token: res.token,
          userId: res.userId,
          fullName: res.fullName,
          roles: res.roles, // mảng role
      };
      localStorage.setItem('account', JSON.stringify(account));
        
        this.messageService.add({severity: 'success',summary: 'Đăng nhập thành công',detail: 'Chào mừng bạn quay lại!'});
        
        if (res.roles.includes('Administrator')) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Đăng nhập thất bại';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        this.cdr.detectChanges();
      }
    });
  }
}
