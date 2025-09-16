import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component } from "@angular/core";
import { AppSettingService } from "../../../../../services/AppSettingService";
import { SettingField } from "../../../../../models/SettingDto";
import { SettingsFieldsComponent } from "../../../../../components/settings-fields/settings-fields";

@Component({
  selector: 'app-setting-email',
  templateUrl: './email-settings.html',
  standalone: true,
  imports: [
    CommonModule,
    SettingsFieldsComponent
  ]
})
export class EmailSettings{
  prefix = 'App.Email';
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
        { key: 'DisplayName', type: 'text', title: 'Mặc định từ tên hiển thị *'},
        { key: 'DefaultAddress', type: 'text', title: 'Mặc định từ địa chỉ *' },
        { key: 'Host', type: 'text', title: 'Host' },
        { key: 'Port', type: 'text', title: 'Port*' },
        { key: 'EnableSSL', type: 'checkbox', title: 'Enable ssl' },
        { key: 'UseDefaultLogin', type: 'checkbox', title: 'Use default credentials' }
      ],
  };

  saveSettings(type: string) {
    const arr: any = [];
    Object.keys(this.settings).forEach(key => {
      if (this.settings[key] != null) {
        arr.push({
          name: `${this.prefix}.${key}`,
          value: String(this.settings[key]),
        })
      }
    });
    this.appSettingService.setValues(arr).subscribe();
  }

}