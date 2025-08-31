import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PermissionsModalComponent } from '../../../../components/model/permissions-model/permissions-model';
import { User, UserServices } from '../../../../services/UserServices';
import { Permission, PermissionService, PermissionTableItem } from '../../../../services/PermissionService';
import { SearchComponent } from '../../../../components/search/search-component';
import { ModalFormComponent } from '../../../../components/model/form-model/model-components';


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
    ModalFormComponent
  ],
  templateUrl: './user-table.html',
  styleUrls: ['./user-table.css']
})
export class UserTable implements OnInit{
  permissions: Permission[] = [];

  account!: Observable<User[]>;
  dropdownOpen: string | null = null;
  showModal = false;
  groupedPermissions: { [key: string]: PermissionTableItem[] } = {};
  
  permissionGroups: any[] = [
      { name: 'IdentityManagement', displayName: 'Identity Management' },
      { name: 'AuditLogging', displayName: 'Audit Logging' }
    ];

  constructor(
    private userServices: UserServices, 
    private permissionService: PermissionService,
    private cdr: ChangeDetectorRef
  ) {}

  showModalForm = false;
  modalTitle = '';
  modalFields = [
    { label: 'User name', name: 'userName', type: 'text', required: true },
    { label: 'Password', name: 'password', type: 'password', required: true },
    { label: 'Email address', name: 'email', type: 'email' },
    { label: 'Phone number', name: 'phoneNumber', type: 'text' },
    { label: 'Admin', name: 'Admin', type: 'checkbox' },
    { label: 'User', name: 'User', type: 'checkbox' },
    { label: 'Origintation', name: 'Origintation', type: 'checkbox' },
  ];
  currentCategory: any = null;

  openAdd() {
    this.modalTitle = 'Add User';
    this.currentCategory = {};
    this.showModalForm = true;
  }

  openEdit(cat: any) {
    this.modalTitle = 'Edit User';
    this.currentCategory = { ...cat };
    this.showModalForm = true;
  }

  onSave(data: any) {
   
  }
  ngOnInit(): void {
    this.account = this.userServices.getAll();
  }

  toggleDropdown(accountId: string) {
    this.dropdownOpen = this.dropdownOpen === accountId ? null : accountId;
  }
  loadPermissions() {
    this.permissionService.getPermissions().subscribe({
      next: res => { 
        this.permissions = res;
        this.groupedPermissions = this.groupPermissions(this.permissions);
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }
  openPermissionsModal() {
      this.showModal = true;
      this.loadPermissions();
    }

  groupPermissions(permissions: any[]): { [key: string]: PermissionTableItem[] } {
    const grouped: { [key: string]: PermissionTableItem[] } = {};
    permissions.forEach(p => {
      const parts = p.name.split('.');
      if (parts.length < 3) return;
        const entity = parts[1];
        const action = parts[2];
      if (!grouped[entity]) grouped[entity] = [];
        grouped[entity].push({ name: p.permissionName, action, isGranted: p.isGranted || false });
      });
    return grouped;
  }
}

