import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './../models/course.model';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

	public API: string = 'https://serverrunordie.herokuapp.com/course';
	
  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  	getAllCourse(): Observable<Course[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<Course[]>(this.API+'/findAll', {headers});
	}

	getSearch(key: string): Observable<Course[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Course[]>(`${this.API}/search/${key}`, {headers});
    }

	addCourse(course: Course): Observable<Course> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.post<Course>(this.API+'/save', course, {headers});
	}

    updateCourse(course: Course): Observable<Course> {
        const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
        return this.http.put<Course>(`${this.API}/update/`, course, {headers});
    }

	deleteCourse(id_course: string): Observable<Course> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.delete<Course>(`${this.API}/delete/${id_course}`, {headers});
	}
}
