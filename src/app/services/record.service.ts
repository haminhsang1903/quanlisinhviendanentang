import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Record} from './../models/record.model';
import { Students } from './../models/students.model';
import { Semester } from './../models/semester.model';
import { Observable} from 'rxjs';
import { Token } from './../models/token.model';
import { LoginComponent } from './../components-login/login/login.component';
import {CookieService} from 'ngx-cookie-service'; 

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  public API : string ='https://serverrunordie.herokuapp.com/record';
  public API1 : string ='https://serverrunordie.herokuapp.com/student';
  public API2 : string = 'https://serverrunordie.herokuapp.com/semester';

  constructor(public http: HttpClient, public cookieservice :CookieService) { } 

  getAllRecord(): Observable<Record[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')}; 
  	return this.http.get<Record[]>(this.API +'/findAll', {headers});
  }

  getSearch(key: string): Observable<Record[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Record[]>(`${this.API}/search/${key}`, {headers});
  }

  getAllRecordStudent(): Observable<Record[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')}; 
    return this.http.get<Record[]>(this.API +'/findByStudent', {headers});
  }

  getAllStudent(): Observable<Students[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')}; 
  	return this.http.get<Students[]>(this.API1 +'/findAll', {headers});
  }

  getAllSemester(): Observable<Semester[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')}; 
  	return this.http.get<Semester[]>(this.API2 +'/findAll', {headers});
  }

  addRecord(record: Record) : Observable<Record>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.post<Record>(this.API +'/save', record, {headers});
  }

  getOneSemester(id_semester: string):Observable<Semester>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Semester>(`${this.API2}/getOne/${id_semester}`, {headers});
  }

  getOneStudent(id_students: string):Observable<Students>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Students>(`${this.API1}/getOne/${id_students}`, {headers});
  }

  deleteRecord(id_record: number): Observable<Record>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.delete<Record>(this.API +'/delete' +"/"+ id_record, {headers});
  }
}
