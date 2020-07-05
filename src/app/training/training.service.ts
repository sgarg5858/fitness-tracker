import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import {Subscription} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private db:AngularFirestore) { }

  private runningExercise: Exercise;
  public exerciseChanged= new Subject<Exercise>();
  public exercisesChanged = new Subject<Exercise[]>();
  public finishExercisesChanged = new Subject<Exercise[]>();
  public exercises:Exercise[]=[];
  availableExercises:Exercise[]=[];
  private firebaseSusbscriptions:Subscription[]=[];

  fetchFinishedExercises()
  {
    this.firebaseSusbscriptions.push(this.db.collection('finishedExercises')
    .valueChanges()
    .subscribe(
      (exercises:Exercise[])=>{
      this.finishExercisesChanged.next(exercises);
    },error=>{
      // console.log(error)
    })
    )
  }

  fetchAvailableExercises()
  {
   this.firebaseSusbscriptions.push(this.db.collection('availableExercises').snapshotChanges()
    .map((docArray)=>{
      return docArray.map((document)=> {return {
        id : document.payload.doc.id, 
        name: document.payload.doc.data()['name'],
        duration: document.payload.doc.data()['duration'],
        calories: document.payload.doc.data()['calories']
        } 
       })
    }).subscribe((exercises:Exercise[])=>{
      this.availableExercises=exercises;
      this.exercisesChanged.next([...exercises]);
    },(error)=>{
      // console.log(error);
    })
   )
  }

  getRunningExercise()
  {
    console.log(this.runningExercise);
    return {...this.runningExercise};
  }

  startExercise(selectedId:string)
  {
    console.log(selectedId);
    this.runningExercise=this.availableExercises.find((exercise)=>exercise.name==selectedId);
    console.log(this.runningExercise);
    this.exerciseChanged.next({...this.runningExercise});
  }

  //storing completed and cancelled exercise to firebase
  completeExercise()
  {
    this.addDataToDatabase({...this.runningExercise,state:'completed',date:new Date()});

    this.runningExercise=null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress:number)
  {
    this.addDataToDatabase({...this.runningExercise,
      state:'cancelled',
      date:new Date(),
      calories:(this.runningExercise.calories*progress)/100,
      duration:(this.runningExercise.duration*progress)/100
    });

    this.runningExercise=null;
    this.exerciseChanged.next(null);
  }
  private addDataToDatabase(exercise:Exercise)
  {
    this.db.collection('finishedExercises').add(exercise).then((res)=>{
      console.log(res);
    },(error)=>{
      console.log(error);
    })
  }

  cancelSubscriptions()
  {
    this.firebaseSusbscriptions.forEach((sub)=>{
      sub.unsubscribe();
    })
  }

}
