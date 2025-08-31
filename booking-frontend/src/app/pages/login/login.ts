import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthServices,  } from '../../services/AuthServices';
import { UserServices } from '../../services/UserServices';
import { LoginResponseDto } from '../../models/LoginResponseDto';
import { LoginRequestDto } from '../../models/LoginRequestDto';

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

  constructor(private authServices: AuthServices, private userServices: UserServices, private router: Router, private cdr: ChangeDetectorRef) {}

  onSubmit() {
    const body: LoginRequestDto = { email : this.email, password: this.password };
    this.authServices.login(body).subscribe({
      next: (res: LoginResponseDto) => {
    
        localStorage.setItem('accessToken', res.token);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('fullName', res.fullName);
        localStorage.setItem('roles', JSON.stringify(res.roles));

        if (res.roles.includes('Administrator')) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Đăng nhập thất bại';
        this.cdr.detectChanges();
      }
    });
  }
}
