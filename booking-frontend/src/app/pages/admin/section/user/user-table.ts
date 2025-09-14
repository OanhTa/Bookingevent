import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PermissionsModalComponent } from '../../../../components/model/permissions-model/permissions-model';
import { UserServices } from '../../../../services/UserServices';
import { CheckPermission, Permission, PermissionService } from '../../../../services/PermissionService';
import { SearchComponent } from '../../../../components/search/search-component';
import { ModalFormComponent } from '../../../../components/model/form-model/model-components';
import { PopupComponent } from '../../../../components/popup/popup-component';
import { FormField } from '../../../../models/FormField';
import { MessageService } from 'primeng/api';
import { User } from '../../../../models/UserDto';
import { PermissionsConst } from '../../../../../constants/permissions';
import { FilterFormComponent } from '../../../../components/filter-form/filter-form';
import { TableAction } from '../../../../models/TableAction';
import { TableComponent } from '../../../../components/table/table-component';
import { ButtonModule } from 'primeng/button';
import { ExportService } from '../../../../services/ExportService';
import { ModalTabFormComponent } from '../../../../components/model/form-tab-model/model-tab-components';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    TableModule, 
    TableComponent,
    CommonModule,
    ButtonModule,
    PermissionsModalComponent,
    SearchComponent,
    ModalFormComponent,
    ModalTabFormComponent,
    PopupComponent,
    FilterFormComponent
  ],
  templateUrl: './user-table.html'
})
export class UserTable implements OnInit{
  permissions: Permission[] = [];

  users: User[] = [];
  columns: any[] = [];
  actions: TableAction<User>[] = [];

  showModalPermissions = false;
  showModalUser = false;
  
  showModalForm = false;
  modalTitle = '';
  modalFields : FormField[] = [
    { label: 'Họ và tên', name: 'userName', type: 'text', required: true, validators: ['required'] },
    { label: 'Mật khẩu', name: 'passwordHash', type: 'password', required: true, validators: ['required', 'minlength'] },
    { label: 'Email', name: 'email', type: 'email', required: true, validators: ['required', 'email'] },
    { label: 'Số điện thoại', name: 'phoneNumber', type: 'text' },
    { label: 'Địa chỉ', name: 'address', type: 'text' },
    { label: 'Vai trò', name: 'roles', type: 'checkbox', options: [] }
  ];
  activeFields : FormField[] = []
  modelFormData: any = null;
  currentAction: 'add' | 'edit' | 'setPassword'| 'view' | 'lock' = 'add';

  showConfirm = false;
  selectedUser: any = null;
  constPer = PermissionsConst;
  userPermissions: CheckPermission[] = [];
  fieldErrors: any = {};

  showFilter   = false;
  filterFields = [
    { key: 'userName', label: 'Tên đăng nhập', type: 'text' },
    { key: 'name', label: 'Họ và tên', type: 'text' },
    { key: 'creationDate', label: 'Ngày tạo', type: 'date' },
    { key: 'modificationDate', label: 'Ngày xác thực', type: 'date' },
    { key: 'phoneNumber', label: 'Số điện thoại', type: 'text' },
    { key: 'email', label: 'Địa chỉ email', type: 'text' },
    { key: 'active', label: 'Hoạt động', type: 'select', options: [
      { name: 'Có', code: true },
      { name: 'Không', code: false },
    ]},
    { key: 'emailConfirmed', label: 'Email xác thực', type: 'select', options: [
      { name: 'Có', code: true },
      { name: 'Không', code: false },
    ]},
    { key: 'lockoutEnabled', label: 'Khóa', type: 'select', options: [
      { name: 'Khóa', code: true },
      { name: 'Không khóa', code: false },
    ]},
    { key: 'id', label: 'Id', type: 'text' },
  ];

  constructor(
    private userServices: UserServices, 
    public  permissionService: PermissionService, 
    private messageService: MessageService,
    private exportService: ExportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.columns = [
      { field: 'userName', header: 'Tên' },
      { field: 'email', header: 'Email' },
      { field: 'roles', header: 'Quyền' },
      { field: 'phone', header: 'Số điện thoại' },
      { field: 'address', header: 'Địa chỉ' },
      { field: 'lockoutEnabled', header: 'Cho Khóa' },
      { field: 'emailConfirmed', header: 'Xác thực email' },
      { field: 'accessFailedCount', header: 'Lượt đăng nhập sai' },
      { field: 'createdAt', header: 'Ngày tạo' },
    ];

    this.actions = [
      { label: 'Xem chi tiết', callback: (u) => this.openViewDetail(u) },
      { label: 'Sửa', callback: (u) => this.openEdit(u) },
      { label: 'Xóa', callback: (u) => this.showDeletePopup(u) },
      { label: 'Khóa', callback: (u) => this.openLock(u) },
      { label: 'Phân quyền', callback: (u) => this.openPermissionsModal(u) },
      { label: 'Đặt lại mật khẩu', callback: (u) => this.openSetPassword(u) },
    ];

    this.loadUsers();
  }

  loadUserPermissions(userId: string) {
    this.permissionService.getUserPermissions(userId).subscribe({
      next: res => {
        this.userPermissions = res;
        this.cdr.detectChanges(); 
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Lỗi tải user permission: ${err}` });
      }
    });
  }

  showDeletePopup(user: any) {
    this.selectedUser = user;
    this.showConfirm = true;
  }

  onFilterSubmit(filterData: { [key: string]: any }) {
    this.userServices.getSearch(filterData).subscribe((res: any) => {
      this.users = res.data
      this.cdr.detectChanges();
    });
  }

  onSearchHandler(keyword: string) {
    this.userServices.getSearchKey(keyword).subscribe((res: any) => {
      this.users = res.data
      this.cdr.detectChanges();
    });
  }

  openViewDetail(data: any) {
    this.modalTitle = `Xem chi tiết - ${data.userName}`;
    this.modelFormData = { ...data };
    this.showModalForm = true;

    this.activeFields = this.modalFields.filter(f => f.name !== 'passwordHash');
    this.currentAction = 'view';
  }

  openAdd() {
    this.modalTitle = 'Thêm người dùng';
    this.showModalUser = true 
    this.modelFormData = {};;
    this.currentAction = 'add';
  }

  openEdit(data: any) {
    this.modalTitle = `Sửa - ${data.userName}`;
    this.showModalUser = true;
    this.modelFormData = { ...data };
    this.currentAction = 'edit';
  }

   openSetPassword(data: any) {
    this.modalTitle = `Đổi mật khẩu - ${data.userName}`;
    const {passwordHash, ...rest } = data
    this.modelFormData = rest;
    this.showModalForm = true 
    
    this.activeFields = this.modalFields.filter(f => f.name == 'passwordHash');
    this.currentAction = 'setPassword';
  }

  openLock(data: any) {
    this.modalTitle = `Khóa - ${data.userName}`;
    const {passwordHash, ...rest } = data
    this.modelFormData = rest;
    this.showModalForm = true 
    
    this.activeFields = [{ label: 'Ngày kết thúc khóa', name: 'lockoutEnd', type: 'date' }]
    this.currentAction = 'lock';
  }

  onDeleteConfirmed(){
     this.userServices.delete(this.selectedUser.id).subscribe({
      next: (res) => {    
        this.users = this.users.filter(u => u.id !== this.selectedUser.id);
        this.handleSuccess(res)
      },
      error: (err) => this.handleError(err)
    });
  }

  onDeleteCancelled() {
    this.showConfirm = false;
  }

  loadUsers(){
    this.userServices.getAll().subscribe(res => {
      this.users = res.data; 
      this.cdr.detectChanges();
    });
  }

  openPermissionsModal(user: any) {
      this.showModalPermissions = true;
      this.loadUserPermissions(user.id);
      this.selectedUser = user;
  }

  onSave(data: any) {
    if (!data || this.currentAction === 'view') return;
    if (!data) return;
    if (this.currentAction === 'add') {
      const user = {
        ...data,
        roleIds: data.roles,
        // organisationIds: data.roles,
      };
      this.userServices.create(user).subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err)
      });
    }
    else if (this.currentAction === 'edit') {
      const user = {
        ...data,
        id: this.modelFormData.id,
        roleIds: data.roles,
        // organisationIds: data.roles,
      };
      this.userServices.update(user.id, user).subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err)
      });
    }
    else if (this.currentAction === 'setPassword') {
      const payload = {
        id: this.modelFormData.id,
        PasswordHash: data.passwordHash
      };
      this.userServices.setPassword(payload.id, payload).subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err)
      });
    }
    else if (this.currentAction === 'lock') {
      const lock = {
        id: this.modelFormData.id,
        date: data.date
      };
      this.userServices.lockUser(lock.id, lock.date).subscribe();
    }
  }

  private handleSuccess(res: any) {
    this.showModalForm = false;
    this.messageService.add({severity: 'success',summary: 'Thành công',detail: res.message})
    this.loadUsers();
  }

  private handleError(err: any) {
    this.messageService.add({severity: 'error',summary: 'Lỗi', detail: err.error?.message || 'Có lỗi xảy ra'})
  }

  exportExcel() {
    this.exportService.exportExcel(this.users, 'users-exportexcel');
  }
}

