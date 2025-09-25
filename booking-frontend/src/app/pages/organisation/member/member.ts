import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { TableComponent } from "../../../components/table/table-component";
import { SearchComponent } from "../../../components/search/search-component";
import { TableAction } from "../../../models/TableAction";
import { FormField } from "../../../models/FormField";
import { FilterFormComponent } from "../../../components/filter-form/filter-form";
import { OrganisationService } from "../../../services/OrganisationService";
import { ModalFormComponent } from "../../../components/model/form-model/model-components";
import { InviteUserDto } from "../../../models/CreateOrganisationDto";



@Component({
  selector: 'app-member',
  templateUrl: './member.html',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule,
    FormsModule, 
    TableComponent,
    ModalFormComponent
  ]
})
export class MemberComponent implements OnInit {
  members: any[] = [];
  columns: any[] = [];
  actions: TableAction<any>[] = [];

  roleSelect: any | null = null;
  showModal = false;

  showModalForm = false;
  modalTitle = '';
  modalFields : FormField[] = [
    { label: 'Bạn muốn mời thành viên nào trong nhóm?*', name: 'email', type: 'email', required: true, validators: ['required'] },
    { label: 'Bạn muốn giao vai trò gì?*', name: 'role', type: 'select'
      ,required: true, validators: ['required']
      ,options: [
      { label: 'Chủ tổ chức', value: 'owner' },
      { label: 'Người quản lý', value: 'manager' },
      { label: 'Nhân viên', value: 'staff' }
    ]},
    { 
      label: 'Gửi email hệ thống tới thành viên nhóm này*', 
      name: 'isSend', 
      type: 'checkbox', 
      options: [
        { label: 'Có', value: "1" },
        { label: 'Không', value: "0" }
      ]
    }
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
    { field: 'loginAt', header: 'Đăng nhập mới  nhất' },
    { field: 'status', header: 'Trạng thái' },
    ];

    this.actions = [
      { label: 'Bật 2FA', callback: (r) => this.showDeletePopup(r) },
      { label: 'Hoạt động', callback: (r) => this.showDeletePopup(r) },
    ];

    this.loadUserByOrg();
  }
  loadUserByOrg(){
    this.organisationService.getUsersByOrganisation(this.orgId).subscribe(
      (res)=>{
        this.members = res.data; 
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
    const a: InviteUserDto = {
      email: data.email,
      orgId: this.orgId,
      RoleInOrg: data.role,
    };
    this.organisationService.inviteMember(a).subscribe({
        next: (res) => this.loadUserByOrg()
    });
  }
}
