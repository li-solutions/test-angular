import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { hasRoleGuard } from './has-role.guard';
import { Role } from './role';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN],
    },
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];
