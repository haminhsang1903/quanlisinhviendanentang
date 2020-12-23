import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rooms } from './../models/rooms.model';
import { RoomsEmpty } from './../models/roomempty.model';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  public API: string = 'https://serverrunordie.herokuapp.com/room';
	
  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  	getAllRooms(): Observable<Rooms[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<Rooms[]>(this.API+'/findAll', {headers});
	}

	getSearch(key: string): Observable<Rooms[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Rooms[]>(`${this.API}/search/${key}`, {headers});
  }

	addRooms(rooms: Rooms): Observable<Rooms> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.post<Rooms>(this.API+'/save', rooms, {headers});
	}

	updateRoom(room: Rooms): Observable<Rooms> {
	    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
	    return this.http.put<Rooms>(`${this.API}/update/`, room, {headers});
	}

	deleteRooms(id_rooms: number): Observable<Rooms> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.delete<Rooms>(`${this.API}/delete/${id_rooms}`, {headers});
	}

	getRoomsdate(date: string): Observable<RoomsEmpty[]> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<RoomsEmpty[]>(`${this.API}/checkRoomEmpty/${date}`, {headers});
	}
}
