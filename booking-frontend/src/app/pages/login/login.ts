import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AuthServices, LoginRequest } from '../../services/AuthServices';
import { AccountServices } from '../../services/AccountServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, PasswordModule, InputTextModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email!: string;
  password!: string;

  constructor(private authServices: AuthServices, private accountServices: AccountServices, private router: Router) {}

  onSubmit() {
    const body: LoginRequest = { email : this.email, password: this.password };
    this.authServices.login(body).subscribe({
      next: (res) => {
         this.accountServices.updateToken(res).subscribe({
          next: (updateRes) => {
            localStorage.setItem('accessToken', updateRes.token); 
            localStorage.setItem('account', JSON.stringify(updateRes.account));
            localStorage.setItem('accountGroup', updateRes.account.accountGroup.name);

            const group = updateRes.account.accountGroup.name;
                  switch(group) {
                    case 'Admin':
                      this.router.navigate(['/admin']);
                      break;
                    case 'Organizer':
                      this.router.navigate(['/manager']);
                      break;
                    case 'User':
                      this.router.navigate(['/home']);
                      break;
                    default:
                      this.router.navigate(['/']);
                  }
          },
          error: (err) => {
            console.error('Cập nhật token thất bại', err);
          }
        });
      },
      error: (err) => {
        console.error('Đăng nhập thất bại', err);
      }
    });
  }
}
