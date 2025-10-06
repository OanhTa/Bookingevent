import { Component } from '@angular/core';
import { Information } from "./information/information";

@Component({
  selector: 'app-profile',
  imports: [ Information],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

}
