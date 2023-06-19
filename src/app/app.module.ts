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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserBlogComponent,
    HomeComponent,
    RegisterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
