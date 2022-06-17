import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Airline } from 'src/app/models/airline';
import { AirlineService } from 'src/app/services/airline.service';
import { ConfirmDialogComponent } from 'src/app/utilities/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/utilities/snackbar/snackbar.component';
import { Utilities } from 'src/app/utilities/utilities';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})

export class AirlinesComponent implements OnInit, AfterViewInit {
  @Input() navigateFrom! : string;
  @Output() updateDiscount = new EventEmitter<Airline>();
  displayedColumns:string[] = ["airlineName", "contactNumber", "contactAddress", "disCode", "disCost", "block"];
  airlines: Airline[] = [];
  hideAirlinesPopup : boolean = true;
  constructor(private airlineService: AirlineService, private dialog: MatDialog, 
    private snackBar : MatSnackBar, private router: Router, private utilities: Utilities,
    private _route: ActivatedRoute) {
    
   }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
   
    this.getAllAirlines();
  }

  getAllAirlines(){
    this.airlineService.getAllAirlines()
          .subscribe((data : Airline[]) => {
              console.log(data);
              this.airlines = (data);
          }),
          (error : any) => {
            console.error(error);
          }
  }

  navigateAddAirline() {
    this.hideAirlinesPopup = false;
    this.router.navigate(["add-airline"], {relativeTo : this._route})
  }

  blockAirlines(airline : any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      minWidth: '300px',
      disableClose: true,
      data : {
        title: "Confirmation",
        message: "Are you sure to delete the \"" + airline.airlineName + "\" airlines?"
      }
    });
    dialogRef.afterClosed().subscribe((result : boolean) => {
        if(result)
        {
          var params = {
            "AirlineRecId" : airline.airlineRecId,
            "IsBlock": true
          }
          this.airlineService.blockAirline(params)
          .subscribe((data : any) => {
              console.log(data);
              if(data)
              {
                this.getAllAirlines();
                this.utilities.showSnackBar("Airline Blocked Successfully", 5000, "DeleteSnackBar");
                //alert("Blocked successfully.");
              }
          }),
          (error : any) => {
            console.error(error);
          }
        }
    });
  }

  redirectToDiscountForm(ariline: any) {
    this.updateDiscount.emit(ariline);
    //this.router.navigate(["discounts"], {queryParams : { updateDisCount:'true' }})
  }

  showSnackBar(message: string, durationInSeconds: number) {
    this.snackBar.openFromComponent(SnackbarComponent, {
        duration: durationInSeconds,
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: ["", "SnackBarFont"],
        data: {
            message: message
        }
    });
  }
}
