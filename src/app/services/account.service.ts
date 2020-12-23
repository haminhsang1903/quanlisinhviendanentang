import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; 
import { Account } from '../models/account.model';
import { Roles } from '../models/role.model'; 
import { Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Students } from '../models/students.model';
import { Lecturers } from '../models/lecturers.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  

  public API: string = 'https://serverrunordie.herokuapp.com/api';
  public API1: string = 'https://serverrunordie.herokuapp.com/student/';
  public API2: string = 'https://serverrunordie.herokuapp.com/lecturers/';
  public API3 : string ='https://serverrunordie.herokuapp.com/employee/';

  constructor(
    public http: HttpClient,
    public cookieservice: CookieService
  ) { }

  getAllAccount(): Observable<Account[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Account[]>(this.API +'/findAll', {headers});
  }

  getSearch(key: string): Observable<Account[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Account[]>(`${this.API}/search/${key}`, {headers});
  }

  getRoles(): Observable<Roles[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Roles[]>(this.API +'/findRoles', {headers});
  }

  addAccount(account: Account): Observable<Account>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.post<Account>(this.API +'/save', account, {headers});
  }

  updateAccount(account: Account): Observable<Account> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.put<Account>(`${this.API}/update/`, account, {headers});
  }

  deleteAccount(id: number): Observable<Account[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.delete<Account[]>(this.API +`/delete/${id}`, {headers});
  }
  getOneRole(id:number ): Observable<Roles> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Roles>(this.API +`/getRole/${id}`, {headers});
  }

  getUsernameStudent(email: string): Observable<Students> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Students>(this.API1+`findByEmail/${email}`, {headers});
  }
  getUsernameLecturer(email: string): Observable<Lecturers> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Lecturers>(this.API2+`findByEmail/${email}`, {headers});
  }
  getUsernameEmployee(email: string): Observable<Employee> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Employee>(this.API3+`findByEmail/${email}`, {headers});
  }
}