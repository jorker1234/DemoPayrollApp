import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'src/app/shared/subject.model';
import { SubjectService } from 'src/app/shared/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  constructor(private subjectService: SubjectService) { }

  @ViewChild("closeButton") closeButton: any;
  @ViewChild("closeButtonDeleteDialog") closeButtonDeleteDialog: any;
  subjects: Subject[] = [];
  public subject_selected: Subject = new Subject();
  

  ngOnInit(): void {
    this.listSubjects();
  }

  onDataChanged(): void {
    this.listSubjects();
    this.closeButton.nativeElement.click();
}

  onSelected(subject?: Subject){
    this.subject_selected = subject || new Subject();
  }

  onDeleted(subject: Subject){
    this.subjectService.delete(subject.id).subscribe(() => {
      this.listSubjects();
      this.closeButtonDeleteDialog.nativeElement.click();
    });
  }

  private listSubjects() {
    this.subjectService.list().subscribe(subjects => {
      this.subjects = subjects;
    });
  }
}
