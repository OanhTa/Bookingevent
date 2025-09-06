import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup-component.html',
  imports: [CommonModule],
})
export class PopupComponent {
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Bạn có chắc chắn không?';
  @Input() show: boolean = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
    this.show = false;
  }

  onCancel() {
    this.cancel.emit();
    this.show = false;
  }
}
