import { Injectable } from '@angular/core';
import { Schedules } from './../models/schedules.model';
import { Class } from './../models/class.model';
import { Skoftes } from './../models/skoftes.model';
import { Lecturers } from './../models/lecturers.model';
import { Rooms } from './../models/rooms.model'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService { 
  public API6: string = 'https://serverrunordie.herokuapp.com'; 
  public API: string = 'https://serverrunordie.herokuapp.com/schedules'; 
  public API1: string = 'https://serverrunordie.herokuapp.com/clazz';
  public API2: string = 'https://serverrunordie.herokuapp.com/room';
  public API3: string = 'https://serverrunordie.herokuapp.com/lecturers';
  public API4: string = 'https://serverrunordie.herokuapp.com/skoftes';
  public API5: string = 'https://serverrunordie.herokuapp.com/filter/';

  constructor(
    public http: HttpClient,  
    public cookieservice: CookieService

  ) { }

  getAllSchedules(): Observable<Schedules[]> {

    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token') };

    return this.http.get<Schedules[]>(this.API+'/findAll', { headers });
  }

  getSearch(key: string): Observable<Schedules[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Schedules[]>(`${this.API}/search/${key}`, {headers});
  }

  getAllSchedulesDateNow(): Observable<Schedules[]> {

    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token') };

    return this.http.get<Schedules[]>(this.API+'/findAllByAllLecturer', { headers }); 
  }

  //// get schedules students
  getAllSchedulesByStudent(changenumber: string): Observable<Schedules[]> {

    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token') };

    return this.http.get<Schedules[]>(`${this.API}/findAllByStudent/${changenumber}`, { headers });
  }

  //// get schedule lecturers
  getAllSchedulesByLecturers(dateAdd: string): Observable<Schedules[]> {

    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token') };

    return this.http.get<Schedules[]>(`${this.API}/findAllByLecturer/${dateAdd}`, { headers });
  }

  addAutoSchedules(id_class: string): Observable<Schedules[]> { 

    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token') };
    //console.log(id_class)
		return this.http.get<Schedules[]>(`${this.API6}/auto/createSche/${id_class}`, { headers });
	}

  addSchedules(schedules: Schedules): Observable<Schedules> { 

    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token') };

    return this.http.post<Schedules>(this.API+'/save', schedules, { headers });
  }

  updateSchedules(schedule: Schedules): Observable<Schedules> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.put<Schedules>(`${this.API}/update/`, schedule, {headers});
  }

	deleteSchedules(id_schedules: number): Observable<Schedules> {

    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token') };

		return this.http.delete<Schedules>(`${this.API}/delete/${id_schedules}`, { headers });
  }

  getEditClass(id_clazz: string):Observable<Class>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Class>(`${this.API1}/getOne/${id_clazz}`, {headers});
  }

  getEditClasss(id_clazz: string):Observable<Class[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Class[]>(`${this.API1}/getOne/${id_clazz}`, {headers});
  }

  getEditRooms(id_room: number):Observable<Rooms>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Rooms>(`${this.API2}/getOne/${id_room}`, {headers});
  }

  getEditTeacher(id_lecturers: string):Observable<Lecturers>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Lecturers>(`${this.API3}/getOne/${id_lecturers}`, {headers});
  }

  getEditSkoftes(id_skoftes: number):Observable<Skoftes>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Skoftes>(`${this.API4}/getOne/${id_skoftes}`, {headers});
  }

  getFilterLecturer(id_class: string): Observable<Lecturers[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Lecturers[]>(`${this.API5}fillLecturer/${id_class}`, {headers});
  }

  getfillRoomBySkoftesAndDate(date: Date, skoftes: number, rooms: number): Observable<Rooms[]>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Rooms[]>(`${this.API5}fillRoomBySkoftesAndDate/${date}/${skoftes}/${rooms}`, {headers});
  }

  
}
