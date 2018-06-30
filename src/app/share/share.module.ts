import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,MatToolbarModule,MatCardModule, MatFormFieldModule, MatCheckboxModule } from '@angular/material';
import { MatInputModule,MatIconModule, MatMenuModule, MatSnackBarModule  } from '@angular/material';
import { AppConfig } from './app.config';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatMenuModule,
        MatSnackBarModule,
        ReactiveFormsModule
  ],
  declarations: [],
  providers: [AppConfig]
})
export class ShareModule { }
