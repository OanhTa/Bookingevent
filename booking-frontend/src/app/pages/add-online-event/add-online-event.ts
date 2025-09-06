import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { StepperComponent } from '../../components/Stepper/stepper-component';
import { FormDetail } from './form-details/form-detail';
import { CommonModule } from '@angular/common';
import { FormTickets } from './form-tickets/form-tickets';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/EventServer';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-add-online-event',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    StepperComponent,
    FormDetail,
    FormTickets,
    ReactiveFormsModule
  ],
  templateUrl: './add-online-event.html',
})
export class AddOnnlineEvent{
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
      ticket: this.fb.group({}), 
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
     if (this.eventForm.valid && this.activeStep === 3) {
      const dto = {
        ...this.eventForm.value.detail,
        ...this.eventForm.value.ticket,
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
