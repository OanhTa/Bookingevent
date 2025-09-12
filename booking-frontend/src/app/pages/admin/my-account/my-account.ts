import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { SettingsFieldsComponent } from "../../../components/settings-fields/settings-fields";
import { SettingField } from "../../../models/SettingDto";
import { FileUpload } from 'primeng/fileupload';
import { UploadServices } from "../../../services/UploadService";
import { MessageService } from "primeng/api";
import { ProgressSpinner } from "primeng/progressspinner";
import { BlockUI } from "primeng/blockui";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.html',
  standalone: true,
  imports: [
    CommonModule,
    SettingsFieldsComponent,
    FileUpload,
    ProgressSpinner,BlockUI
  ]
})
export class MyAccount{
  @ViewChild(FileUpload) fileUpload!: FileUpload;
  loading = false
  activeMenu: string = 'info';
  account = JSON.parse(localStorage.getItem('account') || '{}');
  settings: Record<string, string | boolean> = { ...this.account };

  fields: Record<string, SettingField[]> = {
    default: [
        { key: 'userName', type: 'text', title: 'Tên đăng nhập'},
        { key: 'fullName', type: 'text', title: 'Họ và tên' },
        { key: 'phone', type: 'text', title: 'Số điện thoại' },
        { key: 'email', type: 'text', title: 'Email' },
    ],
    img: [
        { key: 'imgDefault', type: 'checkbox', title: 'Sử dụng hình đại diện mặc định'},
        { key: 'imgUpload', type: 'checkbox', title: 'Tải lên tập tin' },
    ],
    password: [
        { key: 'currentPass', type: 'password', title: 'Mật khẩu hiện tại*'},
        { key: 'newPass', type: 'password', title: 'Mật khẩu mới*' },
        { key: 'confirmPass', type: 'password', title: 'Xác nhận mật khẩu mới*' },
    ],
   };

  constructor(
    private uploadServices: UploadServices,
    private messageService: MessageService,
  ){}

  onUpload(event: any) {
    this.loading = true
    const file = event.files[0]; 
    const userId = JSON.parse(localStorage.getItem('account') || '{}')?.userId;
    this.uploadServices.uploadAvatar(file, userId).subscribe({
      next: () => {
        this.loading = false
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật ảnh thành công' });
        this.fileUpload.clear();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Không thể tải ảnh' })
    });
  }

  saveSettings(type: string) {
    console.log("Saving settings for:", type, this.settings);
    
  }
}