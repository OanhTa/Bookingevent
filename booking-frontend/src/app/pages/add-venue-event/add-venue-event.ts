import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { StepperComponent } from '../../components/Stepper/stepper-component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventService } from '../../services/EventService';
import { FormDetail } from './form-details/form-detail';
import { FormTickets } from './form-tickets/form-tickets';


@Component({
  selector: 'app-add-venue-event',
  standalone: true,
  imports: [
    Header,
    CommonModule,
    StepperComponent,
    FormDetail,
    FormTickets,
  ],
  templateUrl: './add-venue-event.html',
})
export class AddVenueEvent{
  activeStep = 1;
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private eventService: EventService,
    private messageService: MessageService, 
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      detail: this.fb.group({}),
      tickets: this.fb.array([]),
      setting: this.fb.group({})
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

  onSave() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return
    }
    const orgId = localStorage.getItem('organisationId');
     if (this.eventForm.valid && this.activeStep === 3) {
      const dto = {
        ...this.eventForm.value.detail,
        ticketTypes: this.eventForm.value.tickets,
        organisationId: orgId
        // ...this.eventForm.value.setting
      };

      console.log('Final DTO:', dto);

      this.eventService.createEvent(dto).subscribe({
        next: () => this.messageService.add({severity: 'success',summary: 'Create',detail: 'Event create successfully'}),
        error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: `Something went wrong + ${err}` })
      });
    }
  }

}
