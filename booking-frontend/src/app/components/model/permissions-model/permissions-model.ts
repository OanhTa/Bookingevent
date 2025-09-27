import { ChangeDetectorRef, Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckPermission, Permission, PermissionService, PermissionTableItem } from '../../../services/PermissionService';
import { MessageService } from 'primeng/api';
import { SearchComponent } from '../../search/search-component';
import { ButtonModule } from 'primeng/button';
import { groupViMap, permissionViMap } from '../../../utils/permission-vi-map';

@Component({
  selector: 'app-permissions-modal',
  templateUrl: './permissions-model.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    SearchComponent,
    ButtonModule
  ]
})
export class PermissionsModalComponent implements OnInit, OnChanges {
  groupedPermissions: { [key: string]: PermissionTableItem[] } = {};

  @Input() selected!: any;              // user/role được chọn
  @Input() entityType!: 'user' | 'role';
  @Input() checkPermissions: CheckPermission[] = [];   // quyền của user/role
  @Output() cancel = new EventEmitter();

  groupViMap = groupViMap
  permissionViMap = permissionViMap

  groupSearch: string = '';
  selectedGroup: string = 'IdentityManagement';
  permissions: Permission[] = [];                     // quyền gốc

  constructor(
    private permissionService: PermissionService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadPermissions(); // load quyền gốc
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['checkPermissions'] && this.permissions.length) {
      this.mergeUserPermissions();
    }
  }
  isGroupAllChecked(perms: any[]): boolean {
    return perms.length > 0 && perms.every(p => p.isGranted);
  }
  isGroupAllDisabled(perms: any[]): boolean {
    return perms.every(p => p.roleEnable);
  }

  onSearchHandler(data: any){
    this.loadPermissions();
  }

  private loadPermissions() {
    this.permissionService.getPermissions().subscribe({
      next: res => {
        this.permissions = res;
        this.mergeUserPermissions(); 
        this.cdr.detectChanges();
      },
      error: err => this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Something went wrong + ${err}`
      })
    });
  }

  private mergeUserPermissions() {
    const merged = this.permissions.map(p => {
      const userPerm = this.checkPermissions.find(up => up.name === p.name);
      const granted = userPerm ? userPerm.isGranted : false;
      return {
        ...p,
        isGranted: granted,
        originalIsGranted: granted,// lưu lại trạng thái gốc
        roleEnable: this.entityType === 'user' && userPerm?.fromRole === true
      };
    });

    this.groupedPermissions = this.groupPermissions(merged);
  }

  private groupPermissions(permissions: any[]): { [key: string]: PermissionTableItem[] } {
    const grouped: { [key: string]: PermissionTableItem[] } = {};
    permissions.forEach(p => {
      const parts = p.name.split('.');
      if (parts.length < 3) return;
      const entity = parts[1];
      const action = parts[2];
      if (!grouped[entity]) grouped[entity] = [];
      grouped[entity].push({
        name: p.name,
        action,
        isGranted: p.isGranted ?? false,
        originalIsGranted: p.isGranted ?? false,// lưu lại trạng thái gốc
        roleEnable: p.roleEnable ?? false
      });
    });
    return grouped;
  }

  close() {
    this.cancel.emit();
  }

  selectGroup(group: string) {
    this.selectedGroup = group;
  }

  onPermissionChange(perm: PermissionTableItem) {
    if (!this.selected || !this.selected.id) return;
    const entity = this.groupedPermissions[this.selectedGroup];
    if (!entity) return;

    const index = entity.findIndex(p => p.name === perm.name);
    if (index > -1) {
      entity[index].isGranted = perm.isGranted;
    }
  }

  onSave() {
    if (!this.selected || !this.selected.id) return;
    const id = this.selected.id;

    const changed: PermissionTableItem[] = [];
    Object.values(this.groupedPermissions).forEach(group => {
      group.forEach(p => {
        if (p.isGranted !== p.originalIsGranted) {
          changed.push(p);
        }
      });
    });

    const granted = changed.filter(p => p.isGranted).map(p => p.name);
    const revoked = changed.filter(p => !p.isGranted).map(p => p.name);

    if (this.entityType === 'user') {
       if (granted.length > 0) {
        this.permissionService.grantUserPermissions(id, granted).subscribe();
      }

      if (revoked.length > 0) {
        this.permissionService.revokeUserPermissions(id, revoked).subscribe();
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Cập nhật quyền cho người dùng thành công'
      });
      this.close();
    } else if (this.entityType === 'role') {
      if (granted.length > 0) {
        this.permissionService.grantRolePermissions(id, granted).subscribe();
      }

      if (revoked.length > 0) {
        this.permissionService.revokeRolePermissions(id, revoked).subscribe();
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Cập nhật quyền cho vai trò thành công'
      });
      this.close();
    }
  }
}
