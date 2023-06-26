import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogList, CreatePost, LoginResponse} from './data';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  apiUrl =
    'https://blog-api-django-rest-framework-production.up.railway.app/api/v1';

  accessToken: string = '';
  constructor(private http: HttpClient, private router: Router) {
    this.getHeaders();
    this.getAuthToken();
  }

  getAuthToken() {

  /* This code is checking if there is an item with the key 'auth_token' in the browser's local
  storage. If such an item exists, it retrieves its value and parses it as a JSON object. Then, it
  sets the value of `this.accessToken` to the value of the 'access' property of the parsed JSON
  object. This is done to get the access token needed for making authenticated requests to the API. */

    if (localStorage.getItem('auth_token')) {
      const auth_token = JSON.parse(localStorage.getItem('auth_token') || '');

      console.log(auth_token)

      this.accessToken = auth_token.access;
      console.log(this.accessToken);
    }
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
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, data);
  }

  deletePost(id: string) {
    let headers = this.getHeaders();
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['userBlog']);
    // });
    // console.log(headers)
    return this.http.delete(`${this.apiUrl}/delete/` + id, { headers });
  }

  /**
   * The function removes an auth_token from local storage.
   */
  logOut(): void {
    localStorage.removeItem('auth_token');
  }

  getBlogList() {
    this.getAuthToken();

    return this.http.get(`${this.apiUrl}/list/`);
  }

  /**
   * This function creates a new post by sending a POST request to the server with the provided data
   * and returns the response.
   * @param {any} data - The `data` parameter is of type `any` and represents the data that will be
   * sent in the HTTP POST request to the API endpoint. It could be any type of data, such as a JSON
   * object or a string.
   * @returns The `createPost` function is returning an HTTP POST request to the specified API endpoint
   * with the provided data and headers.
   */
  createPost(data: any) {
    let headers = this.getHeaders();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['userBlog']);
    });

    return this.http.post(`${this.apiUrl}/create`, data, { headers });
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
    return this.http.post(
      `${this.apiUrl}/register/`,
      newUsers
    );
  }


  getPostDetailById(postId: number) {
    return this.http.get(`${this.apiUrl}/detail/${postId}`, {
      headers: this.getHeaders(),
    });
  }


  updatePost(id: number,data:any) {
    let headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/update/` + id, data,{ headers });
  }
}
