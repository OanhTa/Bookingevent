import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AccountSettings } from "./AccountSettings/account-settings";
import { IdentitySettings } from "./IdentitySettings/identity-settings";
import { EmailSettings } from "./EmailSettings/email-settings";
import { AppSettingService } from "../../../../services/AppSettingService";

@Component({
  selector: 'app-setting-section',
  templateUrl: './setting-section.html',
  standalone: true,
  imports: [
    CommonModule,
    AccountSettings,
    IdentitySettings,
    // EmailSettings
  ]
})
export class SettingSection{
  activeMenu: string = 'account';
}