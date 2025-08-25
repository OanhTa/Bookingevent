import { Component, Injectable, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Account, AccountServices } from '../../../services/AccountServices';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  providers: [AccountServices],
  templateUrl: './user-table.html',
  styleUrls: ['./user-table.css']
})
export class UserTable implements OnInit{
  account!: Observable<Account[]>;

  constructor(private accountServices: AccountServices) {}
  ngOnInit(): void {
    this.account = this.accountServices.getAll();
  }
}

