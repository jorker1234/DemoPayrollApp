import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';
import { Student } from '../shared/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  public students: Student[] = [];
  public student_selected: Student;

  ngOnInit(): void {
    this.listStudents();
  }

  onSelected(student?:Student): void {
    this.student_selected = student || new Student();
  }

  onDataChanged(): void {
    this.listStudents();
    // var myModalEle = document.getElementById('studentDialog');
    // var modal = bootstrap.Modal.getInstance(myModalEle);
    // console.log(modal);
  }

  private listStudents(): void {
    this.studentService.list().subscribe(students => {
      this.students = students;
    });
  }

}
