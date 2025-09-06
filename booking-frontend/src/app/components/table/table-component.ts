import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'table-component',
  templateUrl: 'table-component.html',
  standalone: true,
  imports: [TableModule, CommonModule]
})
export class TableComponent    {
  @Input() data: any[] = [];  
  @Input() columns: Column[] = [];    

  ngOnInit(): void {
    console.log(this.columns)
    console.log(this.data)
  }
}
