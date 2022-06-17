import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/material.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AirlinesComponent } from './components/airlines/airlines.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { SiginInComponent } from './components/sigin-in/sigin-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AirlinesAddEditComponent } from './components/airlines/airlines-add-edit/airlines-add-edit.component';
import { ConfirmDialogComponent } from './utilities/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from './utilities/snackbar/snackbar.component';
import { Utilities } from './utilities/utilities';
import { DiscountsComponent } from './components/discounts/discounts.component';
import { SchedulesAddeditComponent } from './components/schedules/schedules-addedit/schedules-addedit.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { ManageBookingsComponent } from './components/manage-bookings/manage-bookings.component';
import { BookingsHistoryComponent } from './components/bookings-history/bookings-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AirlinesComponent,
    SiginInComponent,
    SignUpComponent,
    AirlinesAddEditComponent,
    ConfirmDialogComponent,
    SnackbarComponent,
    DiscountsComponent,
    SchedulesComponent,
    BookingsComponent,
    SchedulesAddeditComponent,
    FlightSearchComponent,
    ManageBookingsComponent,
    BookingsHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuardService, Utilities,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi : true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi : true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
