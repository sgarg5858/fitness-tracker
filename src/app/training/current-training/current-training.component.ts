import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {StopTrainingConfirmComponent, ProgressData} from './stop-training-confirm/stop-training-confirm.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  constructor(private dialog:MatDialog,private router:Router) { }
  progress:number=0;
  timer=null;
  @Output() trainingExit = new EventEmitter<void>();

  ngOnInit(): void {
    this.createTimer();
  
  }
  createTimer()
  {
    this.timer= setInterval(()=>{
    
      this.progress=this.progress+20;
      if(this.progress>=100){
         clearInterval(this.timer);
       }
      },1000);
  }
  stopWorkout()
  {
  
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingConfirmComponent,{
       width:'300px',
       height:'180px',
       data:new ProgressData(this.progress)
     });

     //returns an observable
     dialogRef.afterClosed().subscribe((response)=>{
      if(response)
      {
        this.trainingExit.emit();
      }
      else{
         this.createTimer();
      }
     })
  }

}
