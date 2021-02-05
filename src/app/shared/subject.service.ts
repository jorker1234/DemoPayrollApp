import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "./subject.model";

@Injectable ({
    providedIn: 'root'
})

export class SubjectService {
    constructor(private http: HttpClient){

    }
    readonly baseURL: string = 'https://localhost:5001/api/Subject';

    list(){
        return this.http.get<Subject[]>(this.baseURL);
    }

    create(subject: Subject) {
        return this.http.post(this.baseURL, subject);
    }

    update(subject: Subject) {
        return this.http.put(`${this.baseURL}/${subject.id}`, subject);
    }

    delete(id: number) {
        return this.http.delete(`${this.baseURL}/${id}`);
    }
}