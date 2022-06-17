import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FlightBookingClientApp';
  userInfo: User | null = null;
  isLogin:boolean = false;
  isAdminUser:boolean = false;
  menuItems:any;

    constructor(private loginService : LoginService, private router: Router)
    {
        
    }
  ngOnInit(): void {
    this.checkAdminUser();
  }

  logout()
  {
    this.isLogin = false;
    this.menuItems = [];
    this.loginService.logout();
    this.router.navigate(["login"]);
  }

  checkAdminUser()
  {
    this.userInfo = this.loginService.getCurrentUser();

      if(this.userInfo)
      {
        this.isLogin = true;

        if(this.userInfo.isAdminUser)
        {
          this.isAdminUser = true;

          this.addAdminMenu();
        }
        else{
          this.menuItems = [ 
            {
              "MenuText": "Book Flight",         
              "RouterLink": "flight-search"
            },
            {
              "MenuText": "Mange Bookings",         
              "RouterLink": "manage-bookings"
            },      
            {
              "MenuText": "Booking History",         
              "RouterLink": "booking-history"
            }
          ];
        }
      }
  }

  addAdminMenu() {
    this.menuItems = [
        {
          "MenuText": "Airlines",         
          "RouterLink": "airlines"
        },
        {
          "MenuText": "Schedules",         
          "RouterLink": "schedules"
        },
        {
          "MenuText": "Discounts",         
          "RouterLink": "discounts"
        },
    ];
  }
}