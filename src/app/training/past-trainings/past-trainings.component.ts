import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit,AfterViewInit,OnDestroy {

  constructor(private trainingService:TrainingService) { }

  @ViewChild( MatSort,{static:true} ) sort:MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  displayedColumns=['name','duration','calories','state'];
  dataSource=new MatTableDataSource<Exercise>();
  finishedExercisesSubscription:Subscription;

  ngOnInit(): void {
 this.finishedExercisesSubscription =  this.trainingService.finishExercisesChanged.subscribe((exercises:Exercise[])=>{
    this.dataSource.data=exercises;
    console.log(exercises);
   })
   this.trainingService.fetchFinishedExercises();
  }

  ngAfterViewInit()
  {
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  doFilter(filterValue:string){
    console.log(filterValue)
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
  ngOnDestroy()
  {
    if( this.finishedExercisesSubscription)
    {
      this.finishedExercisesSubscription.unsubscribe();
    }
  }
}
