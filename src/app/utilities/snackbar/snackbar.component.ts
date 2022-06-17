import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
  message: string = "";

  constructor(public snackbarRef : MatSnackBarRef<SnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) 
  {
      this.message = data.message;
  }

  ngOnInit(): void {
  }

}
