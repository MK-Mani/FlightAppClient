import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedulesService } from 'src/app/services/schedules.service';
import { Utilities } from 'src/app/utilities/utilities';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  fromPlace:string = "";
  toPlace:string = "";
  fromDateTime:any;
  toDateTime:any;
  schedules:any;
  roundWaySchedules:any;
  selectedScheduleRow:any;
  selectedRoundTripScheduleRow:any;
  isShowFlights: boolean = true;
  oneWayOrRound: string = "1";
  displayedColumns = [    
    'airlineName',
    'flightNumber',
    'fromPlace',
    'toPlace',
    'seatsAvailable',
    'ticketCost',
    'instrumentUsed',
    'meal'
  ];

  constructor(private _scheduleService: SchedulesService, private _router : Router, 
    private _route : ActivatedRoute, private _utlities : Utilities) { }

  ngOnInit(): void {
    //this.oneWayOrRound = 1;
    //this.getAllSchedules();
  }

    getAllSchedules() {
      this._scheduleService.getAllSchedules()
        .subscribe((data : any) => {
          if(data)
          {
              console.log(data);
              this.schedules = data;
          }
        })
    }

  searchFlight() {
    var params = {
      "fromPlace": this.fromPlace,
      "toPlace": this.toPlace,
      "startDateTime": this.fromDateTime,
      "endDateTime": this.toDateTime,
    }

    this._scheduleService.searchFlight(params)
      .subscribe((data : any) => {
          if(data)
          {
            console.log(data);
            this.schedules = data;
          }
      })
  }

  navigateToBook()
  {
    if(!this.selectedScheduleRow)
    {
      this._utlities.showSnackBar("Please select your flight.", 5000, "DeleteSnackBar");
      return
    }

    if(this.oneWayOrRound === "2" && !this.selectedRoundTripScheduleRow)
    {
      this._utlities.showSnackBar("Please select your return journey flight.", 5000, "DeleteSnackBar");
      return;
    }

    var params = {
      "Oneway": JSON.stringify(this.selectedScheduleRow),
      "IsRoundTrip": this.oneWayOrRound === "2",
      "ReturnTrip" : JSON.stringify(this.selectedRoundTripScheduleRow)
    };

    this.isShowFlights = false;
    this._router.navigate(["book-flight"], { relativeTo: this._route, queryParams : params });
  }
  
  rowClick_Schedule(schedule : any, oneWayOrRound : number) {
    
    switch(oneWayOrRound)
    {
      case 1:
        this.selectedScheduleRow = schedule;
        break;
      case 2:
          this.selectedRoundTripScheduleRow = schedule;
      break;
      default:        
        break;
    }
  }

  onchange_OneWayRoundTrip()
  {
    console.log(this.oneWayOrRound);

    if(this.oneWayOrRound === "2")
    {
      if(this.fromPlace === "" || this.toPlace === "")
      {
          this.fromPlace = this.selectedScheduleRow?.fromPlace;
          this.toPlace = this.selectedScheduleRow?.toPlace;
          this.fromDateTime = this.selectedScheduleRow?.startDateTime;
          this.toDateTime = this.selectedScheduleRow?.endDateTime;
      }

      var params = {
        "fromPlace": this.toPlace,
        "toPlace": this.fromPlace,
        "startDateTime": this.fromDateTime,
        "endDateTime": this.toDateTime,
      }
  
      this._scheduleService.searchFlight(params)
        .subscribe((data : any) => {
            if(data)
            {
              console.log(data);
              if(data.length > 0)
              {
                this.roundWaySchedules = data;
              }
              else{
                this._utlities.showSnackBar("Round trip fligths are not available for this place, so you choose the one way.", 5000,
                "DeleteSnackBar");
                this.oneWayOrRound = "1";
              }
            }
        })      
    }
    else
    {
      this.roundWaySchedules = null;
    }
  }

}
