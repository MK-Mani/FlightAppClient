import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-bookings-history',
  templateUrl: './bookings-history.component.html',
  styleUrls: ['./bookings-history.component.css']
})
export class BookingsHistoryComponent implements OnInit {
  bookings: any;
  bookingsColumns: string[] = [
    'airlineName',
    'flightNumber',
    'fromPlace',
    'toPlace',
    'pnrNumber',
    'ticketCost',
    'journeyDate',
    'isRoundTrip',
    'returnJourneyDate',
    'meal',
    "isCancel"
  ];
  emailId : string ="";
  pnrNumber: number = 0;
  selectedOne:string = "email";

  constructor(private _bookingService: BookingService) { }

  ngOnInit(): void {
    //this.getBookingDetails();
  }

  onClick_Apply()
  {
    if(this.selectedOne === "email")
    {
      this.getBookingDetailsByEmail();
    }
    else{
      this.getBookingDetailsByPnr();
    }
  }

  getBookingDetailsByEmail() 
  {   
    this._bookingService.getBookingDetailsByEmail(this.emailId)
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
          this.bookings = data;
        }
      });
  }

  getBookingDetailsByPnr()
  {
    this._bookingService.getTicketDetailsByPnr(this.pnrNumber)
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
          this.bookings = data;
        }
      });
  }
}
