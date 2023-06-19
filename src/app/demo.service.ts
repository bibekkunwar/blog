import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogList, CreatePost, LoginResponse, RegisterResponse } from './data';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DemoService {
  apiUrl =
    'https://blog-api-django-rest-framework-production.up.railway.app/api/v1';

  accessToken: string = '';
  constructor(private http: HttpClient, private router: Router) {
    /* `const auth_token= JSON.parse(localStorage.getItem('token') || '')` is retrieving the value of
    the 'token' key from the browser's local storage and parsing it as a JSON object. If the value is
    not found or is empty, it sets the value of `auth_token` to an empty string. */
     const auth_token= JSON.parse(localStorage.getItem('auth_token') || '')
    this.accessToken = auth_token.access
    console.log("access token", this.accessToken)
  }



  /**
   * This function returns an object containing an authorization header with a bearer token.
   * @returns The function `getHeaders()` is returning an object `headers` which contains an
   * `Authorization` property with a value of `'Bearer '` concatenated with the value of
   * `this.accessToken`.
   */
  getHeaders() {
    let headers = {
      Authorization: 'Bearer ' + this.accessToken,
    };
    return headers;
  }

  /**
   * This function sends a POST request to the login endpoint with a username and password and returns a
   * LoginResponse.
   * @param data - An object containing two properties:
   * @returns The `login()` method is returning an HTTP POST request to the API endpoint for user login,
   * with the provided `data` object containing the `username` and `password` properties. The response
   * is expected to be of type `LoginResponse`.
   */
  login(data: { username: string; password: string }) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`,data);
  }

  /**
   * The function removes an access token from local storage.
   */
  logOut(): void{
    localStorage.removeItem(this.accessToken);
  }

  getBlogList() {
    // let headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/list/`);
  }


  createPost(data: any) {
    let headers = this.getHeaders();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['userBlog']);
    });
    return this.http.post(`${this.apiUrl}/create`, data, {headers});

  }

  /* The `register()` method is a function that sends a POST request to the API endpoint for user
  registration. It takes an object `newUsers` as a parameter, which contains the following
  properties: `username`, `password`, `password2`, `email`, `first_name`, and `last_name`. These
  properties are used to create a new user account on the server. The response is expected to be of
  type `RegisterResponse`. */
  register(newUsers: {
    username: string;
    password: string;
    password2: string;
    email: string;
    first_name: string;
    last_name: string;
  }) {
    return this.http.post<RegisterResponse>(
      `${this.apiUrl}/register/`,newUsers);
  }


}
