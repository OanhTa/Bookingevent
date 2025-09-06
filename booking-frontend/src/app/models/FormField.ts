export interface FieldOption {
  label: string;
  value: string;
}
export interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: FieldOption[];
  validators?: string[];
}