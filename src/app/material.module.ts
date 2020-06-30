import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';


const materialModules=[
    MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,
    MatCheckboxModule
];

@NgModule({
    imports:materialModules,
    exports:materialModules
})
export class MaterialModule {}