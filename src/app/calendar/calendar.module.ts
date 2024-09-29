import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../material/angular-material.module';

const routes: Routes = [
  {
    path: '',
    component: CalendarViewComponent
  },
];

@NgModule({
  declarations: [
    CalendarFormComponent,
    CalendarViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class CalendarModule { }
