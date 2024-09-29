import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  appointments$: Observable<Appointment[]> = this.appointmentsSubject.asObservable();

  addAppointment(appointment: Appointment): void {
    const currentAppointments = this.appointmentsSubject.getValue();
    this.appointmentsSubject.next([...currentAppointments, appointment]);
  }

  deleteAppointment(index: number): void {
    const currentAppointments = this.appointmentsSubject.getValue();
    currentAppointments.splice(index, 1);
    this.appointmentsSubject.next([...currentAppointments]);
  }

  updateAppointments(appointments: Appointment[]): void {
    this.appointmentsSubject.next(appointments);
  }

}
