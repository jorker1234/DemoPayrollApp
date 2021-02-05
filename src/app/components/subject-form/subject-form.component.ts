import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'src/app/shared/subject.model';
import { FormGroup, FormControl } from '@angular/forms';
import { SubjectService } from 'src/app/shared/subject.service';

@Component({
    selector: 'app-subject-form',
    templateUrl: './subject-form.component.html',
    styleUrls: ['./subject-form.component.css']
})

export class SubjectFormComponent implements OnInit {
    constructor(private subjectService: SubjectService) {}
    @Input() subject: Subject = new Subject();
    @Output() onDataChanged = new EventEmitter<any>();
    subjectForm: FormGroup;

    ngOnInit(): void {
        this.subjectForm = new FormGroup({
            id: new FormControl(this.subject.id || 0),
            name: new FormControl(this.subject.name),
            unit: new FormControl(this.subject.unit || 1),
            price: new FormControl(this.subject.price || 0),
        });
    }

    onSubmit({value, valid}: {value: Subject, valid: boolean}){
        if(valid){
            if(value.id === 0){
                this.createSubject(value);
            }else {
                this.updateSubject(value);
            }
        }
    }

    private createSubject(subject: Subject){
        this.subjectService.create(subject).subscribe(o => {
          this.onDataChanged.emit();
        });
      }
    
      private updateSubject(subject: Subject){
        this.subjectService.update(subject).subscribe(o => {
          this.onDataChanged.emit();
        });
      }
}