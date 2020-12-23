import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skoftes } from './../models/skoftes.model';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class SkoftesService { 

  public API: string = 'https://serverrunordie.herokuapp.com/skoftes';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

    getAllSkoftes(): Observable<Skoftes[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<Skoftes[]>(this.API+'/findAll', {headers});
	}
	getSearch(key: string): Observable<Skoftes[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Skoftes[]>(`${this.API}/search/${key}`, {headers});
    }

	addSkoftes(skoftes: Skoftes): Observable<Skoftes> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.post<Skoftes>(this.API+'/save', skoftes, {headers});
	}

	updateSkoftes(skoftes: Skoftes): Observable<Skoftes> {
	    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
	    return this.http.put<Skoftes>(`${this.API}/update/`, skoftes, {headers});
	}

	deleteSkoftes(id_skoftes: number): Observable<Skoftes> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.delete<Skoftes>(`${this.API}/delete/${id_skoftes}`, {headers});
	}
}
 