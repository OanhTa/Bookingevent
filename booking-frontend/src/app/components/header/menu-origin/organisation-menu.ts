import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrganisationService } from '../../../services/OrganisationServer';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-organisation-menu',
  templateUrl: './organisation-menu.html',
  standalone: true,
   imports: [
    CommonModule,
    RouterModule
  ],
})
export class OrganisationMenuComponent implements OnInit {
  organisations$: Observable<any[]> = of([]);

  constructor(
    private organisationService: OrganisationService,
    private cdr: ChangeDetectorRef

) {}

  ngOnInit(): void {
   const userId = JSON.parse(localStorage.getItem('account') || '{}')?.userId;
    if (userId) {
      this.organisations$ = this.organisationService.getOrganisationsByUser(userId);
    }
  }
}
