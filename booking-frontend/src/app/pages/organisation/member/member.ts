import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { TableComponent } from "../../../components/table/table-component";
import { TableAction } from "../../../models/TableAction";
import { FormField } from "../../../models/FormField";
import { OrganisationService } from "../../../services/OrganisationService";
import { ModalFormComponent } from "../../../components/model/form-model/model-components";
import { InviteUserDto } from "../../../models/CreateOrganisationDto";
import { getRoleText, getStatusText } from "../../../utils/organisation-user-enum";
import { ProgressSpinner } from "primeng/progressspinner";
import { BlockUI } from "primeng/blockui";

@Component({
  selector: 'app-member',
  templateUrl: './member.html',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule,
    FormsModule, 
    TableComponent,
    ModalFormComponent,
    ProgressSpinner,BlockUI
  ]
})
export class MemberComponent implements OnInit {
  members: any[] = [];
  columns: any[] = [];
  actions: TableAction<any>[] = [];

  loading = false

  roleSelect: any | null = null;
  showModal = false;

  showModalForm = false;
  modalTitle = '';
  modalFields : FormField[] = [
    { label: 'Bạn muốn mời thành viên nào trong nhóm?*', name: 'email', type: 'email', required: true, validators: ['required'] },
    { label: 'Bạn muốn giao vai trò gì?*', name: 'role', type: 'select', required: true, validators: ['required']
      ,options: [
      { label: 'Chủ tổ chức', value: '0' },
      { label: 'Người quản lý', value: '1' },
      { label: 'Nhân viên', value: '2' }
    ]}
  ];
  modelFormData: any = null;
  showConfirm = false;
  currentAction = ''

  orgId = localStorage.getItem('organisationId') || "";
  
  constructor(
    public organisationService : OrganisationService,
    public cdr : ChangeDetectorRef
  ){}
  showDeletePopup(role: any) {
    this.roleSelect = role;
    this.showConfirm = true;
  }

  ngOnInit(): void {
   this.columns = [
    { field: 'userName', header: 'Tên' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Vai trò' },
    { field: 'status', header: 'Trạng thái' },
    { field: 'loginAt', header: 'Đăng nhập mới  nhất' },
    ];

    this.actions = [
      { label: 'Khóa tạm thời', callback: (r) => this.showDeletePopup(r) },
      { label: 'Xóa', callback: (r) => this.showDeletePopup(r) },
    ];

    this.loadUserByOrg();
  }
  loadUserByOrg(){
    this.organisationService.getUsersByOrganisation(this.orgId).subscribe(
      (res: any)=>{
        this.members = res.data.map( (m: any)  => ({
          ...m,
          role: getRoleText(m.role),
          status: getStatusText(m.status)
        }));

        this.cdr.detectChanges()
      } 
    )
  }

  openAdd() {
    this.modalTitle = 'Thêm thành viên';
    this.modelFormData = {};
    this.showModalForm = true;
  }

  onSave(data: any) {
    this.loading = true
    const a: InviteUserDto = {
      email: data.email,
      orgId: this.orgId,
      RoleInOrg: Number(data.role),
    };
    this.organisationService.inviteMember(a).subscribe({
        next: (res) => {
          this.loadUserByOrg()
          this.showModalForm = false;
          this.loading = false
        }
    });
  }
}
