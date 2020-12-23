import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './../models/account.model';
import { MyResponse } from './../models/response.model';
import { Students } from './../models/students.model';
import { Lecturers } from './../models/lecturers.model';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import { User } from '../models/user.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public API: string = 'https://serverrunordie.herokuapp.com/api/auth/';
  public API4: string = 'https://serverrunordie.herokuapp.com/api/';
  public API1: string = 'https://serverrunordie.herokuapp.com/student/';
  public API2: string = 'https://serverrunordie.herokuapp.com/lecturers/';
  public API3: string = 'https://serverrunordie.herokuapp.com/employee/';
  constructor(public http: HttpClient, public cookieservice: CookieService) { }

  login(account: Account): Observable<MyResponse> {
		return this.http.post<MyResponse>(this.API+'signin', account);
  }

  getUsername(email: string): Observable<Students> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Students>(this.API1+`findByEmail/${email}`, {headers});
  }

  getUsernameLecturer(email: string): Observable<Lecturers> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Lecturers>(this.API2+`findByEmail/${email}`, {headers});
  }
  getUsernamDaoTao(email:string): Observable<Employee> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Employee>(this.API3+`findByEmail/${email}`, {headers});
  }
  changePassword(user: User):Observable<User>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    console.log(headers);
    return this.http.post<User>(this.API4+`changePass`, user ,{headers});
  }
}
