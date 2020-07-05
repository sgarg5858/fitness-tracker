import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import {AngularFirestore} from '@angular/fire/firestore'
import {Subscription} from 'rxjs';
import  'rxjs/add/operator/map';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {

  constructor(private trainingService:TrainingService, private db:AngularFirestore) { }
  trainings:any;
  workoutForm:FormGroup;
  exercisesSubscription:Subscription;

  ngOnInit(): void {
    // this.trainings=this.trainingService.getAvailableExercises();
   
   this.exercisesSubscription= this.trainingService.exercisesChanged.subscribe((res)=>{
     console.log(res);
      this.trainings=res;
    });
    this.trainingService.fetchAvailableExercises();
    this.workoutForm=new FormGroup({
      workout: new FormControl('',[Validators.required])
    })
  }
  startWorkout()
  {
    console.log(this.workoutForm);
    const name= this.workoutForm.value.workout;
    console.log(name);
    this.trainingService.startExercise(name);
    
  }
  ngOnDestroy()
  {
    this.exercisesSubscription.unsubscribe();
  }

}
