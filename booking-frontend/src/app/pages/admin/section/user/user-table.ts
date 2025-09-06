import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PermissionsModalComponent } from '../../../../components/model/permissions-model/permissions-model';
import { UserServices } from '../../../../services/UserServices';
import { CheckPermission, Permission, PermissionService } from '../../../../services/PermissionService';
import { SearchComponent } from '../../../../components/search/search-component';
import { ModalFormComponent } from '../../../../components/model/form-model/model-components';
import { PopupComponent } from '../../../../components/popup/popup-component';
import { RoleService } from '../../../../services/RoleServices';
import { FormField } from '../../../../models/FormField';
import { MessageService } from 'primeng/api';
import { User } from '../../../../models/UserDto';
import { PermissionsConst } from '../../../../../constants/permissions';
import { FilterFormComponent } from '../../../../components/filter-form/filter-form';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    TableModule, 
    CommonModule,
    PermissionsModalComponent,
    SearchComponent,
    ModalFormComponent,
    PopupComponent,
    FilterFormComponent
  ],
  templateUrl: './user-table.html',
  styleUrls: ['./user-table.css']
})
export class UserTable implements OnInit{
  permissions: Permission[] = [];

  users: User[] = [];
  dropdownOpen: string | null = null;
  showModalPermissions = false;
  
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
  currentAction: 'add' | 'edit' | 'setPassword'| 'view' = 'add';

  showConfirm = false;
  selectedUser: any = null;
  constPer = PermissionsConst;
  userPermissions: CheckPermission[] = [];
  fieldErrors: any = {};

  showFilter   = false;
  filterFields = [
    { key: 'role', label: 'Vai trò', type: 'select', options: [
      { name: 'Quản trị', code: 'admin' },
      { name: 'Người dùng', code: 'user' },
      { name: 'Khách', code: 'guest' },
    ]},
    { key: 'userName', label: 'Tên định danh', type: 'text' },
    { key: 'name', label: 'Họ và tên', type: 'text' },
    { key: 'creationDate', label: 'Ngày tạo', type: 'date' },
    { key: 'modificationDate', label: 'Ngày xác thực', type: 'date' },
    { key: 'phoneNumber', label: 'Số điện thoại', type: 'text' },
    { key: 'email', label: 'Địa chỉ email', type: 'text' },
    { key: 'active', label: 'Hoạt động', type: 'select', options: [
      { name: 'Có', code: 'true' },
      { name: 'Khồng', code: 'false' },
    ]},
    { key: 'emailConfirmed', label: 'Email xác thực', type: 'select', options: [
      { name: 'Có', code: 'true' },
      { name: 'Không', code: 'false' },
    ]},
    { key: 'lock', label: 'Khóa', type: 'select', options: [
      { name: 'Khóa', code: 'true' },
      { name: 'Không khóa', code: 'false' },
    ]},
    { key: 'id', label: 'Id', type: 'text' },
  ];

  constructor(
    private userServices: UserServices, 
    public  permissionService: PermissionService, 
    private messageService: MessageService,
    private roleService: RoleService,
    private cdr: ChangeDetectorRef
  ) {}

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

  loadRoles() {
    this.roleService.getAllRole().subscribe(res => {
      const roleField = this.modalFields.find(f => f.name === 'roles');
      if (roleField) {
        roleField.options = res.map(r => ({
          label: r.name,
          value: r.id
        }));
      }
      this.cdr.detectChanges();
    });
  }
  showDeletePopup(user: any) {
    this.dropdownOpen = null;
    this.selectedUser = user;
    this.showConfirm = true;
  }

  openViewDetail(data: any) {
    this.modalTitle = `Xem chi tiết - ${data.userName}`;
    this.modelFormData = { ...data };
    this.dropdownOpen = null;
    this.showModalForm = true;

    this.activeFields = this.modalFields.filter(f => f.name !== 'passwordHash');
    this.currentAction = 'view';
  }

  openAdd() {
    this.loadRoles();
    this.modalTitle = 'Thêm người dùng';
    this.modelFormData = {};
    this.showModalForm = true 
    
    this.activeFields = [...this.modalFields];
    this.currentAction = 'add';
  }

  openEdit(data: any) {
    this.loadRoles();
    this.modalTitle = `Sửa - ${data.userName}`;
    this.modelFormData = { ...data };
    this.dropdownOpen = null;
    this.showModalForm = true;

    this.activeFields = this.modalFields.filter(f => f.name !== 'passwordHash');
    this.currentAction = 'edit';
  }

   openSetPassword(data: any) {
    this.modalTitle = `Đổi mật khẩu - ${data.userName}`;
    const {passwordHash, ...rest } = data
    this.modelFormData = rest;
    this.dropdownOpen = null;
    this.showModalForm = true 
    
    this.activeFields = this.modalFields.filter(f => f.name == 'passwordHash');
    this.currentAction = 'setPassword';
  }

  openLock(data: any) {
    this.modalTitle = `Khóa - ${data.userName}`;
    const {passwordHash, ...rest } = data
    this.modelFormData = rest;
    this.dropdownOpen = null;
    this.showModalForm = true 
    
    this.activeFields = [{ label: 'Ngày kết thúc khóa', name: 'lock', type: 'text' }]
    this.currentAction = 'setPassword';
  }

  onDeleteConfirmed(){
     this.userServices.delete(this.selectedUser.id).subscribe({
      next: () => {    
        this.users = this.users.filter(u => u.id !== this.selectedUser.id);
        this.handleSuccess('Xóa')
      },
      error: (err) => this.handleError(err)
    });
  }

  onDeleteCancelled() {
    this.showConfirm = false;
  }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(){
    this.userServices.getAll().subscribe(res => {
      this.users = res; 
      this.cdr.detectChanges();
    });
  }
  toggleDropdown(usersId: string) {
    this.dropdownOpen = this.dropdownOpen === usersId ? null : usersId;
  }
  
  openPermissionsModal(user: any) {
      this.showModalPermissions = true;
      this.loadUserPermissions(user.id);
      this.selectedUser = user;
      this.dropdownOpen = null;
  }

  onSave(data: any) {
    if (!data || this.currentAction === 'view') return;
    if (!data) return;

    if (this.currentAction === 'add') {
      const user = {
        userName: data.userName,
        email: data.email,
        phone: data.phoneNumber ?? '',
        address: data.address ?? '',
        passwordHash: data.passwordHash, // backend sẽ hash
        userRoles: [],
        userPermissions: []
      };
      this.userServices.create(user).subscribe({
        next: () => this.handleSuccess('Thêm'),
        error: (err) => this.handleError(err)
      });
    }

    else if (this.currentAction === 'edit') {
      const user = {
        id: this.modelFormData.id,
        userName: data.userName,
        email: data.email,
        phone: data.phoneNumber ?? '',
        address: data.address ?? '',
        userRoles: [],
        userPermissions: []
      };
      this.userServices.update(user.id, user).subscribe({
        next: () => this.handleSuccess('Sửa'),
        error: (err) => this.handleError(err)
      });
    }

    else if (this.currentAction === 'setPassword') {
      const payload = {
        id: this.modelFormData.id,
        PasswordHash: data.passwordHash
      };
      this.userServices.SetPassword(payload.id, payload).subscribe({
        next: () => this.handleSuccess('Mật khẩu cập nhật'),
        error: (err) => this.handleError(err)
      });
    }
  }

  private handleSuccess(action: string) {
    this.showModalForm = false;
    this.messageService.add({
      severity: 'success',
      summary: action,
      detail: `${action.toLowerCase()} người dùng thành công`
    });
    this.loadUsers();
  }

  private handleError(err: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: `Có lỗi: ${err}`
    });
  }
}

