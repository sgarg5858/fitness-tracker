import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  constructor() { }
  workouts=['Pushups','Jumping','Pullups','Crunches','Plank','Sides'];
  workoutForm:FormGroup;

  ngOnInit(): void {
    this.workoutForm=new FormGroup({
      workout: new FormControl('',[Validators.required])
    })
  }
  startWorkout()
  {
    console.log(this.workoutForm);
    // this.workoutForm.reset();
  }

}
