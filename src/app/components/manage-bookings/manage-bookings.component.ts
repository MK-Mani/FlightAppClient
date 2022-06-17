import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';
import { ConfirmDialogComponent } from 'src/app/utilities/confirm-dialog/confirm-dialog.component';
import { Utilities } from 'src/app/utilities/utilities';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {
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
  selectedBookingRow: any;
  isCancelDisabled: boolean = true;

  constructor(private _bookingService: BookingService,
    private _utlities: Utilities, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBookingDetails();
  }

  getBookingDetails() {
    var userInfo = localStorage.getItem("UserToken");

    if (!userInfo) {
      return;
    }

    var userDetails = JSON.parse(userInfo);

    this._bookingService.getBookingDetailsByEmail(userDetails.userId)
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
          this.bookings = data;
        }
      });
  }

  rowClick_Booking(selectedRow: any) {
    this.selectedBookingRow = selectedRow;

    var todayDate = new Date();
    var dateOfJourney = new Date(selectedRow.DateOfJourney);
    if (!selectedRow.IsCancelTicket) {
      if (dateOfJourney.getDate() > (todayDate.getDate())) {
        this.isCancelDisabled = false;
        return;
      }
    }

    this.isCancelDisabled = true;
  }

  onclick_cancelTicket() {
    if (!this.selectedBookingRow) {
      this._utlities.showSnackBar("Please select the ticket.", 5000, "DeleteSnackBar");
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      minWidth: '300px',
      disableClose: true,
      data: {
        title: "Confirmation",
        message: "Are you sure to cancel this ticket?"
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._bookingService.cancelTicket(this.selectedBookingRow?.BookingRecId)
          .subscribe((data) => {
            if (data) {
              this._utlities.showSnackBar(data.message, 5000, data.statusCode === 200 ? "SuccessSnackBar" : "DeleteSnackBar");
              this.getBookingDetails();
            }
          })
      }
    });
  }

  downloadReport(){
    this._utlities.showSnackBar("Working on it...", 5000, "DeleteSnackBar");
  }
}
