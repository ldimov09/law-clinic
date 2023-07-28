import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-students.component.html',
  styleUrls: ['./dialog-students.component.scss'],
})
export class DialogStudentsComponent {

  selectedStudents!: IUser[]

  constructor(
    public dialogRef: MatDialogRef<DialogStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void { //Close the dialog
    this.dialogRef.close(); 
  }
}
