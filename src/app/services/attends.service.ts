import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Categorys} from './../models/categorys.model'; 
import { Attends } from './../models/attends.model';
import { Students } from './../models/students.model';
import { Observable} from 'rxjs'; 
import {CookieService} from 'ngx-cookie-service';
import { Class } from '../models/class.model';  
import { ResultStudentSemester } from '../models/resultstudentsemester.model'; 
import { CLazzStudentResult } from './../models/CLazzStudentResult.model';

@Injectable({
  providedIn: 'root' 
})
export class AttendsService {

  public API : string ='https://serverrunordie.herokuapp.com/attends';
  public API2 : string ='https://serverrunordie.herokuapp.com/student';
  public API3 : string ='https://serverrunordie.herokuapp.com/clazz'; 
  public API1: string = 'https://serverrunordie.herokuapp.com/result';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getAllStudent(): Observable<Students[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Students[]>(this.API2 +'/findAll', {headers});
  }

  getSearch(key: string): Observable<Attends[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Attends[]>(`${this.API}/search/${key}`, {headers});
  }

  getAllAttends(): Observable<Attends[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Attends[]>(this.API +'/findAll', {headers});
  } 

  addAttends(attends: Attends[]) : Observable<Attends>{
     const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
  	return this.http.post<Attends>(this.API +'/saveAll', attends, {headers});
  }

  getEditAttends(id_student: string):Observable<Students>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Students>(`${this.API2}/getOne/${id_student}`, {headers});
  }

  getEditClazz(id_clazz: string):Observable<Class>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Class>(`${this.API3}/getOne/${id_clazz}`, {headers});
  }

  getAllAttendsByStudent(id_semester: string): Observable<Attends[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Attends[]>(this.API +`/findByStudent/${id_semester}`, {headers});
  }

  getBySemester(id_semester: string): Observable<ResultStudentSemester[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<ResultStudentSemester[]>(this.API +`/findBySemester/${id_semester}`, {headers});
  }

  getFindAttendsByStudentAndClass(id_class: string, id_student: string): Observable<Attends[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Attends[]>(this.API +'/findAttendsByStudentAndClass/'+`${id_class}/${id_student}`, {headers});
  }

  getStudentByClazz(id_class: string): Observable<Students[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Students[]>(`${this.API2}/findByClass/${id_class}`, {headers});
  }

  getAllResultStudent(id_class: string): Observable<CLazzStudentResult[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<CLazzStudentResult[]>(`${this.API1}/findAllResultStudent/${id_class}`, {headers});
  }                                              



}
