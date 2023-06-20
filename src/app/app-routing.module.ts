import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserBlogComponent } from './userBlog/userBlog.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UpdateViewComponent } from './update-view/update-view.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: '',
    component: HomeComponent,
    pathMatch:'full'
  },
  {
    path: 'userBlog',
    component: UserBlogComponent,
  },
  {
    path : 'register',
    component: RegisterComponent,
  },
  {
    path: 'updateView',
    component: UpdateViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
