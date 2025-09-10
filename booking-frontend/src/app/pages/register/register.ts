import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthServices } from '../../services/AuthServices';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { BlockUI } from 'primeng/blockui';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    CardModule, 
    ButtonModule, 
    RouterModule,
    ProgressSpinner,BlockUI
  ],
})
export class Register{

  registerForm!: FormGroup;
  loading = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthServices,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: passwordMatchValidator
    });
  }
  
  get userName() {
    return this.registerForm.controls['userName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    this.loading = true;
    const postData = { ...this.registerForm.value };
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