export interface PermissionDto {
  name: string;
  displayName: string;
  isGranted: boolean;
}

export interface PermissionGroup {
  groupName: string;
  displayName: string;   // Ví dụ: "Quản lý người dùng"
  permissions: PermissionDto[];
}
