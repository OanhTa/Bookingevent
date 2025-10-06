import { Component } from '@angular/core';
import { MenuProfile } from "../../../components/menu-profile/menu-profile";
import { Header } from "../../../components/header/header";

@Component({
  selector: 'app-information',
  imports: [MenuProfile, Header], 
  templateUrl: './information.html',
  styleUrl: './information.css'
})
export class Information {

}
