import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../../../services/RoleServices';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-modal-tab-form',
  standalone: true,   
  templateUrl: './model-tab-components.html',
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule
  ]
})
export class ModalTabFormComponent implements OnInit {
  @Input() currentAction: string = '';
  @Input() modalTitle: string = '';

  private _formData: any;
  @Input() set formData(value: any) {
    this._formData = value;
  }

  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  currentTab = 0;

  tabs = [
    { label: 'Thông tin', fields: [
      'userName', 'name', 'surname', 'password', 'email', 'phone', 
      'active', 'lockoutEnd', 'emailConfirmed', 'phoneConfirmed', 'forcePasswordChange'
    ] },
    { label: 'Quyền', fields: ['roles'] }
  ];

  availableRoles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>_\-]+$/)]],
      fullName: [''],
      passwordHash: ['', this.currentAction === 'add' ? Validators.required : null],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      active: [true],
      lockoutEnd: [''],
      emailConfirmed: [false],
      phoneConfirmed: [false],
      forcePasswordChange: [false],
      roles: [[]],
      organizationUnits: [[]]
    });
    this.loadRoles();

    if (this._formData) {
      this.form.patchValue({
        ...this._formData,
        roles: this._formData.userRoles?.map((r: any) => r.roleId) || []
      });
    }
  }

  loadRoles() {
    this.roleService.getAllRole().subscribe(res => {
      this.availableRoles = res.data
      this.cdr.detectChanges();
    });
  }

  selectTab(index: number) {
    this.currentTab = index;
  }

  onRoleChange(event: Event, roleId: string) {
    const checked = (event.target as HTMLInputElement).checked;
    const roles = this.form.value.roles ?? [];

    if (checked) {
      this.form.patchValue({ roles: [...roles, roleId] });
    } else {
      this.form.patchValue({ roles: roles.filter((id : any)=> id !== roleId) });
    }
  }

  getDate(iso: string | null): string {
    return iso ? iso.split('T')[0] : '';
  }

  getTime(iso: string | null): string {
    return iso ? iso.split('T')[1].slice(0,5) : '';
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return; 
    }
    
    if (this.form.value) {
      this.save.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
