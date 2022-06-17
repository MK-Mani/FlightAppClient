import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirlineService } from 'src/app/services/airline.service';
import { SchedulesService } from 'src/app/services/schedules.service';
import { Utilities } from 'src/app/utilities/utilities';

@Component({
  selector: 'app-schedules-addedit',
  templateUrl: './schedules-addedit.component.html',
  styleUrls: ['./schedules-addedit.component.css']
})
export class SchedulesAddeditComponent implements OnInit {
  airlineList:any;
  constructor(private formBuilder:FormBuilder, private utilities: Utilities,
    private router : Router, private scheduleService: SchedulesService, private airlineService: AirlineService) { }

    addScheduleForm:FormGroup = this.formBuilder.group({
    airlineRecId: new FormControl(),
    flightNumber: new FormControl('', [Validators.required]),
    fromPlace: new FormControl('', [Validators.required]),
    toPlace: new FormControl('', [Validators.required]),
    startDateTime: new FormControl('', [Validators.required]),
    endDateTime: new FormControl('', [Validators.required]),
    scheduledDays: new FormControl('', [Validators.required]),
    instrumentUsed: new FormControl('', [Validators.required]),
    noOfBussinessClsSeats: new FormControl('', [Validators.maxLength(7)]),
    noOfNonBussinessClsSeats: new FormControl('', [Validators.maxLength(7)]),
    businessClassTicket: new FormControl('', [Validators.maxLength(7)]),
    nonBusinessClassTicket: new FormControl('', [Validators.maxLength(7)]),
    noOfRows: new FormControl('', [Validators.maxLength(5)]),
    meal: new FormControl
  })

  checkError = (controlName: string, errorName: string) => {
    return this.addScheduleForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    this.getAllAirlines()
  }

  getAllAirlines() {
    this.airlineService.getAllAirlines()
    .subscribe((data: any) => {
      if(data){
        this.airlineList = data;
      }
    })
  }

  onSubmit_addSchedule() {
    if(this.addScheduleForm.invalid)
    {
      return;
    }

    var params = {
      "airlineRecId" : Number(this.addScheduleForm.controls["airlineRecId"]?.value),
      "flightNumber" : this.addScheduleForm.controls["flightNumber"]?.value,
      "fromPlace" : this.addScheduleForm.controls["fromPlace"]?.value,
      "toPlace" : this.addScheduleForm.controls["toPlace"]?.value,
      "startDateTime" : this.addScheduleForm.controls["startDateTime"]?.value,
      "endDateTime" : this.addScheduleForm.controls["endDateTime"]?.value,
      "scheduleDays" : this.addScheduleForm.controls["scheduledDays"]?.value,
      "instrumentUsed" : this.addScheduleForm.controls["instrumentUsed"]?.value,
      "noOfBussinessClsSeats" : Number(this.addScheduleForm.controls["noOfBussinessClsSeats"]?.value),
      "noOfNonBussinessClsSeats" : Number(this.addScheduleForm.controls["noOfNonBussinessClsSeats"]?.value),
      "businessClassTicket" : Number(this.addScheduleForm.controls["businessClassTicket"]?.value),
      "nonBusinessClassTicket" : Number(this.addScheduleForm.controls["nonBusinessClassTicket"]?.value),
      "noOfRows" : Number(this.addScheduleForm.controls["noOfRows"]?.value),
      "meal" : this.addScheduleForm.controls["meal"]?.value,
    }

    this.scheduleService.addSchedules(params)
      .subscribe((data : any) => {
        if(data)
        {
          console.log(data);
          this.utilities.showSnackBar("Schedule added successfully.", 5000, "SuccessSnackBar");
          this.redirectToSchedule();
        }
      })

  }
  redirectToSchedule()
  {
    this.router.navigate(["schedules"]).then(() => {
      window.location.reload();
    });
  }
}
