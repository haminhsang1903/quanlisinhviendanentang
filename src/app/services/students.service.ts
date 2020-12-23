import { Injectable } from '@angular/core';
import { Students } from './../models/students.model';
import { NominalClass } from './../models/nomialClass.model';
import { Major } from './../models/major.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import { Address } from '../models/address.model';
import { Districts } from '../models/districts.model';
import { Wards } from '../models/wards.model';

@Injectable({ 
  providedIn: 'root' 
}) 
export class StudentsService {

  public API: string = 'https://serverrunordie.herokuapp.com/student';
  public API1: string = 'https://serverrunordie.herokuapp.com/nominalClass';
  public API2: string = 'https://serverrunordie.herokuapp.com/major';
  public API3: string = 'https://serverrunordie.herokuapp.com/address/';
  public API4: string = 'https://serverrunordie.herokuapp.com/';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getAllStudents(): Observable<Students[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<Students[]>(this.API+'/findAll', {headers});
  }

  getSearch(key: string): Observable<Students[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Students[]>(`${this.API}/search/${key}`, {headers});
  }

  addStudents(students: Students): Observable<Students> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.post<Students>(this.API+'/save', students, {headers});
	}
  updateStudents(students: Students): Observable<Students> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.put<Students>(`${this.API}/update/`, students, {headers});
  }

	deleteStudents(id_students: string): Observable<Students[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.delete<Students[]>(`${this.API}/delete/${id_students}`, {headers});
	}

   getEditNominal(id_nominal: string):Observable<NominalClass>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<NominalClass>(`${this.API1}/getOne/${id_nominal}`, {headers});
  }

   getEditMajor(id_major: string):Observable<Major>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Major>(`${this.API2}/getOne/${id_major}`, {headers});
  }
  getEditStudent(id_students: string):Observable<Students>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Students>(`${this.API}/getOne/${id_students}`, {headers});
  }

  getUploadStudent(formData: FormData){
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')}; 
  return this.http.post(this.API+'/uploadSV', formData, {headers});
  }

  getAddress(): Observable<Address[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Address[]>(`${this.API3}findAll`, {headers});
  }

  getDistricts(provence: string): Observable<Districts[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Districts[]>(`${this.API3}districts/${provence}`, {headers});
  }

  getWard(provence: string, disctrict: string): Observable<Wards[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Wards[]>(`${this.API3}ward/${provence}/${disctrict}`, {headers});
  }

  getUploadImgStudent(formData: FormData){
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')}; 
  return this.http.post(this.API4+'cloud/uploads', formData, {headers});
  }
  
}
