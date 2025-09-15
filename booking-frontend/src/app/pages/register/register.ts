import { Component } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthServices } from '../../services/AuthServices';
import { ProgressSpinner } from 'primeng/progressspinner';
import { BlockUI } from 'primeng/blockui';
import { AuthFormComponent } from '../../components/auth-form/auth-form';
import { AuthFieldConfig } from '../../models/AuthFieldConfig';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [
    RouterModule,
    AuthFormComponent,
    ProgressSpinner,BlockUI
  ],
})
export class Register{
  registerForm!: FormGroup;
  loading = false
  fields: AuthFieldConfig[] = [
      { key: 'userName', label: 'Tên đăng nhập', validators: [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)] },
      { key: 'email', label: 'Email', type: 'email', validators: [Validators.required, Validators.email] },
      { key: 'password', label: 'Mật khẩu', type: 'password', validators: [Validators.required] },
      { key: 'confirmPassword', label: 'Nhập lại mật khẩu',  type: 'password', validators: [Validators.required] },
    ];
    
  constructor(
    private authService: AuthServices,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmit(value: any) {
    this.loading = true;
    const postData = { ...value };
    delete postData.confirmPassword;

    this.authService.register(postData).subscribe(
      response => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
        this.router.navigate(['login'])
      },
      error => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    )
  }

}
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
        return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true }
}