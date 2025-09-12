export interface SettingField {
  key: string;
  type: 'number' | 'checkbox' | 'text' | 'password';
  title: string;
  subtitle?: string;
  min?: number;
  max?: number;
}