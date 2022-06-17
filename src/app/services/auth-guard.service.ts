import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private loginService : LoginService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {
      const userInfo = this.loginService.getCurrentUser(); 

      if(userInfo)
      {
        if(!route.data["role"])
        {
            return true;
        }
        
        var role = userInfo.isAdminUser ? "Admin" : "User";

        if(route.data["role"] === role)
        {
          return true;
        }
      }

      this.router.navigate(["/login"]);
      return false;
  }
}
