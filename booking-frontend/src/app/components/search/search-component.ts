import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search-component.html',
  imports: [CommonModule, FormsModule]
})
export class SearchComponent {
  searchText: string = '';

  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchText.trim());
  }
}
