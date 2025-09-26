export interface CheckoutDto {
  // Liên kết với Event
  eventId: string;          // Angular dùng string GUID

  // Thông tin người mua
  ho: string;               // họ
  ten: string;              // tên
  email: string;            // email
  address: string;          // địa chỉ
  quocGia: string;          // quốc gia
  thanhpho: string;         // thành phố
  zip: string;              // mã bưu điện

  // Thông tin thanh toán
  soThe: string;            // số thẻ
  ngayHetHan: string;       // hạn thẻ MM/YY
  cvv: string;              // mã CVV
  maGiamGia?: string;       // mã giảm giá (tùy chọn)

  // Đơn hàng
  soLuong: number;          // số lượng vé
  tongTien: number;         // tổng tiền

  // UserId (tùy chọn, lấy từ token/session)
  userId?: number;
}
