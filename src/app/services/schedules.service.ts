import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(private httpClient: HttpClient) { }

  getAllSchedules() : Observable<any> {
    const endPoint = environment.baseUrl + environment.getAllSchedulesApiUrl;

    return this.httpClient.get(endPoint);
  }

  addSchedules(params : any) : Observable<any>{
    const endPoint = environment.baseUrl + environment.addScheduleAPiUrl;

    return this.httpClient.post(endPoint, params);
  }  

  searchFlight(params: any): Observable<any> {
    const endPoint = environment.baseUrl + environment.searchFlightApiUrl;

    return this.httpClient.post(endPoint, params);
  }
}
