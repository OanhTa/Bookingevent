export enum OrganisationUserRole {
  Owner = 0,   // Chủ sở hữu
  Manager = 1, // Quản lý
  Staff = 2    // Nhân viên
}

export enum OrganisationUserStatus {
  Pending = 0,   // Đang chờ duyệt
  Active = 1,    // Đã tham gia
  Cancelled = 2, // Đã hủy
  Blocked = 3    // Bị khóa
}

export function getRoleText(role: OrganisationUserRole | number): string {
  switch (role) {
    case OrganisationUserRole.Owner: return 'Chủ sở hữu';
    case OrganisationUserRole.Manager: return 'Quản lý';
    case OrganisationUserRole.Staff: return 'Nhân viên';
    default: return 'Không xác định';
  }
}

export function getStatusText(status: OrganisationUserStatus | number): string {
  switch (status) {
    case OrganisationUserStatus.Pending: return 'Đang chờ';
    case OrganisationUserStatus.Active: return 'Đã tham gia';
    case OrganisationUserStatus.Cancelled: return 'Đã hủy';
    case OrganisationUserStatus.Blocked: return 'Bị khóa';
    default: return 'Không xác định';
  }
}
