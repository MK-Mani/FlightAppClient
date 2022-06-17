import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Airline } from 'src/app/models/airline';
import { AirlineService } from 'src/app/services/airline.service';
import { Utilities } from 'src/app/utilities/utilities';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
  airline: Airline | null = null;


  constructor(private formBuilder: FormBuilder, private utilities : Utilities,
    private router: Router, private airlineService: AirlineService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updateDiscountForm: FormGroup = this.formBuilder.group({
    discountCode: new FormControl(),
    discountAmount: new FormControl()
  })

  openForm(arilineDetails : Airline) {
    this.airline = arilineDetails;
    
    this.updateDiscountForm.patchValue({
      discountCode: this.airline.discountCode,
      discountAmount: this.airline.discountAmount,
    })
  }

  checkError() {
    var discode = this.updateDiscountForm.controls["discountCode"];
    var disAmount = this.updateDiscountForm.controls["discountAmount"];


    if (discode.value && !disAmount.value) {
      disAmount.setErrors({ required: true });
      return true;
    }
    else if (!discode.value && disAmount.value) {
      discode.setErrors({ required: true });
      return true;
    }

    discode.setErrors(null);
    disAmount.setErrors(null);
    return false;
  }

  onSubmit_UpdateDiscount() {
    if (this.updateDiscountForm.valid) 
    {
      if(this.airline != null)
      {
        var params = {
          "airlineRecId" : this.airline.airlineRecId,
          "discountCode" : this.updateDiscountForm.controls["discountCode"].value,
          "discountAmount": Number(this.updateDiscountForm.controls["discountAmount"].value)
        }

        this.airlineService.updateDiscount(params)
        .subscribe((data : any) => {
          if(data)
          {
              this.airline = null;
              this.utilities.showSnackBar("Discount updated successfully.", 5000, "SuccessSnackBar");
          }
        }),
        (error : any) => {
          console.error(error);
        }
      }
      
    }
  }

}
