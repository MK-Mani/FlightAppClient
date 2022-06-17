import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { ConfirmDialogComponent } from 'src/app/utilities/confirm-dialog/confirm-dialog.component';
import { Utilities } from 'src/app/utilities/utilities';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit 
{
  selectedSchedule:any;
  isRoundTrip : boolean = false;
  selectedReturnSchedule:any;
  userDetails: any;
  dateOfJourney:any;
  returnJourney:any;
  isBusinessClass: string = "1"; // 1 - Non-Business, 2- Business
  showPassengers: boolean = false;
  passengerList  = new MatTableDataSource<any>([]);
  disCode: any;
  ticketCost: number = 0;
  isDisableDiscount: boolean = false;
  passengerColumns : string[] = [
    "name",
    "age",
    "gender",
    "seatNumber",
    "returnSeatNumber",
    "delete"
  ];

  constructor(private _router : Router, private _activeRoute : ActivatedRoute, 
    private formBuilder : FormBuilder, private dialog: MatDialog, private _utlities: Utilities,
    private _bookingService: BookingService) 
  {
    this._activeRoute.queryParams.subscribe((params) => {
        console.log(params);
        this.isRoundTrip = params["IsRoundTrip"] === "true";
        this.selectedSchedule = JSON.parse(params["Oneway"]);

        if(this.isRoundTrip)
        {               
          this.selectedReturnSchedule = JSON.parse(params["ReturnTrip"]);
        }
    });
   }   

   passengerFormGroup : FormGroup  = this.formBuilder.group({
    passengerName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    gender: new FormControl('', [Validators.required]),
    seatNumber: new FormControl('', [Validators.required]),
    returnSeatNumber: new FormControl(),
  });     

  ngOnInit(): void 
  {
    var userInfo = localStorage.getItem("UserToken");

    if(userInfo){
      this.userDetails =  JSON.parse(userInfo);
    }
  }
  redirectToFlightSearch() {
    this._router.navigate(["flight-search"]).then(() => {
      window.location.reload();
    });
  }

  checkError = (controlName: string, errorName: string) => {
    return this.passengerFormGroup.controls[controlName].hasError(errorName);
  }

  checkReturnSeat() : boolean {
    var returnSeatNumber = this.passengerFormGroup.controls["returnSeatNumber"];
    
    if(!returnSeatNumber.value)
    {
      returnSeatNumber.setErrors({ required: true });
      return true;
    }

    return false;
  }

  resetFormData(){
   this.passengerFormGroup.reset();
  }

    onSubmit_passengerDetails() {
      if(this.passengerFormGroup.invalid)
      {
        return;
      }
      var newPassenger = {};

      if(this.isRoundTrip)
      {
        newPassenger =  {
          "name":  this.passengerFormGroup.controls["passengerName"].value ,
          "age": Number(this.passengerFormGroup.controls["age"].value),
          "gender": this.passengerFormGroup.controls["gender"].value,
          "seatNumbers": this.passengerFormGroup.controls["seatNumber"].value,
          "returnSeatNumbers": this.passengerFormGroup.controls["returnSeatNumber"].value,
        }
      }
      else
      {
        newPassenger =  {
          "name": this.passengerFormGroup.controls["passengerName"].value ,
          "age": Number(this.passengerFormGroup.controls["age"].value),
          "gender": this.passengerFormGroup.controls["gender"].value,
          "seatNumbers": this.passengerFormGroup.controls["seatNumber"].value
        }
      } 

      this.passengerList.data.push(newPassenger);
      this.passengerList._updateChangeSubscription();

      this.showPassengers = true;
  }

  calculateTicketCost(noOfPassenger : number)
  {
    this.ticketCost = 0;

    if(this.isBusinessClass === "2")
    {
      this.ticketCost += Number(this.selectedSchedule.businessClassTicket) * noOfPassenger;

      if(this.isRoundTrip)
      {
        this.ticketCost += Number(this.selectedReturnSchedule.businessClassTicket) * noOfPassenger;
      }
    }
    else{
      this.ticketCost += Number(this.selectedSchedule.nonBusinessClassTicket) * noOfPassenger;

      if(this.isRoundTrip)
      {
        this.ticketCost += Number(this.selectedReturnSchedule.nonBusinessClassTicket) * noOfPassenger;
      }
    }
  }

  deletePassenger(rowIndex : number)   
  {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      minWidth: '300px',
      disableClose: true,
      data : {
        title: "Confirmation",
        message: "Are you sure to delete the passenger details?"
      }
    });
    dialogRef.afterClosed().subscribe((result : boolean) => {
        if(result)
        {
          this.passengerList.data.splice(rowIndex);
          this.passengerList._updateChangeSubscription();

          if(this.passengerList.data.length === 0){
            this.showPassengers = false;
          }
        }
    });    
  }

  returnToSchedule() {
    this._router.navigate(["flight-search"]).
      then(() => window.location.reload());
  }

  onclick_bookTicket()
  {
    if(!this.dateOfJourney)
    {
      this._utlities.showSnackBar("Please select your journey date", 5000, "DeleteSnackBar");
      return;
    }

    if(this.isRoundTrip && !this.returnJourney)
    {
      this._utlities.showSnackBar("Please select your return journey date", 5000, "DeleteSnackBar");
      return;
    }

    var noOfSeats = this.passengerList?.data.length;

    if(noOfSeats === 0)
    {
      this._utlities.showSnackBar("Please add the passenger first.", 5000, "DeleteSnackBar");
      return;
    }

    this.TicketAmount("");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      minWidth: '300px',
      disableClose: true,
      data : {
        title: "Booking Confirmation",
        message: "Number of seats : " + noOfSeats + "  Ticket Cost : " + this.ticketCost
      }
    });
    dialogRef.afterClosed().subscribe((result : boolean) => {
        if(result)
        {
          this.bookTicketService(noOfSeats);
        }
    });
  }

  bookTicketService(noOfSeats : any){
    var params = {
      "scheduleRecId" : Number(this.selectedSchedule?.scheduleRecId),
      "name" : this.userDetails.firstName,
      "emailId": this.userDetails.userId,
      "noOfSeats": noOfSeats,
      "meal": this.selectedSchedule?.meal,
      "isBusinessClass": this.isBusinessClass === "2",
      "passengers" : this.passengerList.data,
      "isRoundTrip": this.isRoundTrip,
      "returnScheduleRecId": this.isRoundTrip ? Number(this.selectedReturnSchedule?.scheduleRecId) : null,
      "returnDateOfJourney": this.isRoundTrip ? this.returnJourney : null,
      "dateOfJourney" : this.dateOfJourney,
      "ticketCost": this.ticketCost
    }

    console.log("book param - ", params);

    this._bookingService.bookTicket(params)
      .subscribe((data : any) => {
        if(data)
        {
          this._utlities.showSnackBar(data.message, 5000, data.statusCode === 200 ? "SuccessSnackBar" : "DeleteSnackBar");

          this.redirectToFlightSearch();
        }
    })
  }

  onclick_ApplyDiscount(){
    if(!this.disCode)
    {
      this._utlities.showSnackBar("Please enter the discount code.", 5000, "DeleteSnackBar");
      return;
    }
    
    this.TicketAmount("DiscountClick");
  }

  TicketAmount(from : string){
    var noOfSeats = this.passengerList?.data.length;

    this.calculateTicketCost(noOfSeats);

    if(this.selectedSchedule.airlines.discountCode && this.selectedSchedule.airlines.discountCode === this.disCode)
    {
      var disAmount = this.selectedSchedule?.airlines.discountAmount;     

      if(this.isRoundTrip)
      {
          this.ticketCost -= Number(disAmount) * noOfSeats;
      }
      
      this.ticketCost -= Number(disAmount) * noOfSeats;

      this.isDisableDiscount = true;
    }
    else if(from === "DiscountClick"){
      this._utlities.showSnackBar("Your Discount is not valid.", 5000, "DeleteSnackBar");
    }
  }
}
