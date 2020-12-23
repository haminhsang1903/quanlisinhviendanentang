import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Class } from './../models/class.model';
import { Students } from './../models/students.model';
import { ClassDetail } from './../models/classDetail.model';
import { Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root' 
})
export class ClassDetailService {

  public API : string ='https://serverrunordie.herokuapp.com/clazzdetail';
  public API1 : string ='https://serverrunordie.herokuapp.com/student';
  public API2 : string ='https://serverrunordie.herokuapp.com/clazz';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getAllClazzDetail(): Observable<ClassDetail[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<ClassDetail[]>(this.API +'/findAll', {headers});
  }

  getSearch(key: string): Observable<ClassDetail[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<ClassDetail[]>(`${this.API}/search/${key}`, {headers});
  }
  
  getFindAllByClazz(id_class: string): Observable<ClassDetail[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<ClassDetail[]>(this.API +`/findAllByClazz/${id_class}`, {headers});
  }

  getAllClazz(): Observable<Class[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Class[]>(this.API2 +'/findAll', {headers});
  }

  getAllStudents(): Observable<Students[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Students[]>(this.API1 +'/findAll', {headers});
  }

  getByNominalClazz(id_nominalClazz: string): Observable<Students[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Students[]>(this.API1 +`/findByNominalClass/${id_nominalClazz}`, {headers});
  }

  getFindNotlnClassDeatail(id_class: string, id_nominalClazz: string): Observable<Students[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Students[]>(this.API1 +`/findNotInClazzDetail/${id_class}/${id_nominalClazz}`, {headers});
  }

  addClazzDetail(clazzdetail: ClassDetail[]) : Observable<ClassDetail[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.post<ClassDetail[]>(this.API +'/saveAll', clazzdetail, {headers});
  }

  deleteClazzDetail(id_clazzdetail: number): Observable<ClassDetail>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.delete<ClassDetail>(this.API +'/delete' +"/"+ id_clazzdetail, {headers});
  }

  /////////////////////////////////////////////////////////////////////////////////

  getEditClazz(id_class: string):Observable<Class>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Class>(`${this.API2}/getOne/${id_class}`, {headers});
  }

  getEditStudent(id_students: string):Observable<Students>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Students>(`${this.API1}/getOne/${id_students}`, {headers});
  }
}
