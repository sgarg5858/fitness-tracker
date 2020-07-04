import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit,AfterViewInit {

  constructor(private trainingService:TrainingService) { }

  @ViewChild( MatSort,{static:true} ) sort:MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  displayedColumns=['date','name','duration','calories','state'];
  dataSource=new MatTableDataSource<Exercise>();

  ngOnInit(): void {
   this.dataSource.data=this.trainingService.getExercises();
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
}
