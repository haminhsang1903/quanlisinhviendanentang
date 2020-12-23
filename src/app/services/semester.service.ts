import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Semester } from './../models/semester.model';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  public API: string = 'https://serverrunordie.herokuapp.com/semester';
	
  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  	getAllSemester(): Observable<Semester[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<Semester[]>(this.API+'/findAll', {headers});
	}

	getSearch(key: string): Observable<Semester[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Semester[]>(`${this.API}/search/${key}`, {headers});
  }

	editSemester(id_semester : string): Observable<Semester> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<Semester>(`${this.API}/getOne/${id_semester}`, {headers});
	}

	addSemester(semester: Semester): Observable<Semester> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.post<Semester>(this.API+'/save', semester, {headers});
	}

	updateSemester(semester: Semester): Observable<Semester> {
	    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
	    return this.http.put<Semester>(`${this.API}/update/`, semester, {headers});
	}

	deleteSemester(id_semester: string): Observable<Semester> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.delete<Semester>(`${this.API}/delete/${id_semester}`, {headers});
	}
}
