import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Class } from '../models/class.model';
import { EvaluetesSer } from '../models/evaluetesser.model';
import { Evaluetes } from '../models/evaluetes.model';
import { Lecturers } from '../models/lecturers.model';
import { avgEvaluetesLec } from '../models/avgEvaluetesLec.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluesService {

  public API : string ='https://serverrunordie.herokuapp.com/clazz/';
  public API1: string ='https://serverrunordie.herokuapp.com/lecturers/';
  public API3 : string ='https://serverrunordie.herokuapp.com/evaluetes/';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getClazzEvalue(): Observable<Class[]>{ 
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Class[]>(this.API+'getClazzEvalue', {headers});
  }

  getSearch(key: string): Observable<Evaluetes[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Evaluetes[]>(`${this.API3}/search/${key}`, {headers});
  }

   getavgEvaluetesLec(): Observable<avgEvaluetesLec[]>{ 
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<avgEvaluetesLec[]>(this.API3+'convert3', {headers});
  }

  getAllEvalueTesSer(id_lecturers: string): Observable<EvaluetesSer[]>{ 
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<EvaluetesSer[]>(this.API3+`viewEvalueLecturers/${id_lecturers}`, {headers});
  }

  getLecturefindByClazz(id_clazz: string): Observable<Lecturers>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Lecturers>(this.API1+`findByClazz/${id_clazz}`, {headers});
  }

  addEvalue(evalues: Evaluetes): Observable<Evaluetes>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.post<Evaluetes>(this.API3+`save`, evalues ,{headers});
  }

  getEvalueFindByClazz(id_class: string): Observable<Evaluetes[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Evaluetes[]>(this.API3+`findByClazz/${id_class}`, {headers});
  }
}
