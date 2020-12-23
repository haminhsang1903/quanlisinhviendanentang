import { Injectable } from '@angular/core'; 
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Subjects } from './../models/subjects.model';
import { Class } from './../models/class.model';
import { Results } from './../models/results.model';
import { Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class ManageResultService {

public API : string ='https://serverrunordie.herokuapp.com/clazz';
public API2 : string ='https://serverrunordie.herokuapp.com/result';

  constructor(public http: HttpClient, 
              public cookieservice :CookieService) { } 

  getAllClazz(): Observable<Class[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Class[]>(this.API +'/findAll', {headers});
  }

  AddResult(results: Results[]): Observable<Results>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.post<Results>(this.API2 +'/saveAll', results, {headers});
  }


  getAllByClazzAndStudent(id_class: string, id_student: string): Observable<Results[]>{
  	const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Results[]>(this.API2 +'/findAllByClazzAndStudent/'+`${id_class}/${id_student}`, {headers});
  }

  // get(clazz: Class) : Observable<Class>{
  //   const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  // 	return this.http.post<Class>(this.API2 +'/save', clazz, {headers});
  // }
}
