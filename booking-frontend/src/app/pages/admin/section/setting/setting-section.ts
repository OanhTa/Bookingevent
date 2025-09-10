import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AccountSettings } from "./AccountSettings/account-settings";
import { IdentitySettings } from "./IdentitySettings/identity-settings";
import { EmailSettings } from "./EmailSettings/email-settings";
import { ChatSettings } from "./ChatSettings/chat-settings";

@Component({
  selector: 'app-setting-section',
  templateUrl: './setting-section.html',
  standalone: true,
  imports: [
    CommonModule,
    AccountSettings,
    IdentitySettings,
    EmailSettings,
    ChatSettings
  ]
})
export class SettingSection{
  activeMenu: string = 'account';
}