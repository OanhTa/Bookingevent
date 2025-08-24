import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { AccountGroup, AccountGroupServices } from '../../../services/AccountGroupService';
import { AccountGroupPermissionsServices } from '../../../services/AccountGroupPermissionsServices';

@Component({
  selector: 'app-role-table',
  standalone: true,
  imports: [CommonModule, FormsModule,Select],
  templateUrl: './role-table.html',
  styleUrls: ['./role-table.css']
})
export class RoleTable {
  accountGroups: AccountGroup[] = [];
  selectedGroup: AccountGroup | null = null;
  permissions: PermissionUI[] = [];
//   [
//     { module: 'Booking', actions: { view: true, add: true, edit: false, delete: false } },
//     { module: 'Event', actions: { view: true, add: false, edit: false, delete: false } },
//     { module: 'User', actions: { view: true, add: false, edit: false, delete: false } }
//   ];

  constructor(private accountGroupService: AccountGroupServices, private permissionsServices: AccountGroupPermissionsServices) {}

  ngOnInit(): void {
    this.accountGroupService.getAll().subscribe({
      next: (res) => {
        setTimeout(() => this.accountGroups = res);
      },
      error: (err) => console.error(err)
    });
    this.permissionsServices.getByAccountGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6").subscribe({
        next: (res) => {
            setTimeout(() => this.permissions = this.mapToUI(res));
        },
        error: (err) => console.error(err)
    });
  }
  private mapToUI(apiData: any[]): PermissionUI[] {
    const grouped: { [key: string]: PermissionUI } = {};

    apiData.forEach(item => {
        if (!grouped[item.formName]) {
        grouped[item.formName] = {
            module: item.formName,
            actions: { view: false, add: false, edit: false, delete: false }
        };
        }
        // set action theo api
        grouped[item.formName].actions[item.action.toLowerCase() as keyof PermissionUI['actions']] = item.allowAction;
    });

    return Object.values(grouped);
    }
}

export interface PermissionUI {
  module: string;
  actions: {
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
  };
}