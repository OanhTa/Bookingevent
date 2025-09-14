import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component } from "@angular/core";
import { AppSettingService } from "../../../../../services/AppSettingService";
import { SettingField } from "../../../../../models/SettingDto";
import { SettingsFieldsComponent } from "../../../../../components/settings-fields/settings-fields";

@Component({
  selector: 'app-setting-account',
  templateUrl: './account-settings.html',
  standalone: true,
  imports: [
    CommonModule,
    SettingsFieldsComponent
  ]
})
export class AccountSettings{
  prefix = 'App.Account';
  settings: Record<string, string| boolean> = {};

  constructor(
    private appSettingService: AppSettingService,
    private cdr: ChangeDetectorRef
  ){}
  ngOnInit(): void {
    this.loadSettings();
  }
  loadSettings() {
    this.appSettingService.GetByPrefix(this.prefix).subscribe(data => {
        this.settings = data;
        for (const key of Object.keys(this.settings)) {
            if (this.settings[key] === 'true') this.settings[key] = true;
            if (this.settings[key] === 'false') this.settings[key] = false;
        }
        this.cdr.detectChanges();
    });
  }

  fields: Record<string, SettingField[]> = {
      general: [
        { key: 'IsSelfRegistrationEnabled', type: 'checkbox', title: 'Cho phép tự đăng ký', subtitle: 'Người dùng có thể tự tạo tài khoản mới mà không cần quản trị viên.' },
        { key: 'EnableLocalLogin', type: 'checkbox', title: 'Cho phép đăng ký và đăng nhập bằng tài khoản nội bộ', subtitle: 'Nếu tắt, chỉ có thể đăng nhập bằng phương thức bên ngoài như Google, Facebook...' },
        { key: 'PreventEmailEnumeration', type: 'checkbox', title: 'Ngăn dò tìm email', subtitle: 'Bật để tránh lộ thông tin người dùng qua thông báo lỗi đăng nhập.' }
      ]
  };

  saveSettings(type: string) {
    console.log("Saving settings for:", type, this.settings);
  }

}