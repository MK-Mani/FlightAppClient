import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Utilities } from '../utilities/utilities';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private httpClient: HttpClient, private utilities: Utilities) {
    var userInfo = localStorage.getItem("UserToken");

    if (userInfo) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(userInfo));
      this.currentUser = this.currentUserSubject.asObservable();
    }
    else {
      this.currentUserSubject = new BehaviorSubject<any>(null);
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  validateUser(params: any): Observable<any> {
    const endPoint = environment.baseUrl + environment.loginApiUrl
    return this.httpClient.post<any>(endPoint, params)
      .pipe(map(data => {
        if (data) {
          if (data.statusCode === environment.statusCode401) {
            this.utilities.showSnackBar(data.message, 5000, "DeleteSnackBar")
            localStorage.removeItem("UserToken");
            this.currentUserSubject.next(null);
            return;
          }

          localStorage.setItem("UserToken", JSON.stringify(data));
          this.currentUserSubject.next(data);
        }
        return data;

      }));
  }

  registerUser(userDetails: any): Observable<any> {
    const endPoint = environment.baseUrl + environment.registerUserApiUrl

    return this.httpClient.post(endPoint, userDetails);
  }

  logout() {
    localStorage.removeItem("UserToken");
    this.currentUserSubject.next(null);
  }
}
