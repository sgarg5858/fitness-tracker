import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrentTrainingComponent } from '../current-training.component';

@Component({
  selector: 'app-stop-training-confirm',
  templateUrl: './stop-training-confirm.component.html',
  styleUrls: ['./stop-training-confirm.component.css']
})
export class StopTrainingConfirmComponent implements OnInit {

  progress=null;
  constructor(public dialogRef: MatDialogRef<CurrentTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProgressData) { }

  ngOnInit(): void {
    this.progress=this.data.progress;
  }
  onConfirm()
  {
    this.dialogRef.close(true);
  }
  onRefuse()
  {this.dialogRef.close(false);
  }
}
export class ProgressData{

  constructor(public progress:number){}
}