import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { StepperComponent } from '../../components/Stepper/stepper-component';
import { FormDetail } from './form-details/form-detail';
import { CommonModule } from '@angular/common';
import { FormTickets } from './form-tickets/form-tickets';


@Component({
  selector: 'app-add-online-event',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    StepperComponent,
    FormDetail,
    FormTickets
  ],
  templateUrl: './add-online-event.html',
})
export class AddOnnlineEvent{
  activeStep = 1;

  nextStep() {
    if (this.activeStep < 3) this.activeStep++;
  }

  prevStep() {
    if (this.activeStep > 1) this.activeStep--;
  }

  onStepChange(step: number) {
    this.activeStep = step; // nhận event từ Stepper
  }
}
