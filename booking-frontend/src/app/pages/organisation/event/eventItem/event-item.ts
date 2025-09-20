import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TicketServer } from '../../../../services/TicketServer';
import { User } from '../../../../models/UserDto';
import { EventService } from '../../../../services/EventService';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './event-item.html',
})
export class EventItem implements OnInit {
    @Input() event: any;
    customers: User[] = [];
    dropdownOpen = false;
    
    ngOnInit(): void { 

    }
    constructor(
      private ticketServer: TicketServer,
      private eventService: EventService,
      private messageService: MessageService,
    ) {}
    viewCustomers(ticketId: string) {
      this.ticketServer.getCustomersByServer(ticketId).subscribe(res => {
        this.customers = res;
      });
    }
    onDelete(){
      const eventId = this.event.id;
      this.eventService.deleteEvent(eventId).subscribe(res => this.messageService.add({severity: 'success',summary: 'Thành công',detail: 'Xóa sự kiện thành công'}));
    }
}