import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private loginService : LoginService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser = this.loginService.getCurrentUser();

    if(currentUser && currentUser.token)
    {
        request = request.clone({
          setHeaders : {
            Authorization: "Bearer " + currentUser.token
          }
        });
    }

    return next.handle(request);
  }
}
