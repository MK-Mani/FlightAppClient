import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule  } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import {MatDialogModule} from '@angular/material/dialog'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatSelectModule} from '@angular/material/select'
import {MatRadioModule} from '@angular/material/radio'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatRadioModule
  ]
})
export class MaterialModule { }
