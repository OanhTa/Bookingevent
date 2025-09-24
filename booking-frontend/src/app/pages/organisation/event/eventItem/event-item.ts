import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TicketServer } from '../../../../services/TicketServer';
import { User } from '../../../../models/UserDto';
import { EventService } from '../../../../services/EventService';
import { MessageService } from 'primeng/api';
import { PopupComponent } from '../../../../components/popup/popup-component';
import { Popover } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [
    CommonModule,
    PopupComponent,
    Popover, ButtonModule
  ],
  templateUrl: './event-item.html',
})
export class EventItem implements OnInit {
    @Input() event: any;
    customers: User[] = [];
    showConfirm = false;
    
    ngOnInit(): void { 

    }
    constructor(
      private eventService: EventService,
      private messageService: MessageService,
    ) {}
   
    onDelete(){
      const eventId = this.event.id;
      this.eventService.deleteEvent(eventId).subscribe(res => this.messageService.add({severity: 'success',summary: 'Thành công',detail: 'Xóa sự kiện thành công'}));
    }
    onDeleteCancelled() {
      this.showConfirm = false;
    }
}