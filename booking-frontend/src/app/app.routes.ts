import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { AuthGuard } from './auth.guard';
import { UserTable } from './components/table/user-table/user-table';
import { RoleTable } from './components/table/role-table/role-table';

export const routes: Routes = [
    { path: 'home', component: Home},
    // { path: 'admin', component: Admin, canActivate: [AuthGuard], data: { accountGroup: 'Admin' } },
    { 
        path: 'admin', 
        component: Admin,  
        children: [
            { path: 'users', component: UserTable },
            { path: 'roles', component: RoleTable },
            { path: '', redirectTo: 'users', pathMatch: 'full' } 
        ]
    },
    { path: 'login', component: Login}
];
