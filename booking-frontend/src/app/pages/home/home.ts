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
  activeCategoryId: string | number = 0; // 0 = All

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadCategories();
  }

  //  Load danh sách sự kiện
  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.eventDtos = data;
        this.filteredEvents = [...this.eventDtos];
        this.cdr.detectChanges();
      },
      error: () => {} // Không in lỗi ra terminal
    });
  }

  //  Load danh sách danh mục
  loadCategories(): void {
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categories = [
          { id: 0, name: 'All' },
          ...data.map(c => ({ ...c, id: String(c.id) }))
        ];
        this.cdr.detectChanges();
      },
      error: () => {"lỗi"} 
    });
  }

  //  Lọc theo danh mục
  filterByCategory(cat: CategoryDto & { id: string | number }): void {
    this.activeCategoryId = cat.id;
    if (cat.id === 0) {
      this.filteredEvents = [...this.eventDtos];
    } else {
      this.filteredEvents = this.eventDtos.filter(
        ev => String(ev.categoryId) === String(cat.id)
      );
    }
    this.cdr.detectChanges();
  }

  //  Lấy tên danh mục
  getCategoryName(categoryId: string | undefined): string {
    if (!categoryId) return '';
    const cat = this.categories.find(c => String(c.id) === String(categoryId));
    return cat ? cat.name : '';
  }
}
