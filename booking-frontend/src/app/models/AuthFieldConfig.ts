import { ValidatorFn } from "@angular/forms";

export interface AuthFieldConfig {
  key: string;                 
  label: string;               
  type?: 'text' | 'password' | 'email'; 
  placeholder?: string;       
  validators?: ValidatorFn[];  
}
