import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _httpClient: HttpClient) { }

  bookTicket(params : any) : Observable<any>
  {
    const endPoint = environment.baseUrl + environment.bookTicketApiUrl;

    return this._httpClient.post(endPoint, params);
  }

  getBookingDetailsByEmail(emailId : string) : Observable<any>
  {
    const endPoint = environment.baseUrl + environment.bookingHistoryApiUrl + emailId

    return this._httpClient.get(endPoint);
  }

  getTicketDetailsByPnr(pnrNumber : number) : Observable<any>{
    const endPoint = environment.baseUrl + environment.ticketDetailsByPnrApiUrl + pnrNumber;

    return this._httpClient.get(endPoint);
  }

  cancelTicket(bookingRecId : number) : Observable<any> {
    const endPoint = environment.baseUrl + environment.cancelTicketApiUrl + bookingRecId;

    return this._httpClient.get(endPoint);
  }
}
