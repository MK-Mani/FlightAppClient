import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sigin-in',
  templateUrl: './sigin-in.component.html',
  styleUrls: ['./sigin-in.component.css']
})
export class SiginInComponent implements OnInit {

  constructor(private loginService:LoginService, private formBuilder:FormBuilder, 
    private router : Router, private appComponent : AppComponent) { }

  userCredentials:FormGroup = this.formBuilder.group({
    emailId: new FormControl('', [
            Validators.required, 
            Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
    password: new FormControl('', [
      Validators.required])
  })

  checkError = (controlName: string, errorName: string) => {
    return this.userCredentials.controls[controlName].hasError(errorName);
  }
  
  ngOnInit(): void {
  }

  onSubmit_ValidateUser()
  {
      if(this.userCredentials.invalid)
      {
        return;
      }
      
      var params =
      { 
        "UserId": this.userCredentials.controls["emailId"].value, 
        "Password": this.userCredentials.controls["password"].value 
      };

      this.loginService.validateUser(params)
          .subscribe(data => {
              console.log(data);

            if(data)
            {
              var userInfo = this.loginService.getCurrentUser();

              if(userInfo)
              {
                var launchPageUrl = userInfo.isAdminUser ? "airlines" : "flight-search";
                this.appComponent.checkAdminUser();
                this.router.navigate([launchPageUrl]);
              }  
            }            
          }),
          (error : any) => {
            console.error(error);
          }
  }
}