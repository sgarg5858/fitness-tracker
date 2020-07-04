import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {StopTrainingConfirmComponent, ProgressData} from './stop-training-confirm/stop-training-confirm.component';
import { Router } from '@angular/router';
import { TrainingService } from '../training.service';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  constructor(private dialog:MatDialog,private router:Router,private trainingService:TrainingService) { }
  progress:number=0;
  timer=null;

  ngOnInit(): void {
    this.createTimer();
  
  }
  createTimer()
  {
    const step=this.trainingService.getRunningExercise();
    console.log(step);
    this.timer= setInterval(()=>{
      let temp=Math.round(this.progress+ 100/step.duration);
      if(temp>100)
      {
        temp=100;
      }
      this.progress=temp ;
      if(this.progress>=100){
        this.trainingService.completeExercise();
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
        this.trainingService.cancelExercise(this.progress); 
      }
      else{
       this.createTimer();
      }
     })
  }

}
