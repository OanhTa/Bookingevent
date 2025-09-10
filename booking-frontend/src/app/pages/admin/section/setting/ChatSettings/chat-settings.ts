import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component } from "@angular/core";
import { AppSettingService } from "../../../../../services/AppSettingService";
import { SettingField } from "../../../../../models/SettingDto";
import { SettingsFieldsComponent } from "../../../../../components/settings-fields/settings-fields";

@Component({
  selector: 'app-setting-chat',
  templateUrl: './chat-settings.html',
  standalone: true,
  imports: [
    CommonModule,
    SettingsFieldsComponent
  ]
})
export class ChatSettings{
  prefix = 'App.Chat';
  settings: Record<string, string | boolean> = {};

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
      default: [
        { key: 'AllowDeleteMessages', type: 'checkbox', title: 'Cho phép người dùng xóa tin nhắn', subtitle: 'Người dùng có thể tự tạo tài khoản mới mà không cần quản trị viên.' },
        { key: 'AllowDeleteConversations', type: 'checkbox', title: 'Cho phép người dùng xóa cuộc trò chuyện', subtitle: 'Nếu tắt, chỉ có thể đăng nhập bằng phương thức bên ngoài như Google, Facebook...' },
      ],
  };

  saveSettings(type: string) {
    console.log("Saving settings for:", type, this.settings);
    // TODO: gọi API
  }

}