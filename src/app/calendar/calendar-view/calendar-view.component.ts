import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CalendarFormComponent } from '../calendar-form/calendar-form.component';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { Appointment } from 'src/app/shared/models/appointment.model';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  highPriorityAppointments: Appointment[] = [];
  mediumPriorityAppointments: Appointment[] = [];
  lowPriorityAppointments: Appointment[] = [];

  constructor(private calendarService: CalendarService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.calendarService.appointments$.subscribe((appointments) => {
      this.highPriorityAppointments = appointments.filter(appointment => appointment.priority === 'High');
      this.mediumPriorityAppointments = appointments.filter(appointment => appointment.priority === 'Medium');
      this.lowPriorityAppointments = appointments.filter(appointment => appointment.priority === 'Low');
    });
  }

  openAddAppointment(): void {
    const dialogRef = this.dialog.open(CalendarFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.calendarService.addAppointment(result);
      }
    });
  }


  drop(event: CdkDragDrop<Appointment[]>): void {
    if (event.previousContainer === event.container) {
      return;
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const droppedItem = event.container.data[event.currentIndex];
      if (event.container.id === 'highPriorityList') {
        droppedItem.priority = 'High';
      } else if (event.container.id === 'mediumPriorityList') {
        droppedItem.priority = 'Medium';
      } else if (event.container.id === 'lowPriorityList') {
        droppedItem.priority = 'Low';
      }

      this.calendarService.updateAppointments([
        ...this.highPriorityAppointments,
        ...this.mediumPriorityAppointments,
        ...this.lowPriorityAppointments
      ]);
    }
  }

  deleteAppointment(appointment: Appointment, priority: string): void {
    if (priority === 'High') {
      this.highPriorityAppointments = this.highPriorityAppointments.filter(item => item !== appointment);
    } else if (priority === 'Medium') {
      this.mediumPriorityAppointments = this.mediumPriorityAppointments.filter(item => item !== appointment);
    } else if (priority === 'Low') {
      this.lowPriorityAppointments = this.lowPriorityAppointments.filter(item => item !== appointment);
    }

    this.calendarService.updateAppointments([
      ...this.highPriorityAppointments,
      ...this.mediumPriorityAppointments,
      ...this.lowPriorityAppointments
    ]);
  }
}
