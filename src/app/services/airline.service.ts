import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  
  constructor(private httpClient: HttpClient) 
  {
   }

  getAllAirlines() : Observable<any>{
    const endPoint = environment.baseUrl + environment.getAirlinesApiUrl
    return this.httpClient.get(endPoint);
  }

  blockAirline(airline : any) : Observable<any> {
    const endPoint = environment.baseUrl + environment.blockAirlines;

    return this.httpClient.post(endPoint, airline);
  }

  registerAirline(airline : any) : Observable<any> {
    const endPoint = environment.baseUrl + environment.registerAirlines;
    
    return this.httpClient.post(endPoint, airline);
  }

  updateDiscount(airline: any) : Observable<any> {
    const endPoint = environment.baseUrl + environment.updateAirlineDiscount;

    return this.httpClient.put(endPoint, airline);
  }
}
