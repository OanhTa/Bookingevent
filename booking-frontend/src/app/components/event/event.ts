import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventItem } from './eventItem/event-item';


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
  ngOnInit(): void {
        
  }
  searchText = '';
  selectedFilter: 'all' | 'online' | 'venue' = 'all';

  events = [
    {
      title: 'Tutorial on Canvas Painting for Beginners',
      status: 'Publish',
      startDate: '30 Jun, 2022 10:00 AM',
      ticket: 250,
      sold: 20,
      type: 'venue'
    }
  ];

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