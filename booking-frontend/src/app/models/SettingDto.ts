export interface SettingField {
  key: string;
  type: 'number' | 'checkbox' | 'text';
  title: string;
  subtitle?: string;
  min?: number;
  max?: number;
}