import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { TableComponent } from "../../../components/table/table-component";
import { SearchComponent } from "../../../components/search/search-component";
import { TableAction } from "../../../models/TableAction";
import { MessageService } from "primeng/api";
import { FormField } from "../../../models/FormField";
import { FilterFormComponent } from "../../../components/filter-form/filter-form";



@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule,
    FormsModule, 
    TableComponent,
    SearchComponent,
    FilterFormComponent
  ]
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  columns: any[] = [];
  actions: TableAction<any>[] = [];

  roleSelect: any | null = null;
  showModal = false;
  groupSearch: string = '';

  filterFields = [
    { key: 'orderDate', label: 'Ngày', type: 'date'},
    { key: 'status', label: 'Trạng thái', type: 'select', options: [
        { name: 'Thanh toán', code: '0' },
        { name: 'Đã hủy', code: '1' },
        { name: 'Hoàn trả', code: '2' },
    ]},
    { key: 'totalAmount', label: 'Tổng tiền', type: 'text'},
  ];

  showModalForm = false;
  modalTitle = '';
  modalFields : FormField[] = [
    { label: 'Tên quyền', name: 'name', type: 'text', required: true, validators: ['required'] },
  ];
  modelFormData: any = null;
  showConfirm = false;
  currentAction = ''

  showDeletePopup(role: any) {
    this.roleSelect = role;
    this.showConfirm = true;
  }

  ngOnInit(): void {
   this.columns = [
    { field: 'orderId', header: 'Mã đơn hàng' },
    { field: 'customerName', header: 'Khách hàng' },
    { field: 'orderDate', header: 'Ngày đặt' },
    { field: 'totalAmount', header: 'Tổng tiền' },
    { field: 'status', header: 'Trạng thái' }
    ];

    this.orders = [
    { orderId: 'DH001', customerName: 'Nguyen Van A', orderDate: '2025-09-23', totalAmount: 1200000, status: 'Đã thanh toán' },
    { orderId: 'DH002', customerName: 'Tran Thi B', orderDate: '2025-09-22', totalAmount: 850000, status: 'Chờ xác nhận' },
    { orderId: 'DH003', customerName: 'Le Van C', orderDate: '2025-09-21', totalAmount: 540000, status: 'Đang giao' },
    { orderId: 'DH004', customerName: 'Pham Thi D', orderDate: '2025-09-20', totalAmount: 2300000, status: 'Hủy' },
    { orderId: 'DH005', customerName: 'Hoang Van E', orderDate: '2025-09-19', totalAmount: 1750000, status: 'Đã thanh toán' }
    ];

    this.actions = [
      { label: 'Xem chi tiết', callback: (r) => this.showDeletePopup(r) },
      { label: 'Xuất hóa đơn', callback: (r) => this.showDeletePopup(r) },
    ];

  }

  onSearchHandler(keyword: string) {
    
  }
}
