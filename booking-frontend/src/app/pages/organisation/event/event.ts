import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventItem } from './eventItem/event-item';
import { EventService } from '../../../services/EventService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EventType } from '../../../models/EventDto';
import { SearchComponent } from '../../../components/search/search-component';


@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    CommonModule,
    EventItem,
    FormsModule,
    ButtonModule,
    SearchComponent,
  ],
  templateUrl: './event.html',
})
export class EventComponent implements OnInit {
  searchText = '';
  selectedFilter?: EventType;
  events: any[] = [];
  orgId = localStorage.getItem('organisationId');
  
  filterOptions = [
    { label: 'Tất cả', value: undefined },
    { label: 'Trực tuyến', value: EventType.Online },
    { label: 'Trực tiếp', value: EventType.Offline }
  ];

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
  
  reloadEvents() {
   if (this.orgId) {
      this.loadEvents(this.orgId);
    } 
  }

  loadEvents(orgId: string, status?: number) {
    this.eventService.getEventsByOrg(orgId, status).subscribe({
        next: (res: any[]) => {
          this.events = res;
          this.cdr.detectChanges();
      }
    });
  }
  
  filter(type?: EventType) {
    this.selectedFilter = type;
    if (this.orgId) {
      this.loadEvents(this.orgId, type)
    }
  }

  onSearchHandler(data: string) {
    this.eventService.getSearch(data)
      .subscribe({
        next: (res) => {
          this.events = res;
          this.cdr.markForCheck();
        }
      });
    }
}