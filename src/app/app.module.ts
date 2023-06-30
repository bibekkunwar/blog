import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserBlogComponent } from './userBlog/userBlog.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DemoService } from './demo.service';
import { UpdateViewComponent } from './update-view/update-view.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserBlogComponent,
    HomeComponent,
    RegisterComponent,
    UpdateViewComponent,
    DetailPostComponent,
    NavbarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    NgxPaginationModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
