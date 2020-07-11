import { NgModule } from '@angular/core';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StopTrainingConfirmComponent } from './current-training/stop-training-confirm/stop-training-confirm.component';
import { TrainingRoutingModule } from './training-routing.module';
// import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingConfirmComponent
    ],
    imports:[
        // CommonModule,
        TrainingRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFirestoreModule
    ],
    exports:[],
    entryComponents:[StopTrainingConfirmComponent]
})
export class TrainingModule{}