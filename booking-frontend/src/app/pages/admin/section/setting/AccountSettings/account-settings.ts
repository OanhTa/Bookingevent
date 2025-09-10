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
  tab: string = 'general';
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
      ],
      twofactor: [
        { key: 'EnableTwoFactor', type: 'checkbox', title: 'Bật xác thực 2 lớp', subtitle: 'Yêu cầu nhập mã OTP ngoài mật khẩu để đăng nhập.' },
        { key: 'RememberDevice', type: 'checkbox', title: 'Ghi nhớ thiết bị', subtitle: 'Cho phép bỏ qua xác thực 2 lớp trên thiết bị đã tin cậy.' }
      ],
      captcha: [
        { key: 'EnableCaptcha', type: 'checkbox', title: 'Bật Captcha', subtitle: 'Hiển thị Captcha để chống bot khi đăng nhập hoặc đăng ký.' },
        { key: 'CaptchaOnLogin', type: 'checkbox', title: 'Captcha khi đăng nhập', subtitle: 'Bắt buộc nhập Captcha ở màn hình đăng nhập.' },
        { key: 'CaptchaOnRegister', type: 'checkbox', title: 'Captcha khi đăng ký', subtitle: 'Bắt buộc nhập Captcha ở màn hình đăng ký.' }
      ]
  };

  saveSettings(type: string) {
    console.log("Saving settings for:", type, this.settings);
    // TODO: gọi API
  }

}