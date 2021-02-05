import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  readonly baseURL: string = 'https://localhost:5001/api/Student';

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Student[]>(this.baseURL);
  }

  create(student: Student) {
    return this.http.post(this.baseURL, student);
  }

  update(student: Student) {
    return this.http.put(`${this.baseURL}/${student.id}`, student);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
