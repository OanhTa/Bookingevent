import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrganisationService } from '../../../services/OrganisationService';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { map, Observable, of } from 'rxjs';

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
    private router: Router,
    private cdr: ChangeDetectorRef

) {}

  ngOnInit(): void {
   const userId = JSON.parse(localStorage.getItem('account') || '{}')?.userId;
    if (userId) {
      this.organisations$ = this.organisationService.getOrganisationsByUser(userId).pipe(
        map(res => res.data)
      );
    }
  }

  selectOrganisation(org: any) {
    const orgId = org.organisation.id; 
    localStorage.setItem('organisationId', orgId);
    window.location.reload()
    
    this.router.navigate(['/organisation']);
  }

}
