export enum EventStatus {
  Draft = 0,        // Nháp - tạo xong nhưng chưa công khai
  Published = 1,    // Đã xuất bản - đang hiển thị cho khách
  Ongoing = 2,      // Đang diễn ra
  Completed = 3,    // Đã kết thúc
  Cancelled = 4,    // Đã hủy
  Archived = 5      // Đã lưu trữ
}

export function getStatusText(status: EventStatus | number): string {
  switch (status) {
    case EventStatus.Draft: return 'Nháp';
    case EventStatus.Published: return 'Đã xuất bản';
    case EventStatus.Ongoing: return 'Đang diễn ra';
    case EventStatus.Completed: return 'Đã kết thúc';
    case EventStatus.Cancelled: return 'Đã hủy';
    case EventStatus.Archived: return 'Đã lưu trữ';
    default: return 'Không xác định';
  }
}