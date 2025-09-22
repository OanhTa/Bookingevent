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
import { UserTable } from './pages/admin/section/user/user-table';
import { RoleTable2 } from './pages/admin/section/role/role-table';
import { AuditLogComponent } from './pages/admin/section/auditlog/audit-log';
import { SettingSection } from './pages/admin/section/setting/setting-section';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password';
import { MyAccount } from './pages/admin/my-account/my-account';
import { EventDetail } from './pages/event-detail/event-detail';
export const routes: Routes = [
    {
        path: '',
        component: Home,
        
    },
    {
        path: 'admin',
        component: Admin,
        canActivate: [AuthGuard],
        data: { role: 'Administrator' },
        children: [
            { path: 'dashbord', component: AuditLogComponent },
            { path: 'users', component: UserTable },
            { path: 'roles', component: RoleTable2 },
            { path: 'audit-log', component: AuditLogComponent },
            { path: 'settings', component: SettingSection },
            { path: 'my-account', component: MyAccount },
            { path: '', redirectTo: 'users', pathMatch: 'full' }
        ]
    },
    { path: 'organisation/:id', component: Organisation },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'create', component: AddEvent },
    { path: 'create-online-event', component: AddOnnlineEvent },
    { path: 'create-venue-event', component: AddVenueEvent },
    {path:'eventDetail/:id',component:EventDetail}

];
