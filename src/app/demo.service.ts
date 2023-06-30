import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogList, LoginResponse, BlogListResponse } from './data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  apiUrl =
    'https://blog-api-django-rest-framework-production.up.railway.app/api/v1';

  accessToken: string = '';
  refreshKeyToken: string = '';

  constructor(public http: HttpClient, private router: Router) {
    this.getHeaders();
    this.getAuthToken();
  }

  getPagination(url?: string): Observable<HttpResponse<BlogListResponse>> {
    const baseUrl = url || `${this.apiUrl}/list/`;
    return this.http.get<BlogListResponse>(baseUrl, { observe: 'response' });
  }

  getAuthToken() {
    /* This code is checking if there is an item with the key 'auth_token' in the browser's local
  storage. If such an item exists, it retrieves its value and parses it as a JSON object. Then, it
  sets the value of `this.accessToken` to the value of the 'access' property of the parsed JSON
  object. This is done to get the access token needed for making authenticated requests to the API. */

    if (localStorage.getItem('auth_token')) {
      const auth_token = JSON.parse(localStorage.getItem('auth_token') || '');

      this.accessToken = auth_token.access;
      this.refreshKeyToken = auth_token.refresh;

    }
  }

  refreshToken(): Observable<LoginResponse> {

    const refreshTokenUrl = 'https://blog-api-django-rest-framework-production.up.railway.app/api/v1/refresh/';
    const payload = {
      refreshToken: this.refreshKeyToken
    };

    return this.http.post<LoginResponse>(refreshTokenUrl, payload);
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

  getAccessToken(): string {
    return this.accessToken;
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

  getBlogList(pageNo?: number, pageSize?: number): Observable<BlogList> {
    this.getAuthToken();

    return this.http.get<BlogList>(
      `${this.apiUrl}/list/?limit=${pageSize}&page_no=${pageNo}`
    );
  }



  createPost(data: any) {
    let headers = this.getHeaders();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['userBlog']);
    });

    return this.http.post(`${this.apiUrl}/create`, data, { headers });
  }


  register(newUsers: {
    username: string;
    password: string;
    password2: string;
    email: string;
    first_name: string;
    last_name: string;
  }) {
    return this.http.post(`${this.apiUrl}/register/`, newUsers);
  }

  // refreshToken(refreshToken: string) {
  //   const refreshTokenUrl =
  //     'https://blog-api-django-rest-framework-production.up.railway.app/api/v1/login/refresh/';
  //   const body = { refreshToken: refreshToken };

  //   return this.http.post(refreshTokenUrl, body);
  // }


  // refreshToken(payload: TokenModel){
  //   return this.http.post<TokenModel>(
  //     `https://blog-api-django-rest-framework-production.up.railway.app/api/v1/login/refresh/`, payload
  //   );
  // }

  getPostDetailById(postId: number) {
    return this.http.get(`${this.apiUrl}/detail/${postId}`, {
      headers: this.getHeaders(),
    });
  }

  updatePost(id: number, data: any) {
    let headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/update/` + id, data, { headers });
  }

  private isLoggedIn: boolean = false;

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }
}
