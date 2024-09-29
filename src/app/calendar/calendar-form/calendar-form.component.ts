import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { Appointment } from 'src/app/shared/models/appointment.model';
import { CustomValidators } from 'src/app/shared/validators/custom-validator';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {
  appointmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private dialogRef: MatDialogRef<CalendarFormComponent>
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
    });

    this.appointmentForm.get('priority')?.valueChanges.subscribe(priority => {
      if (priority === 'High') {
        this.appointmentForm.get('description')?.setValidators([
          Validators.required,
          CustomValidators.prohibitedExactWords
        ]);
      } else {
        this.appointmentForm.get('description')?.setValidators([CustomValidators.prohibitedExactWords]);
      }
      this.appointmentForm.get('description')?.updateValueAndValidity();
    });
  }

  submitForm(): void {
    if (this.appointmentForm.valid) {
      const appointment = new Appointment(
        this.appointmentForm.value.title,
        this.appointmentForm.value.description,
        this.appointmentForm.value.priority,
        new Date()
      );

      this.calendarService.addAppointment(appointment);
      this.dialogRef.close();
    }
  }
}
