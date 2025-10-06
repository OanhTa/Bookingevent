import { Component } from '@angular/core';
import { Header } from "../../../components/header/header";
import { MenuProfile } from "../../../components/menu-profile/menu-profile";

@Component({
  selector: 'app-profile-setting',
  imports: [Header, MenuProfile],
  templateUrl: './profile-setting.html',
  styleUrl: './profile-setting.css'
})
export class ProfileSetting {

}
