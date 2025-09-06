import { ChangeDetectorRef, Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckPermission, Permission, PermissionService, PermissionTableItem } from '../../../services/PermissionService';
import { MessageService } from 'primeng/api';
import { SearchComponent } from '../../search/search-component';

@Component({
  selector: 'app-permissions-modal',
  templateUrl: './permissions-model.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    SearchComponent
  ]
})
export class PermissionsModalComponent implements OnInit, OnChanges {
  groupedPermissions: { [key: string]: PermissionTableItem[] } = {};

  @Input() selected!: any;              // user/role được chọn
  @Input() entityType!: 'user' | 'role';
  @Input() checkPermissions: CheckPermission[] = [];   // quyền của user
  @Output() cancel = new EventEmitter();

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
      return {
        ...p,
        isGranted: userPerm ? userPerm.isGranted : false
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
        isGranted: p.isGranted ?? false
      });
    });
    return grouped;
  }

  close() {
    this.cancel.emit();
    this.messageService.add({severity: 'success',summary: 'Success',detail: 'You have saved changes.'});
  }

  selectGroup(group: string) {
    this.selectedGroup = group;
  }

  onPermissionChange(perm: PermissionTableItem) {
    if (!this.selected || !this.selected.id) return;

    const id = this.selected.id;

    if (this.entityType === 'user') {
      if (perm.isGranted) {
        this.permissionService.grantUserPermissions(id, [perm.name]).subscribe();
      } else {
        this.permissionService.revokeUserPermissions(id, [perm.name]).subscribe();
      }
    } else if (this.entityType === 'role') {
      if (perm.isGranted) {
        this.permissionService.grantRolePermissions(id, [perm.name]).subscribe();
      } else {
        this.permissionService.revokeRolePermissions(id, [perm.name]).subscribe();
      }
    }
  }


}
