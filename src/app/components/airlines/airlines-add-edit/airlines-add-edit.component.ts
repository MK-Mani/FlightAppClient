import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AirlineService } from 'src/app/services/airline.service';
import { SnackbarComponent } from 'src/app/utilities/snackbar/snackbar.component';
import { Utilities } from 'src/app/utilities/utilities';

@Component({
  selector: 'app-airlines-add-edit',
  templateUrl: './airlines-add-edit.component.html',
  styleUrls: ['./airlines-add-edit.component.css']
})
export class AirlinesAddEditComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private utilities: Utilities,
    private router : Router, private airlineService: AirlineService, private snackBar : MatSnackBar) { }

    registerAirline:FormGroup = this.formBuilder.group({
    airlineName: new FormControl('', [Validators.required]),
    airlineLogo: new FormControl(),
    contactNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    contactAddress: new FormControl('', [Validators.required]),
  })

  checkError = (controlName: string, errorName: string) => {
    return this.registerAirline.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
  }

  onSubmit_registerAirline()
  {
    if(this.registerAirline.invalid)
      {
        return;
      }
      
      var params =
      { 
        "AirlineName": this.registerAirline.controls["airlineName"].value, 
        "AirlineLogo": this.registerAirline.controls["airlineLogo"].value,
        "ContactNumber": this.registerAirline.controls["contactNumber"].value ,
        "ContactAddress": this.registerAirline.controls["contactAddress"].value 
      };

      this.airlineService.registerAirline(params)
        .subscribe((data : any) => {
          console.log(data);

          if(data)
          {
            this.redirecToAirline();
            this.utilities.showSnackBar("Airlines registered successfully.", 5000, "SuccessSnackBar");
          }
        }),
        (error : any) => {
          console.error(error);
        }
  }

  redirecToAirline() {
    this.router.navigate(["airlines"]).then(() => {
      window.location.reload();
    });
  }
}
