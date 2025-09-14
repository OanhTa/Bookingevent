export interface TableAction<T> {
  label: string | ((row: T) => string);
  callback: (row: T) => void;
}
