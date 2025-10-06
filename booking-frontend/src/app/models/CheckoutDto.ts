export interface CheckoutDto {
  // Liên kết với Event
  event_Id: string;          // Angular dùng string GUID

  // Thông tin người mua
  ho: string;               // Họ
  ten: string;              // Tên 
  email: string;            // Email
  diachi: string;          // Địa chỉ
  quocGia: string;          // Quốc gia
  thanhpho: string;         // Thành phố
  maZip: string;              // Mã bưu điện

  // Thông tin thanh toán
  soThe: string;            // Số thẻ
  ngay_HetHan: string;       // Hạn thẻ MM/YY
  cvv: string;              // Mã CVV
  ma_Giam_Gia?: string;       // Mã giảm giá (tùy chọn)

  // Đơn hàng
  so_Luong: number;          // Số lượng vé (phải > 0)
  tong_Tien: number;         // Tổng tiền (phải > 0)

  // UserId (tùy chọn, lấy từ token/session)
   user_Id: string// Có thể là string GUID hoặc số

     eventDetail?: any;
  formData?: any;
  ticketCount?: number;
  previousTicketCount?: number;
}
