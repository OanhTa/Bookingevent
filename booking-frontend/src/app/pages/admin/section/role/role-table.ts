import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionsModalComponent } from '../../../../components/model/permissions-model/permissions-model';
import { Role, RoleService } from '../../../../services/RoleServices';
import { CheckPermission, PermissionService, PermissionTableItem } from '../../../../services/PermissionService';
import { SearchComponent } from '../../../../components/search/search-component';
import { ModalFormComponent } from '../../../../components/model/form-model/model-components';
import { MessageService } from 'primeng/api';
import { PopupComponent } from '../../../../components/popup/popup-component';
import { TableAction } from '../../../../models/TableAction';
import { TableComponent } from '../../../../components/table/table-component';
import { ButtonModule } from 'primeng/button';
import { FormField } from '../../../../models/FormField';


@Component({
  selector: 'app-role-table2',
  templateUrl: './role-table.html',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule,
    FormsModule, 
    TableComponent,
    PermissionsModalComponent,
    SearchComponent,
    ModalFormComponent,
    PopupComponent
  ]
})
export class RoleTable2 implements OnInit {
  roles: Role[] = [];
  columns: any[] = [];
  actions: TableAction<Role>[] = [];

  roleSelect: Role | null = null;
  groupedPermissions: { [key: string]: PermissionTableItem[] } = {};
  
  showModal = false;
  groupSearch: string = '';

  constructor(
    private roleService: RoleService, 
    private permissionService: PermissionService, 
    private messageService: MessageService, 
    private cdr: ChangeDetectorRef) {}

  showModalForm = false;
  modalTitle = '';
  modalFields : FormField[] = [
    { label: 'Tên quyền', name: 'name', type: 'text', required: true, validators: ['required'] },
  ];
  modelFormData: any = null;
  showConfirm = false;
  rolePermission: CheckPermission[] = [];
  currentAction = ''

  loadRolePermissions(roleId: string) {
    this.permissionService.getRolePermissions(roleId).subscribe({
      next: res => {
        this.rolePermission = res;
        this.cdr.detectChanges(); 
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Lỗi tải role permission: ${err}` });
      }
    });
  }
  showDeletePopup(role: any) {
    this.roleSelect = role;
    this.showConfirm = true;
  }

  ngOnInit(): void {
    this.columns = [
      { field: 'name', header: 'Tên quyền' },
      { field: 'userCount', header: 'Số lượng' }
    ];

    this.actions = [
      { label: 'Sửa', callback: (r) => this.openEdit(r) },
      { label: 'Xóa', callback: (r) => this.showDeletePopup(r) },
      { label: 'Phân quyền', callback: (r) => this.openPermissionsModal(r) },
      { label: 'Di chuyển người dùng', callback: (r) => this.openMove(r) },
    ];

    this.loadRoles(); 
  }

  onSearchHandler(keyword: string) {
    this.roleService.getSearchKey(keyword).subscribe((res: any) => {
      this.roles = res
      this.cdr.detectChanges();
    });
  }

  openAdd() {
    this.modalTitle = 'Thêm quyền';
    this.modelFormData = {};
    this.showModalForm = true;
  }

  openEdit(role: any) {
    this.modalTitle = 'Sửa quyền';
    this.modelFormData = { ...role };
    this.showModalForm = true;
  }

  openMove(role: any) {
    this.modalTitle = `Di chuyển tất cả người dùng`;
    this.modalFields  = [
      { 
        label: `Di chuyển tất cả người dùng có vai trò ${role.name} đến`, 
        name: 'role', 
        type: 'select',   
        required: true, 
        validators: ['required'],
        options:this.roles.map(r => ({
          label: r.name,
          value: r.id
        }))
      },
    ];
    this.currentAction = 'move-user'
    this.modelFormData = { ...role };
    this.showModalForm = true;
  }

  onSave(data: any) {
     if(this.currentAction === 'move-user'){
      this.roleService.moveUsers(this.modelFormData.id, data.role).subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err)
      });
      return;
     }
     if (!data) return;
      const role: any = {
        ...(this.modelFormData?.id ? { id: this.modelFormData.id } : {}),
        name: data.name,                  
      };
    if (this.modelFormData?.id) {
      this.roleService.updateRole(role.id, role).subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err)
      });
    } else {
      this.roleService.createRole(role).subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err)
      });
    }
  }
  onDeleteConfirmed(){
    if (!this.roleSelect) return;

     this.roleService.deleteRole(this.roleSelect.id).subscribe({
      next: (res) => {    
        this.roles = this.roles.filter(r => r.id !== this.roleSelect!.id);
        this.handleSuccess(res)
      },
      error: (err) => this.handleError(err)
    });
  }

  onDeleteCancelled() {
    this.showConfirm = false;
  }

  loadRoles() {
    this.roleService.getAllRole().subscribe({
      next: res => { this.roles = res.data; this.cdr.detectChanges(); },
      error: err => console.error(err)
    });
  }

  openPermissionsModal(role: Role) {
    this.showModal = true;
    this.loadRolePermissions(role.id)
    this.roleSelect = role;
  }
  private handleSuccess(res: any) {
    this.showModalForm = false;
    this.messageService.add({severity: 'success',summary: 'Thành công',detail: res.message})
    this.loadRoles();
  }

  private handleError(err: any) {
    this.messageService.add({severity: 'error',summary: 'Lỗi', detail: err.error?.message || 'Có lỗi xảy ra'})
  }
}
