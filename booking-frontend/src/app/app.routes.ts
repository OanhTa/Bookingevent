import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { AuthGuard } from './auth.guard';


import { Register } from './pages/register/register';
import { Organisation } from './pages/organisation/organisation';

import { AddEvent } from './pages/add-event/add-event';
import { AddOnnlineEvent } from './pages/add-online-event/add-online-event';
import { AddVenueEvent } from './pages/add-venue-event/add-venue-event';
import { UserTable } from './pages/admin/table/user-table/user-table';
import { RoleTable2 } from './pages/admin/table/role-table/role-table';
import { AuditLogComponent } from './pages/admin/table/auditlog/audit-log';

export const routes: Routes = [
    { path: '', component: Home},
    // { path: 'admin', component: Admin, canActivate: [AuthGuard], data: { accountGroup: 'Admin' } },
    { 
        path: 'admin', 
        component: Admin,  
        children: [
            { path: 'dashbord', component: AuditLogComponent },
            { path: 'users', component: UserTable },
            { path: 'roles', component: RoleTable2 },
            { path: '', redirectTo: 'users', pathMatch: 'full' } 
        ]
    },
    { path: 'organisation', component: Organisation},
    { path: 'login', component: Login},
    { path: 'register', component: Register},
    { path: 'create', component: AddEvent},
    { path: 'create-online-event', component: AddOnnlineEvent},
    { path: 'create-venue-event', component: AddVenueEvent}
];
