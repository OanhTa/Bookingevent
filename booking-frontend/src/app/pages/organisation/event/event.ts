import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventItem } from './eventItem/event-item';
import { EventService } from '../../../services/EventService';
import { EventType, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { getStatusText } from '../../../utils/event-status.helper';


@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    CommonModule,
    EventItem,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './event.html',
})
export class EventComponent implements OnInit {
  searchText = '';
  selectedFilter?: EventType;
  events: any[] = [];
  orgId = localStorage.getItem('organisationId');
  
  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
   if (!this.orgId) {
     this.router.navigate(['/login']);
    } else {
      this.loadEvents(this.orgId);
    }
  }

  loadEvents(orgId: string, status?: number) {
    if (!this.orgId) {
     this.router.navigate(['/login']);
    } else {
      this.eventService.getEventsByOrg(orgId, status).subscribe({
        next: (res: any[]) => {
          this.events = res;
          this.cdr.detectChanges();
        }
      });
    }
  }
  
  filter(type?: EventType) {
    this.selectedFilter = type;
    if (this.orgId) {
      this.loadEvents(this.orgId, type)
    }
  }

  onSearch() {
    const keyword = this.searchText.trim()|| '';
    this.eventService.getSearch(keyword)
      .subscribe({
        next: (res) => {
          this.events = res
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Search error:', err);
        }
      });
    }
}