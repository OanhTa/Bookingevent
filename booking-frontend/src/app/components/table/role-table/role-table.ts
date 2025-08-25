import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { AccountGroup, AccountGroupServices } from '../../../services/AccountGroupService';
import { AccountGroupPermissionsServices } from '../../../services/AccountGroupPermissionsServices';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-role-table',
  standalone: true,
  imports: [CommonModule, FormsModule,Select,Dialog, ButtonModule, InputTextModule],
  templateUrl: './role-table.html',
  styleUrls: ['./role-table.css']
})
export class RoleTable {
  selectedGroupId!: string;
  accountGroups: AccountGroup[] = [];
  selectedGroup: AccountGroup | null = null;
  permissions: PermissionUI[] = [];

  visible: boolean = false;

  constructor(private accountGroupService: AccountGroupServices, private permissionsServices: AccountGroupPermissionsServices) {}
  showDialog() {
    this.visible = true;
  }
  ngOnInit(): void {
    this.accountGroupService.getAll().subscribe({
      next: (res) => {
        this.accountGroups = res;
        if (res.length > 0) {
          this.onSelectGroup(res[0]);
        }
      },
      error: (err) => console.error(err)
    });
  }
  onGroupChange(event: any) {
    this.permissionsServices.getByAccountGroup(event.value).subscribe({
      next: (res) => {
          this.permissions = this.mapToUI(res);
        }
    });
  }

  private onSelectGroup(group: AccountGroup): void {
      this.selectedGroup = group;
      this.permissionsServices.getByAccountGroup(group.id).subscribe({
        next: (res) => {
          Promise.resolve().then(() => {
            this.permissions = this.mapToUI(res);
          });
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