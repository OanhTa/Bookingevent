import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionsModalComponent } from '../../../../components/model/permissions-model/permissions-model';
import { Role, RoleService } from '../../../../services/RoleServices';
import { PermissionTableItem } from '../../../../services/PermissionService';
import { SearchComponent } from '../../../../components/search/search-component';


@Component({
  selector: 'app-role-table2',
  templateUrl: './role-table.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    PermissionsModalComponent,
    SearchComponent
  ]
})
export class RoleTable2 implements OnInit {
  roles: Role[] = [];
  roleSelect: Role | null = null;
  groupedPermissions: { [key: string]: PermissionTableItem[] } = {};
  permissionGroups: any[] = [
    { name: 'IdentityManagement', displayName: 'Identity Management' },
    { name: 'AuditLogging', displayName: 'Audit Logging' }
  ];

  showModal = false;
  dropdownOpen: string | null = null;
  groupSearch: string = '';

  constructor(private roleService: RoleService, private cdr: ChangeDetectorRef) {}

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
    this.roleSelect = role;
    this.groupedPermissions = this.groupPermissions(this.roleSelect.rolePermissions);
  }

  groupPermissions(permissions: any[]): { [key: string]: PermissionTableItem[] } {
    const grouped: { [key: string]: PermissionTableItem[] } = {};
    permissions.forEach(p => {
      const parts = p.permissionName.split('.');
      if (parts.length < 3) return;
      const entity = parts[1];
      const action = parts[2];
      if (!grouped[entity]) grouped[entity] = [];
      grouped[entity].push({ name: p.permissionName, action, isGranted: p.isGranted || false });
    });
    return grouped;
  }

  onPermissionChange(perm: PermissionTableItem) {
    console.log('Permission changed:', perm);
  }

  toggleDropdown(roleId: string) {
    this.dropdownOpen = this.dropdownOpen === roleId ? null : roleId;
  }
}
