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
  trainings:any=null;
  workoutForm:FormGroup;
  exercisesSubscription:Subscription;
  isLoading=true;

  ngOnInit(): void {
    // this.trainings=this.trainingService.getAvailableExercises();
   
   this.exercisesSubscription= this.trainingService.exercisesChanged.subscribe((trainings)=>{
     console.log(trainings);
      this.trainings=trainings;
      this.isLoading=false;
    },(error)=>{

    });
    this.trainingService.fetchAvailableExercises();
    this.workoutForm=new FormGroup({
      workout: new FormControl('',[Validators.required])
    })
  }
  tryFetchingAgain()
  {
    this.trainingService.fetchAvailableExercises();
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
