import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DemoService } from '../demo.service';
import { BlogList } from '../data';
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
  refreshToken: any = '';
  data: BlogList[] = [];

  constructor(private _apiService: DemoService, private router: Router) {}

 /* `ngOnInit()` is a lifecycle hook in Angular that is called after the component has been
 initialized. In this code, it is used to call the `createForm()` method, which creates a new
 instance of `FormGroup` and assigns it to the `form` property of the component. The `FormGroup` is
 used to create a form with two form controls, `username` and `password`, which are initialized with
 empty string values. This form is used to capture user input for the login process. */
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
        this.router.navigate(['/userBlog']);
      },
      error: (error: HttpErrorResponse) => {
          if(error.status===401 || error){
            alert(error.error.detail || "Enter valid details");
          }
      },
    });

  }

  scrollBottom(){
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
