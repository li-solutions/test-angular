import { Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { hasRoleGuard } from './has-role.guard';
import { Constants } from './constants';
import { LoginComponent } from './login/login.component';
import { PageUnavailableComponent } from './page-unavailable/page-unavailable.component';
import { PostComponent } from './post/post.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [Constants.ADMIN],
    },
  },
  {
    path: 'posts/:id',
    component: PostComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [Constants.ADMIN],
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [],
    },
  },
  { path: '403', component: PageUnavailableComponent },
  { path: '**', component: PageNotFoundComponent },
];
