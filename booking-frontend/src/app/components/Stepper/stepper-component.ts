// stepper.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper-component.html',
  imports: [CommonModule],
})
export class StepperComponent {
  @Input() activeStep = 1;             
  @Output() stepChange = new EventEmitter<number>(); 

  goToStep(step: number) {
    this.stepChange.emit(step);
  }
}
