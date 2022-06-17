import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SnackbarComponent } from 'src/app/utilities/snackbar/snackbar.component';
import { Utilities } from 'src/app/utilities/utilities';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private loginService: LoginService, private formBuilder: FormBuilder,
    private router: Router, private snackBar : MatSnackBar, private utilities: Utilities) { }

  registerUser: FormGroup = this.formBuilder.group({
    firstName: new FormControl('', [
      Validators.required]),
    lastName: new FormControl(),
    emailId: new FormControl('', [
      Validators.required,
      Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
    ]),
    confirmPassword: new FormControl()
  }
  );

  checkError = (controlName: string, errorName: string) => {
    if(controlName === "confirmPassword")
    {
      this.comparePassword();
    }

    return this.registerUser.controls[controlName].hasError(errorName);
  }

  comparePassword()
  {
    var password = this.registerUser.controls["password"]?.value;
    var confirmPassword = this.registerUser.controls["confirmPassword"];

    password === confirmPassword?.value ? confirmPassword?.setErrors(null) : confirmPassword?.setErrors({mustMatch: true})
  }

  ngOnInit(): void {
  }

  onSubmit_RegisterUser() {
    if (this.registerUser.invalid) {
      return;
    }

    var params = {
      "FirstName": this.registerUser.controls["firstName"].value,
      "LastName": this.registerUser.controls["lastName"].value,
      "UserId": this.registerUser.controls["emailId"].value,
      "Password": this.registerUser.controls["password"].value,
      "IsAdminUser": false,
      "Token": ""
    };

    this.loginService.registerUser(params).subscribe((data: any) => {
      console.log(data);

      if (data) {
        if (data.statusCode === 200) {
          this.utilities.showSnackBar(data.message, 5000, "SuccessSnackBar");
          this.router.navigate(["login"])
            .then(() => {
              window.location.reload();
            });
        }
        else
        {
          this.utilities.showSnackBar(data.message, 5000, "DeleteSnackBar");
        }
      }
    }),
    (error: any) => {
      console.log("APi Call error " + error);
    }
  }

  cancelRegister() {
    window.location.reload();
  }
}
