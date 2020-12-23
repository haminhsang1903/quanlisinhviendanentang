import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Categorys} from './../models/categorys.model'; 
import { Attends } from './../models/attends.model';
import { Students } from './../models/students.model';
import { Schedules } from './../models/schedules.model';
import { CLazzStudentResult } from './../models/CLazzStudentResult.model';
import { Observable} from 'rxjs'; 
import {CookieService} from 'ngx-cookie-service';
import { Class } from '../models/class.model'; 

@Injectable({
  providedIn: 'root'
})
export class TeacherMyclassService {

	public API : string ='https://serverrunordie.herokuapp.com/clazz';
	public API1 : string ='https://serverrunordie.herokuapp.com/schedules';
  public API4: string = 'https://serverrunordie.herokuapp.com/student';
  public API3: string = 'https://serverrunordie.herokuapp.com/result';
  public API2 : string ='https://serverrunordie.herokuapp.com/attends';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getfindClazzByLecturer(): Observable<Class[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Class[]>(this.API +'/findClazzByLecturer', {headers}); 
  }

  getfindAllByLecturer(): Observable<Schedules[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Schedules[]>(this.API1 +'/findAllByLecturers', {headers});
  }

  getfindAllByDateNow(): Observable<Schedules[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Schedules[]>(this.API1 +'/findAllByDatenow', {headers});
  } 

  getClazzByLecture(): Observable<Class[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Class[]>(this.API +'/findClazzByLecturerCbb', {headers});
  }

  getStudentByClazz(id_class: string): Observable<Students[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Students[]>(`${this.API4}/findByClass/${id_class}`, {headers});
  }

  getAllResultStudent(id_class: string): Observable<CLazzStudentResult[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<CLazzStudentResult[]>(`${this.API3}/findAllResultStudent/${id_class}`, {headers});
  }

  getByLecturer(id_clazz: string): Observable<Attends[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Attends[]>(this.API2 +`/findByLecturer/${id_clazz}`, {headers});
  }

  addAttendsLecture(attends: Attends[]) : Observable<Attends[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
   return this.http.post<Attends[]>(this.API2 +'/saveAll', attends, {headers});
 }

 getOneClass(id_class: string): Observable<Class>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Class>(`${this.API}/getOne/${id_class}`, {headers});
  }



}
