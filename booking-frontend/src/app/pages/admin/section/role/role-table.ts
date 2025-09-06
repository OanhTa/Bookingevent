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


@Component({
  selector: 'app-role-table2',
  templateUrl: './role-table.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    PermissionsModalComponent,
    SearchComponent,
    ModalFormComponent,
    PopupComponent
  ]
})
export class RoleTable2 implements OnInit {
  roles: Role[] = [];
  roleSelect: Role | null = null;
  groupedPermissions: { [key: string]: PermissionTableItem[] } = {};
  
  showModal = false;
  dropdownOpen: string | null = null;
  groupSearch: string = '';

  constructor(
    private roleService: RoleService, 
    private permissionService: PermissionService, 
    private messageService: MessageService, 
    private cdr: ChangeDetectorRef) {}

  showModalForm = false;
  modalTitle = '';
  modalFields = [
    { label: 'Tên quyền', name: 'name', type: 'text', required: true, validators: ['required'] },
  ];
  modelFormData: any = null;
  showConfirm = false;
  rolePermission: CheckPermission[] = [];

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
    this.dropdownOpen = null;
    this.roleSelect = role;
    this.showConfirm = true;
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

  onSave(data: any) {
     if (!data) return;
      const role: any = {
        ...(this.modelFormData?.id ? { id: this.modelFormData.id } : {}),
        name: data.name,                  
      };
    if (this.modelFormData?.id) {
      this.roleService.updateRole(role.id, role).subscribe({
        next: () => {
          this.showModalForm = false;
          this.messageService.add({severity: 'success',summary: 'Cập nhật',detail: 'Quyền cập nhật thành công'});
          this.loadRoles(); 
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: `Có lỗi + ${err}` });
        }
      });
    } else {
      this.roleService.createRole(role).subscribe({
        next: () => {
          this.showModalForm = false;
          this.messageService.add({severity: 'success',summary: 'Thêm',detail: 'Thêm quyền thành công'});
          this.loadRoles();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: `Có lỗi + ${err}` });
        }
      });
    }
  }
  onDeleteConfirmed(){
    if (!this.roleSelect) return;

     this.roleService.deleteRole(this.roleSelect.id).subscribe({
      next: () => {    
        this.roles = this.roles.filter(r => r.id !== this.roleSelect!.id);
        this.messageService.add({severity: 'success',summary: 'Xóa',detail: 'Xóa quyền thành công'});
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: `Có lỗi + ${err}` });
      }
    });
  }

  onDeleteCancelled() {
    this.showConfirm = false;
  }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getAllRole().subscribe({
      next: res => { this.roles = res; this.cdr.detectChanges(); },
      error: err => console.error(err)
    });
  }

  trackByRoleId(index: number, role: Role) { return role.id; }

  openPermissionsModal(role: Role) {
    this.showModal = true;
    this.loadRolePermissions(role.id)
    this.roleSelect = role;
  }

  toggleDropdown(roleId: string) {
    this.dropdownOpen = this.dropdownOpen === roleId ? null : roleId;
  }
}
