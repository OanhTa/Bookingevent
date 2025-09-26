
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Header } from "../../components/header/header";
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/EventService';
import { CategoryService } from '../../services/CategoryService';
import { CategoryDto } from '../../models/CategoryDto';
import { EventWithDetailDto } from '../../models/EventDto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, Header, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  eventDtos: EventWithDetailDto[] = [];
  filteredEvents: EventWithDetailDto[] = [];

  categories: (CategoryDto & { id: string | number })[] = [];
  activeCategoryId: string | number = 0; // "All"

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadEvents();
    this.loadCategories();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        // console.log("Events loaded:", data);
        this.eventDtos = data;
        this.filteredEvents = [...this.eventDtos];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Lỗi khi load events:', err)
    });
  }

  loadCategories(): void {
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        // console.log("Categories loaded:", data);
        // ép kiểu id về string để khớp với event.categoryId (UUID)
        this.categories = [{ id: 0, name: 'All' }, ...data.map(c => ({ ...c, id: String(c.id) }))];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Lỗi khi load categories:', err)
    });
  }

  filterByCategory(cat: CategoryDto & { id: string | number }): void {
    this.activeCategoryId = cat.id;

    if (cat.id === 0) {
      this.filteredEvents = [...this.eventDtos];
    } else {
      this.filteredEvents = this.eventDtos.filter(ev => Number(ev.categoryId) === cat.id);
    }
    console.log("Filtered events:", this.filteredEvents);
    this.cdr.detectChanges();
  }

  getCategoryName(categoryId: string | undefined): string {
    if (!categoryId) return '';
    const cat = this.categories.find(c => c.id === Number(categoryId));
    return cat ? cat.name : '';
  }
}

