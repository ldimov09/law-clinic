import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-specialty',
  templateUrl: './dialog-specialty.component.html',
  styleUrls: ['./dialog-specialty.component.scss']
})
export class DialogSpecialtyComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogSpecialtyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void { //Close dialog
    this.dialogRef.close();
  }
}
