import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Subjects } from './../models/subjects.model';
import { Observable} from 'rxjs';  
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

   public API : string ='https://serverrunordie.herokuapp.com/subject';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getAllSubject(): Observable<Subjects[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Subjects[]>(this.API +'/findAll', {headers});
  }

  getSearch(key: string): Observable<Subjects[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Subjects[]>(`${this.API}/search/${key}`, {headers});
  }

  addSubject(subject: Subjects) : Observable<Subjects>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.post<Subjects>(this.API +'/save', subject, {headers});
  }

  updateSubject(subject: Subjects): Observable<Subjects> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.put<Subjects>(`${this.API}/update/`, subject, {headers});
  }

  getSubject(id_subjects: string): Observable<Subjects>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Subjects>(`${this.API}/getOne/${id_subjects}`, {headers});
  }

   deleteSubject(id_subjects: string): Observable<Subjects>{
     const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.delete<Subjects>(this.API +'/delete' +"/"+ id_subjects, {headers});
  }
}
