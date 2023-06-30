/* The AuthInterceptor class is an Angular HTTP interceptor that adds an authorization header to
outgoing requests and handles token refresh for expired access tokens. */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { DemoService } from '../demo.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private demoService: DemoService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authRequest = this.addAuthorizationHeader(request);
    console.log(authRequest)

    return next.handle(authRequest).pipe(
      catchError((error) => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          return this.refreshToken().pipe(
            switchMap((response) => {
              if (response.access) {
                // Update the access token in DemoService
                this.demoService.accessToken = response.access;

                // Retry the original request with the new access token
                const retryRequest = this.addAuthorizationHeader(request);
                return next.handle(retryRequest);
              } else {
                // If refreshing token fails, log out the user
                this.demoService.logOut();
                // Redirect to login page or display an error message
                // Replace the following line with your implementation
                // this.router.navigate(['/login']);
                return throwError(()=> 'Token refresh failed');
              }
            }),
            catchError((error) => {
              // If an error occurs while refreshing token, log out the user
              this.demoService.logOut();
              // Redirect to login page or display an error message
              // Replace the following line with your implementation
              // this.router.navigate(['/login']);
              return throwError(()=> 'Token refresh failed');
            })
          );
        } else {
          return throwError(()=> error);
        }
      })
    );
  }

  /**
   * The function adds an Authorization header with a Bearer token to an HTTP request if an access
   * token is available.
   * @param request - The `request` parameter is an instance of the `HttpRequest` class, which
   * represents an HTTP request being sent from the client to the server. It contains information such
   * as the request method (GET, POST, etc.), URL, headers, and body.
   * @returns a modified HttpRequest object. If an access token is available, the function clones the
   * original request and adds an Authorization header with the access token. If no access token is
   * available, the function returns the original request unchanged.
   */
  private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    const accessToken = this.demoService.accessToken;
    if (accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return request;
  }

/**
 * The `refreshToken` function sends a GET request to a specified URL in order to refresh the
 * authentication token.
 * @returns The `refreshToken()` method returns an Observable that emits the result of an HTTP GET
 * request to the `refreshTokenUrl` endpoint.
 */
  private refreshToken(): Observable<any> {
    const refreshTokenUrl = 'https://blog-api-django-rest-framework-production.up.railway.app/api/v1/login/refresh/';

    return this.demoService.http.get(refreshTokenUrl);
  }
}
