import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirlinesAddEditComponent } from './components/airlines/airlines-add-edit/airlines-add-edit.component';
import { AirlinesComponent } from './components/airlines/airlines.component';
import { BookingsHistoryComponent } from './components/bookings-history/bookings-history.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { DiscountsComponent } from './components/discounts/discounts.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { LoginComponent } from './components/login/login.component';
import { ManageBookingsComponent } from './components/manage-bookings/manage-bookings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SchedulesAddeditComponent } from './components/schedules/schedules-addedit/schedules-addedit.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    "path": '',
    component: LoginComponent
  },
  {
    "path": 'login',
    component: LoginComponent
  },
  {
    "path": 'airlines',
    component: AirlinesComponent,
    canActivate: [AuthGuardService],
    data: {
      role: "Admin"
    },
    children: [
      {
        path: 'add-airline',
        component: AirlinesAddEditComponent
      }
    ]
  },
  {
    "path": 'schedules',
    component: SchedulesComponent,
    canActivate: [AuthGuardService],
    data: {
      role: "Admin"
    },
    children: [
      {
        path: 'add-schedule',
        component: SchedulesAddeditComponent
      }
    ]
  },
  {
    "path": 'manage-bookings',
    component: ManageBookingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    "path": 'flight-search',
    component: FlightSearchComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'book-flight',
        component: BookingsComponent
      }
    ]
  },
  {
    "path": 'discounts' ,
    component: DiscountsComponent,
    canActivate: [AuthGuardService],
    data: {
      role: "Admin"
    }
  },
  {
    "path": 'booking-history',
    component: BookingsHistoryComponent,
    canActivate: [AuthGuardService]
  },
  {
    "path": '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
