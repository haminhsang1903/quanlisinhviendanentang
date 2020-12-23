import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skoftes } from './../models/skoftes.model';
import { StudentByYear } from './../models/studentByYear.model';
import { TotalSubject } from './../models/totalsubject.model';
import { StudentByYearAndMajor } from './../models/studentByYearAndMajor.model';
import { StudentGreatmajorangsemester } from './../models/studentGreatmajorangsemester';
import { StudentGreat } from './../models/studentGreat.model';
import { StudentByMajor } from './../models/studentByMajor.model';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {

	public API: string = 'https://serverrunordie.herokuapp.com/result';
	public API1: string = 'https://serverrunordie.herokuapp.com/student';

  constructor(public http: HttpClient, public cookieservice :CookieService) { } 

    gettotalSubject(): Observable<TotalSubject> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<TotalSubject>(this.API+'/totalsubject', {headers});
	}

	gettotalStudentMajor(): Observable<StudentByMajor[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<StudentByMajor[]>(this.API1+'/totalStudentMajor', {headers});
	}

	gettotalStudentByYear(): Observable<StudentByYear[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<StudentByYear[]>(this.API1+'/totalStudentByYear', {headers});
	}

	gettotalStudentByYearAndMajor(): Observable<StudentByYearAndMajor[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<StudentByYearAndMajor[]>(this.API1+'/totalStudentMajorAndYear', {headers});
	}

	gettotalStudentGreatByYearAndMajor(): Observable<StudentGreatmajorangsemester[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<StudentGreatmajorangsemester[]>(this.API+'/StudentGreatByMajorAndSemester', {headers});
	}

	getStudentGreatBySemester(id_semester: string): Observable<StudentGreat[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<StudentGreat[]>(this.API+`/StudentGreatBySemester/${id_semester}`, {headers});
	}

	getbestSemester(): Observable<StudentGreat[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<StudentGreat[]>(this.API+'/bestSemester', {headers});
	}
}
