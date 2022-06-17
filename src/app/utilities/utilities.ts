import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "./snackbar/snackbar.component";

@Injectable({
    providedIn: 'root'
  })
  
export class Utilities {
    constructor(private snackBar: MatSnackBar) {}

    showSnackBar(message: string, durationInSeconds: number, className: string) {
        this.snackBar.openFromComponent(SnackbarComponent, {
            duration: durationInSeconds,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: [className, "SnackBarFont"],
            data: {
                message: message
            }
        });
      }
}
