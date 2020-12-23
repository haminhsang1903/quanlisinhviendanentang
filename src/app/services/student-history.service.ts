import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Semester } from './../models/semester.model';
import { Results } from './../models/results.model';
import { Students } from './../models/students.model'; 
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; 
import { ResultStudent } from './../models/resultstudent.model';

@Injectable({ 
  providedIn: 'root'
})
export class StudentHistoryService {

public API : string ='https://serverrunordie.herokuapp.com/result';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getResultHis(): Observable<Results[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')}; 
  	return this.http.get<Results[]>(this.API +'/result/findResultHis', {headers});
  }

  // getPost(id_post: string): Observable<Posts>{
  //   const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
  //   return this.http.get<Posts>(`${this.API}/getOne/${id_post}`, {headers});
  // }

  getHistoryStudent(): Observable<ResultStudent[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<ResultStudent[]>(this.API +`/findHistoryStudent`, {headers});
  }

}
