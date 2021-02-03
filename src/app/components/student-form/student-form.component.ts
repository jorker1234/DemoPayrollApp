import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/shared/student.model';
import { StudentService } from '../../shared/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  @Output() onDataChanged = new EventEmitter<any>();
  @Input() student:Student = new Student();
  studentForm: FormGroup;
  firstname:string = "a";

  constructor(private studentService: StudentService) { 
    this.student = new Student();
    this.initForm();
  }

  ngOnInit(): void {

  }

  private initForm() {
    this.studentForm = new FormGroup ({
      id: new FormControl(this.student?.id || 0),
      firstname: new FormControl(this.student?.firstname, [Validators.required, Validators.maxLength(100)]),
      lastname: new FormControl(this.student?.lastname, [Validators.required, Validators.maxLength(100)]),
    });
  }

  onSubmit({value, valid}: {value: Student, valid: boolean}){
    if(valid){
      if(value.id === 0){
        this.createStudent(value);
      }else {
        this.updateStudent(value);
      }
    }
  }

  private createStudent(student: Student){
    this.studentService.create(student).subscribe(o => {
      this.onDataChanged.emit();
    });
  }

  private updateStudent(student: Student){
    this.studentService.update(student).subscribe(o => {
      this.onDataChanged.emit();
    });
  }
}
