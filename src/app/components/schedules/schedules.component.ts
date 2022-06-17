import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedulesService } from 'src/app/services/schedules.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  hideSchedules: boolean = false;
  schedules: any;
  displayedColumns = [    
    'flightNumber',
    'airlineName',
    'fromPlace',
    'toPlace',
    'startDateTime',
    'endDateTime',
    'scheduledDays',
    'instrumentUsed',
    'noOfBussinessClsSeats',
    'noOfNonBussinessClsSeats',
    'businessClassTicket',
    'nonBusinessClassTicket',
    'noOfRows',
    'meal',
  ];
  constructor(private router : Router, private route: ActivatedRoute, private scheduleService: SchedulesService) { }

  ngOnInit(): void {
    this.getAllSchedules();
  }

  getAllSchedules()
  {
    this.scheduleService.getAllSchedules()
    .subscribe((data : any) => {
      if(data)
      {
          this.schedules = data;
          console.log(data);
      }
    })
  }

  navigateAddInventory()
  {
    this.hideSchedules = true;
    this.router.navigate(["add-schedule"], {relativeTo: this.route});
  }
}