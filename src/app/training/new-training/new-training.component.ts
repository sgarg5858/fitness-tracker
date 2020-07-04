import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  constructor(private trainingService:TrainingService) { }


  trainings:Exercise[];
  workoutForm:FormGroup;

  ngOnInit(): void {
    this.trainings=this.trainingService.getAvailableExercises();
    this.workoutForm=new FormGroup({
      workout: new FormControl('',[Validators.required])
    })
  }
  startWorkout()
  {
    console.log(this.workoutForm);
    const id= this.workoutForm.value.workout;
    console.log(id);
    this.trainingService.startExercise(id);
    
  }

}
