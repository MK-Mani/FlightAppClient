import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilities } from '../utilities/utilities';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private loginService : LoginService, private utilities: Utilities) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if(err.status === environment.statusCode401)
      {
          console.log("Error Interceptor " + err);
          this.utilities.showSnackBar(err, 5000, "DeleteSnackBar");
          this.loginService.logout();
      }

      if(err.status === 406)
      {
        this.utilities.showSnackBar(err, 5000, "DeleteSnackBar");
      }

      const error = err.error?.message || err.statusText;
      this.utilities.showSnackBar(error, 5000, "DeleteSnackBar")
      return throwError(error);
    }));
  }
}
