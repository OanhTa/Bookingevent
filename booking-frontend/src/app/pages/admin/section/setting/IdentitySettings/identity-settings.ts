import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component } from "@angular/core";
import { AppSettingService } from "../../../../../services/AppSettingService";
import { SettingsFieldsComponent } from "../../../../../components/settings-fields/settings-fields";
import { SettingField } from "../../../../../models/SettingDto";

@Component({
  selector: 'app-setting-identity',
  templateUrl: './identity-settings.html',
  standalone: true,
  imports: [
    CommonModule,
    SettingsFieldsComponent
  ]
})
export class IdentitySettings{
  tab: string = 'policy';
  prefix = 'App.Identity';
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
    policy: [
      { 
        key: 'MinLength', 
        type: 'number', 
        title: 'Chiều dài yêu cầu', 
        subtitle: 'Số ký tự tối thiểu mà mật khẩu phải có.', 
        min: 0, max: 100 
      },
      { 
        key: 'UniqueChars', 
        type: 'number', 
        title: 'Số ký tự duy nhất bắt buộc', 
        subtitle: 'Số lượng ký tự khác nhau tối thiểu mà mật khẩu phải chứa.', 
        min: 0, max: 100 
      },
      { 
        key: 'RequireNonAlphanumeric', 
        type: 'checkbox', 
        title: 'Yêu cầu ký tự đặc biệt', 
        subtitle: 'Bật nếu mật khẩu phải có ít nhất một ký tự đặc biệt (ví dụ: @, #, $, %).' 
      },
      { 
        key: 'RequireLowercase', 
        type: 'checkbox', 
        title: 'Yêu cầu ký tự chữ thường', 
        subtitle: 'Bật nếu mật khẩu bắt buộc phải có ít nhất một chữ cái viết thường (a-z).' 
      },
      { 
        key: 'RequireUppercase', 
        type: 'checkbox', 
        title: 'Yêu cầu ký tự viết hoa', 
        subtitle: 'Bật nếu mật khẩu bắt buộc phải có ít nhất một chữ cái viết hoa (A-Z).' 
      },
      { 
        key: 'RequireDigit', 
        type: 'checkbox', 
        title: 'Chữ số bắt buộc', 
        subtitle: 'Bật nếu mật khẩu bắt buộc phải có ít nhất một chữ số (0-9).' 
      }
    ],

    lock: [
      { 
        key: 'LockoutDuration', 
        type: 'number', 
        title: 'Thời gian khóa (giây)', 
        subtitle: 'Khoảng thời gian (tính bằng giây) mà tài khoản bị khóa sau khi vượt quá số lần đăng nhập thất bại.', 
        min: 0, max: 500 
      },
      { 
        key: 'MaxFailedAccess', 
        type: 'number', 
        title: 'Số lần truy cập không thành công tối đa', 
        subtitle: 'Số lần nhập sai mật khẩu tối đa trước khi tài khoản bị khóa.', 
        min: 0, max: 100 
      }
    ],

    verification: [
      { 
        key: 'VerifyEmailLogin', 
        type: 'checkbox', 
        title: 'Xác minh email để đăng nhập', 
        subtitle: 'Yêu cầu người dùng xác minh email trước khi đăng nhập.' 
      },
      { 
        key: 'VerifyEmailRegister', 
        type: 'checkbox', 
        title: 'Xác minh email để đăng ký', 
        subtitle: 'Yêu cầu người dùng xác minh email khi tạo tài khoản mới.' 
      },
      { 
        key: 'AllowPhoneConfirm', 
        type: 'checkbox', 
        title: 'Cho phép xác nhận số điện thoại', 
        subtitle: 'Bật nếu hệ thống hỗ trợ xác minh số điện thoại của người dùng.' 
      },
      { 
        key: 'VerifyPhoneLogin', 
        type: 'checkbox', 
        title: 'Xác minh số điện thoại để đăng nhập', 
        subtitle: 'Yêu cầu người dùng xác minh số điện thoại trước khi đăng nhập.' 
      }
    ],

    profile: [
      { 
        key: 'AllowChangeEmail', 
        type: 'checkbox', 
        title: 'Cho phép thay đổi địa chỉ email', 
        subtitle: 'Bật nếu người dùng được phép thay đổi địa chỉ email của tài khoản.' 
      },
      { 
        key: 'AllowChangeUserName', 
        type: 'checkbox', 
        title: 'Cho phép thay đổi tên người dùng', 
        subtitle: 'Bật nếu người dùng được phép thay đổi tên đăng nhập của tài khoản.' 
      }
    ]
  };

  saveSettings(type: string) {
    console.log("Saving settings for:", type, this.settings);
  }
}