import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { SettingsFieldsComponent } from "../../../components/settings-fields/settings-fields";
import { SettingField } from "../../../models/SettingDto";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.html',
  standalone: true,
  imports: [
    CommonModule,
    SettingsFieldsComponent
  ]
})
export class MyAccount{
  activeMenu: string = 'account';
  settings: Record<string, string | boolean> = {};

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
        { key: 'passHash', type: 'text', title: 'Mật khẩu hiện tại*'},
        { key: 'passHash', type: 'text', title: 'Mật khẩu mới*' },
        { key: 'passHash', type: 'text', title: 'Xác nhận mật khẩu mới*' },
    ],
 };
  
}