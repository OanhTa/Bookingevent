import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventItem } from './eventItem/event-item';
import { EventService } from '../../../services/EventService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    CommonModule,
    EventItem
  ],
  templateUrl: './event.html',
})
export class EventComponent implements OnInit {
  searchText = '';
  selectedFilter: 'all' | 'online' | 'venue' = 'all';
  events: any[] = [];
    
  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
   const orgId = localStorage.getItem('organisationId');
   if (!orgId) {
     this.router.navigate(['/login']);
    } else {
      this.eventService.getEventsByOrg(orgId).subscribe({
        next: (res) => {
          this.events = res,
          this.cdr.detectChanges();
        }
      })
    }
  }
  
  get totalEvents() {
    return this.events.length;
  }
  get onlineEvents() {
    return this.events.filter(e => e.type === 'online').length;
  }
  get venueEvents() {
    return this.events.filter(e => e.type === 'venue').length;
  }

  get filteredEvents() {
    let filtered = this.events;

    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(e => e.type === this.selectedFilter);
    }

    if (this.searchText.trim()) {
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        e.status.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    return filtered;
  }

  filter(type: 'all' | 'online' | 'venue') {
    this.selectedFilter = type;
  }
}