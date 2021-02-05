import { Component, OnInit, ViewChild } from "@angular/core";
import { Student } from "src/app/shared/student.model";
import { StudentService } from "src/app/shared/student.service";

@Component ({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
    constructor(private studentService: StudentService) {

    }

    @ViewChild('closeButton') closeButton: any;
    @ViewChild('closeButtonDeleteDialog') closeButtonDeleteDialog: any;

    public students: Student[] = [];
    public student_selected: Student = new Student();

    ngOnInit(): void {
        this.listStudents();
    }

    onSelected(student?:Student): void {
        this.student_selected = student || new Student();
    }

    onDeleted(student:Student){
        this.studentService.delete(student.id).subscribe( () => {
        this.listStudents();
        this.closeButtonDeleteDialog.nativeElement.click();
        });
    }

    onDataChanged(): void {
        this.listStudents();
        this.closeButton.nativeElement.click();
    }

    private listStudents(): void {
        this.studentService.list().subscribe(students => {
        this.students = students;
        });
    }
}