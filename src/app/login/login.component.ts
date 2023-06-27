import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DemoService } from '../demo.service';
import { BlogList } from '../data';
import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /* `form!: FormGroup;` is declaring a property named `form` of type `FormGroup`. The exclamation mark
  (`!`) is a non-null assertion operator, which tells TypeScript that the `form` property will be
  initialized at some point before it is used, even though it is currently undefined. This is useful
  when working with Angular templates, which may access component properties before they are fully
  initialized. */
  form!: FormGroup;

  accessToken: any = '';
  // refreshToken: any = '';
  data: BlogList[] = [];

  constructor(
    private _apiService: DemoService,
    private router: Router,
    private http: HttpClient
    ) {}


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }



  login() {

    this._apiService.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('auth_token', JSON.stringify(res));
        alert("Logged in successfully");
        this._apiService.setIsLoggedIn(true);
        this.router.navigate(['/userBlog']);
      },
      error: (error: HttpErrorResponse) => {
          if(error.status===401 || error){
            alert(error.error.detail || "Enter valid details");
          }
      },
    });

  }




// scroll to bottom of page

  // scrollBottom(){
  //   window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
  // }

  register() {
    this.router.navigate(['/register']);
  }
}
