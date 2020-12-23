import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Categorys} from './../models/categorys.model'; 
import { Results } from './../models/results.model';
import { Students } from './../models/students.model';
import { ResultStudentSemester } from './../models/resultstudentsemester.model'; 
import { ResultStudent } from './../models/resultstudent.model';
import { Observable } from 'rxjs'; 
import { CookieService } from 'ngx-cookie-service';
import { Class } from '../models/class.model'; 

@Injectable({
  providedIn: 'root' 
})
export class ResultService {  

  public API : string ='https://serverrunordie.herokuapp.com/result';
  public API1 : string ='https://serverrunordie.herokuapp.com/clazz';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getAllByClazzAndStudent(id_class: string): Observable<Results[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Results[]>(this.API +`/findAllByClazzAndStudent/${id_class}`, {headers});
  }

  getSearch(key: string): Observable<Results[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Results[]>(`${this.API}/search/${key}`, {headers});
  }

  getAllClazzBySemester(id_semester: string): Observable<Class[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Class[]>(this.API1 +`/findBySemester/${id_semester}`, {headers});
  }

  getBySemester(id_semester: string): Observable<ResultStudentSemester[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<ResultStudentSemester[]>(this.API +`/findBySemester/${id_semester}`, {headers});
  }

  getTotalAVG(): Observable<Results[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Results[]>(this.API +`/getTotalAVG`, {headers});
  }





  // getHistoryStudent(): Observable<ResultStudent[]>{
  //   const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  //   return this.http.get<ResultStudent[]>(this.API1 +`/findHistoryStudent`, {headers});
  // }





}
