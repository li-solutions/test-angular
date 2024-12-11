import { Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { hasRoleGuard } from './has-role.guard';
import { UserRoles, Routes as RoutesEnum } from './constants';
import { LoginComponent } from './login/login.component';
import { PageUnavailableComponent } from './page-unavailable/page-unavailable.component';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: RoutesEnum.HOME,
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: RoutesEnum.POSTS,
    component: PostsComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [UserRoles.ADMIN],
    },
  },
  {
    path: `${RoutesEnum.POSTS}/:id`,
    component: PostComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [UserRoles.ADMIN],
    },
  },
  {
    path: RoutesEnum.SIGN_IN,
    component: LoginComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [],
    },
  },
  {
    path: RoutesEnum.SIGN_UP,
    component: RegisterComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [],
    },
  },
  {
    path: RoutesEnum.UNAVAILABLE,
    component: PageUnavailableComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
