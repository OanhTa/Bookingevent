import { firstValueFrom } from 'rxjs';
import { AppSettingService } from '../services/AppSettingService';
import { Injectable } from '@angular/core';

export interface PasswordValidatorResult {
  isValid: boolean;
  errors: string[];
}
export interface PasswordSettings {
  minLength: number;           
  minUniqueChars: number;      
  requireSpecialChar: boolean; 
  requireLowercase: boolean;   
  requireUppercase: boolean;  
  requireDigit: boolean;       
}


@Injectable({ providedIn: 'root' })
export class PasswordValidationService {
  private settings: PasswordSettings | null = null;

  constructor(private appSettingService: AppSettingService) {}

  async loadSettings(): Promise<PasswordSettings> {
    if (!this.settings) {
      const data = await firstValueFrom(this.appSettingService.GetByPrefix('App.Identity'));
      this.settings = {
        minLength: parseInt(data['MinLength']),
        minUniqueChars: parseInt(data['UniqueChars']),
        requireSpecialChar: data['RequireNonAlphanumeric'] === 'true',
        requireLowercase: data['RequireLowercase'] === 'true',
        requireUppercase: data['RequireUppercase'] === 'true',
        requireDigit: data['RequireDigit'] === 'true'
      };
    }
    return this.settings;
  }

  async validate(password: string): Promise<PasswordValidatorResult> {
    const settings = await this.loadSettings();
    const errors: string[] = [];
    if (!password) errors.push("Mật khẩu không được để trống.");
    if (password.length < settings.minLength) errors.push(`Mật khẩu phải có ít nhất ${settings.minLength} ký tự.`);
    if (new Set(password).size < settings.minUniqueChars) errors.push(`Mật khẩu phải có ít nhất ${settings.minUniqueChars} ký tự khác nhau.`);
    if (settings.requireSpecialChar && !/[^\w\d]/.test(password)) errors.push("Phải chứa ký tự đặc biệt.");
    if (settings.requireLowercase && !/[a-z]/.test(password)) errors.push("Phải có chữ thường.");
    if (settings.requireUppercase && !/[A-Z]/.test(password)) errors.push("Phải có chữ hoa.");
    if (settings.requireDigit && !/\d/.test(password)) errors.push("Phải có chữ số.");

    return { isValid: errors.length === 0, errors };
  }
}
