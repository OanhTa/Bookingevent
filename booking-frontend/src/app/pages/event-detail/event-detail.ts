import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/EventService';
import { Header } from '../../components/header/header';
import { CategoryService } from '../../services/CategoryService';
import { CategoryDto } from '../../models/CategoryDto';
import { EventWithDetailDto } from '../../models/EventDto';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.css']
})
export class EventDetail implements OnInit {

  eventDetail: EventWithDetailDto | null = null;
  categories: CategoryDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Lấy ID từ URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.eventService.getEventById(id).subscribe(data => {
          this.eventDetail = data;
          this.cdr.detectChanges();
        });
      }
    });

    // Lấy danh mục
    this.categoryService.getCategory().subscribe(data => {
      this.categories = data;
      this.cdr.detectChanges();
    });
  }

  // Lấy tên category từ id
  getCategoryName(categoryId: string | undefined): string {
    if (!categoryId) return '';
    const cat = this.categories.find(c => c.id === Number(categoryId));
    return cat ? cat.name : '';
  }

  // Chuyển trang ticket
  goToTicketPage(eventId: string): void {
  if (!eventId) return;
  this.router.navigate(['/ticket', eventId]);
}

  // Lấy gallery ảnh
  getGalleryImages(): string[] {
  return this.eventDetail?.eventDetail?.gallery
    ? this.eventDetail.eventDetail.gallery.split(';')
    : [];
}


  // Lấy tổng ticket còn lại
  getTotalTickets(): number {
    if (!this.eventDetail?.ticketTypes) return 0;
    return this.eventDetail.ticketTypes.reduce(
      (sum, t) => sum + (t.quantity - t.sold),
      0
    );
  }
}
