export interface TableAction<T> {
  label: string;
  callback: (row: T) => void;
}
