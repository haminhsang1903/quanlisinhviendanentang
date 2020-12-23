import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Employee } from './../models/employee.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Address } from '../models/address.model'; 
import { Districts } from '../models/districts.model';
import { Wards } from '../models/wards.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public API : string ='https://serverrunordie.herokuapp.com/employee';
  public API1: string = 'https://serverrunordie.herokuapp.com/address/';
 
  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getAllEmployee(): Observable<Employee[]>{ 
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Employee[]>(this.API +'/findAll', {headers});
  }

  getSearch(key: string): Observable<Employee[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Employee[]>(`${this.API}/search/${key}`, {headers});
  }

  addEmployee(employee: Employee) : Observable<Employee>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.post<Employee>(this.API +'/save', employee, {headers});
  }

  addPostavt(id_employee: string, formData: FormData){
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.post(`${this.API}/postavt/${id_employee}`, formData, {headers});
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.put<Employee>(`${this.API}/update/`, employee, {headers});
  }

   deleteEmployee(id_employee: string): Observable<Employee>{
     const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.delete<Employee>(this.API +'/delete' +"/"+ id_employee, {headers});
  }

  getOneEmployee(id_employee: string): Observable<Employee>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Employee>(this.API +'/getOne/'+ id_employee, {headers});
  }
  
  getAddress(): Observable<Address[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Address[]>(`${this.API1}findAll`, {headers});
  }

  getDistricts(provence: string): Observable<Districts[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Districts[]>(`${this.API1}districts/${provence}`, {headers});
  }

  getWard(provence: string, disctrict: string): Observable<Wards[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Wards[]>(`${this.API1}ward/${provence}/${disctrict}`, {headers});
  }
}
