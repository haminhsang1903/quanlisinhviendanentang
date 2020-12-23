import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportCoreService {

    public API : string ='https://serverrunordie.herokuapp.com/categorys';

    constructor(private http: HttpClient) {
    }

    // public uploadFile(file: FormData): Observable<any> {
    //     return this.http.post(this.API, file);
    // }

   //  addPost(posts: Posts) : Observable<Posts>{
   //  const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	// return this.http.post<Posts>(this.API1 +'/save', posts, {headers});
  
}
