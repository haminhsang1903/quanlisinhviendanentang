import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Subjects } from './../models/subjects.model';
import { Semester } from './../models/semester.model';  
import { Class } from './../models/class.model';
import { Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import { Lecturers } from '../models/lecturers.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

	public API : string ='https://serverrunordie.herokuapp.com/semester';
	public API1 : string ='https://serverrunordie.herokuapp.com/subject';
	public API2 : string ='https://serverrunordie.herokuapp.com/clazz';

  constructor(public http: HttpClient, public cookieservice :CookieService) { } 

  getAllSemester(): Observable<Semester[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Semester[]>(this.API +'/findAll', {headers});
  }

  getSearch(key: string): Observable<Class[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Class[]>(`${this.API2}/search/${key}`, {headers});
  }

  getAllSubject(): Observable<Subjects[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Subjects[]>(this.API1 +'/findAll', {headers});
  }

  getAllClazz(): Observable<Class[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Class[]>(this.API2 +'/findAll', {headers});
  }

  getAllClazzAddStudent(): Observable<Class[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Class[]>(this.API2 +'/findAllClazzAddStudent', {headers});
  }

  addClazz(clazz: Class) : Observable<Class>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.post<Class>(this.API2 +'/save', clazz, {headers});
  }

  updateClass(clazz: Class): Observable<Class> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.put<Class>(`${this.API2}/update/`, clazz, {headers});
  }

  deleteClazz(id_class: string): Observable<Class>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.delete<Class>(this.API2 +'/delete' +"/"+ id_class, {headers});
  }

  /////////////////////////////////////////////////////////////////////////////////

  getEditSemester(id_semester: string):Observable<Semester>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Semester>(`${this.API}/getOne/${id_semester}`, {headers});
  }

  getEditSubject(id_subject: string):Observable<Subjects>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Subjects>(`${this.API1}/getOne/${id_subject}`, {headers});
  }

  getOneClass(id_class: string): Observable<Class>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Class>(`${this.API2}/getOne/${id_class}`, {headers});
  }
  
}
