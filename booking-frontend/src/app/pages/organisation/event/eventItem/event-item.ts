import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TicketServer } from '../../../../services/TicketServer';
import { User } from '../../../../models/UserDto';


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
    ) {}
    viewCustomers(ticketId: string) {
      this.ticketServer.getCustomersByServer(ticketId).subscribe(res => {
        this.customers = res;
      });
    }
}