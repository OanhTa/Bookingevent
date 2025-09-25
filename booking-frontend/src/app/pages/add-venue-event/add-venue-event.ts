import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { StepperComponent } from '../../components/Stepper/stepper-component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventService } from '../../services/EventService';
import { FormDetail } from './form-details/form-detail';
import { FormTickets } from './form-tickets/form-tickets';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-venue-event',
  standalone: true,
  imports: [
    Header,
    CommonModule,
    StepperComponent,
    FormDetail,
    FormTickets,
    ButtonModule
  ],
  templateUrl: './add-venue-event.html',
})
export class AddVenueEvent{
  eventId: string | null = null;
  activeStep = 1;
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private eventService: EventService,
    private messageService: MessageService, 
  ) {}

  ngOnInit(): void {
    const detailGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      thumbnail: [''],
      categoryId: [null, [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      location: [''],
      description: ['', [Validators.required, Validators.minLength(10)]],

      venue: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    });

    detailGroup.valueChanges.subscribe(values => {
      const { venue, address1, city, state } = values;
      const location = [venue, address1, city, state]
        .filter(x => !!x)
        .join(', ');
      detailGroup.get('location')?.setValue(location, { emitEvent: false });
    });

    this.eventForm = this.fb.group({
      detail: detailGroup,
      tickets: this.fb.array([
        this.fb.group({
          name: ['', [Validators.required]],
          customName: [''],
          price: ['', [Validators.required, Validators.min(0)]],
          quantity: ['', [Validators.required, Validators.min(1)]]
        })
      ]),
    });

    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.loadEvent(this.eventId);
    }
  }

  loadEvent(id: string) {
    this.eventService.getEventById(id).subscribe({
      next: (res) => {
        this.eventForm.patchValue({
          detail: {
            name: res.name,
            thumbnail: res.thumbnail,
            categoryId: res.categoryId,
            date: res.date ? new Date(res.date) : null,
            time: res.time,
            duration: res.duration,
            description: res.eventDetail?.description || '',
          }
        });

        const ticketsArray = this.fb.array(
          res.ticketTypes.map((t: any) =>
            this.fb.group({
              id: [t.id],
              name: [t.name],
              price: [t.price, [Validators.required, Validators.min(0)]],
              quantity: [t.quantity, [Validators.required, Validators.min(1)]]
            })
          )
        );
        this.eventForm.setControl('tickets', ticketsArray);
      }
    });
  }

  nextStep() {
    if (this.activeStep < 3) this.activeStep++;
  }

  prevStep() {
    if (this.activeStep > 1) this.activeStep--;
  }

  onStepChange(step: number) {
    this.activeStep = step; 
  }

  onSave(status: number) {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return
    }
    const orgId = localStorage.getItem('organisationId');
     if (this.eventForm.valid && this.activeStep === 3) {
      const dto = {
        ...this.eventForm.value.detail,
        ticketTypes: this.eventForm.value.tickets,
        organisationId: orgId,
        status: status
      };

      this.eventService.createEvent(dto).subscribe({
        next: () => this.messageService.add({severity: 'success',summary: 'Create',detail: 'Event create successfully'}),
        error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: `Something went wrong + ${err}` })
      });
    }
  }

}
