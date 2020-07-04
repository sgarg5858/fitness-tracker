import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor() { }

  private runningExercise: Exercise;
  public exerciseChanged= new Subject<Exercise>();
  public exercises:Exercise[]=[];


  availableExercises:Exercise[]=
  [
    {id:'pushups', name:'Pushups', duration:6, calories:20},
    {id:'pullups', name:'Pullups', duration:7, calories:25},
    {id:'crunches', name:'Crunches', duration:9, calories:5},
    {id:'plank', name:'Plank', duration:8, calories:15}
  ];
  getExercises()
  {
    return [...this.exercises];
  }
  getAvailableExercises()
  {
    return [...this.availableExercises];
  }
  getRunningExercise()
  {
    console.log(this.runningExercise);
    return {...this.runningExercise};
  }

  startExercise(selectedId:string)
  {
    console.log(selectedId);
    this.runningExercise=this.availableExercises.find((exercise)=>exercise.id==selectedId);
    console.log(this.runningExercise);
    this.exerciseChanged.next({...this.runningExercise});
  }
  completeExercise()
  {
    this.exercises.push({...this.runningExercise,state:'completed',date:new Date()});

    this.runningExercise=null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress:number)
  {
    this.exercises.push({...this.runningExercise,
      state:'cancelled',
      date:new Date(),
      calories:(this.runningExercise.calories*progress)/100,
      duration:(this.runningExercise.duration*progress)/100
    });

    this.runningExercise=null;
    this.exerciseChanged.next(null);
  }
}
