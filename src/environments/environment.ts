// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//const baseUrl:string = "http://5000/";

export const environment = {
  production: false,
  statusCode401 : 401,
  baseUrl: "http://localhost:5000/",
  loginApiUrl: "admin/login",
  registerUserApiUrl: "register/user",
  getAirlinesApiUrl : "airlines",
  blockAirlines: "airlines/block",
  registerAirlines: "airlines/register",
  updateAirlineDiscount: "airlines/UpdateDiscount",
  getAllSchedulesApiUrl : "schedules",
  addScheduleAPiUrl: "inventory/Add",
  searchFlightApiUrl: "flight/search",
  bookTicketApiUrl: "booking",
  cancelTicketApiUrl: "cancel?bookingRecId=",
  bookingHistoryApiUrl: "booking/history?emailId=",
  ticketDetailsByPnrApiUrl : "ticket-details?pnrNumber="
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
