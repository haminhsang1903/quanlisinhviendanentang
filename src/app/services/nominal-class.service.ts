import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NominalClass } from './../models/nomialclass.model';
import { Course } from './../models/course.model';
import { Students } from './../models/students.model'
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service'; 

@Injectable({
  providedIn: 'root'
})
export class NominalClassService {

  public API: string = 'https://serverrunordie.herokuapp.com/nominalClass';
  public API1: string = 'https://serverrunordie.herokuapp.com/course';
  public API2: string = 'https://serverrunordie.herokuapp.com/student';
	
  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  	getAllNominalClass(): Observable<NominalClass[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<NominalClass[]>(this.API+'/findAll', {headers});
	}

	getSearch(key: string): Observable<NominalClass[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<NominalClass[]>(`${this.API}/search/${key}`, {headers});
  }

	addNominalClass(nominalClass: NominalClass): Observable<NominalClass> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.post<NominalClass>(this.API+'/save', nominalClass, {headers});
	}

	updateNominalClass(nominalcalss: NominalClass): Observable<NominalClass> {
	    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
	    return this.http.put<NominalClass>(`${this.API}/update/`, nominalcalss, {headers});
	}

	deleteNominalClass(id_nominalclass: string): Observable<NominalClass> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.delete<NominalClass>(`${this.API}/delete/${id_nominalclass}`, {headers});
	}

	getEditCourse(id_course: string):Observable<Course>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Course>(`${this.API1}/getOne/${id_course}`, {headers});
    }

  getStudentNullNominalClass(id_major: string):Observable<Students[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Students[]>(`${this.API2}/getStudentNullNominalClass/${id_major}`, {headers});
  }

    addStudentsToNominalclass(id_nominalclass: string, students: Students[]): Observable<Students> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.post<Students>(`${this.API2}/addSVToNominalClass/${id_nominalclass}`, students, {headers});
	}

	getFindAllNominalclass(id_nominalclass: string): Observable<Students[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<Students[]>(`${this.API2}/findByNominalClass/${id_nominalclass}`, {headers});
	}

}
