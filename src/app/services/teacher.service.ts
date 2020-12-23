import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Lecturers } from './../models/lecturers.model';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import { Address } from '../models/address.model';
import { Districts } from '../models/districts.model';
import { Wards } from '../models/wards.model';
 
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

public API : string ='https://serverrunordie.herokuapp.com/lecturers';
public API1: string = 'https://serverrunordie.herokuapp.com/address/';

  constructor(public http: HttpClient, public cookieservice :CookieService) { } 

  getAllLecturers(): Observable<Lecturers[]>{ 
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Lecturers[]>(this.API +'/findAll', {headers});
  }

  getSearch(key: string): Observable<Lecturers[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Lecturers[]>(`${this.API}/search/${key}`, {headers});
  }

  addLecturers(lecturers: Lecturers) : Observable<Lecturers>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.post<Lecturers>(this.API +'/save', lecturers, {headers});
  }

  addPostavt(id_lecturers: string, formData: FormData){
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.post(`${this.API}/postavt/${id_lecturers}`, formData, {headers});
  }

  updatelecturers(lecturers: Lecturers): Observable<Lecturers> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.put<Lecturers>(`${this.API}/update/`, lecturers, {headers});
  }

   deleteLecturers(id_lecturers: string): Observable<Lecturers>{
     const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.delete<Lecturers>(this.API +'/delete' +"/"+ id_lecturers, {headers});
  }

  getOneLecturers(id_lecturers: string): Observable<Lecturers>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Lecturers>(this.API +'/getOne/'+ id_lecturers, {headers});
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
