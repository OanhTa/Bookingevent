import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionTableItem } from '../../../services/PermissionService';
import { PermissionGroup } from '../../../models/PermissionDto';


@Component({
  selector: 'app-permissions-modal',
  templateUrl: './permissions-model.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PermissionsModalComponent {
  @Input() permissionGroups: PermissionGroup[] = [];
  @Input() groupedPermissions: { [key: string]: PermissionTableItem[] } = {};
  @Output() cancel = new EventEmitter();


  groupSearch: string = '';
  selectedGroup: PermissionGroup | null = null;
  close() {
    this.cancel.emit(); // không truyền gì
  }
  ngOnInit() {
    this.selectedGroup = this.permissionGroups[0] || null;
  }

  selectGroup(group: PermissionGroup) {
    this.selectedGroup = group;
  }

  searchGroup() {
    console.log('Searching group:', this.groupSearch);
  }

  onPermissionChange(perm: PermissionTableItem) {
    console.log('Permission changed:', perm);
  }

  save() {
    console.log('Saved permissions:', this.permissionGroups);
    alert('Permissions saved!');
  }

}
