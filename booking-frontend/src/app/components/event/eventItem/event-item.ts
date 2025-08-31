import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './event-item.html',
})
export class EventItem implements OnInit {
    
    ngOnInit(): void {
        
    }
}