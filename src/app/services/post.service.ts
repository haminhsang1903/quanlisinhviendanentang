import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Categorys} from './../models/categorys.model';
import { Posts } from './../models/posts.model';
import { Observable} from 'rxjs';
import { Token } from './../models/token.model';
import { LoginComponent } from './../components-login/login/login.component';
import {CookieService} from 'ngx-cookie-service'; 

@Injectable({ 
  providedIn: 'root'
})
export class PostService {

  @Input () login: LoginComponent;

  token=Token.token_access;
  public cateSang = new Categorys();
  public API : string ='https://serverrunordie.herokuapp.com/categorys';
  public API1 : string ='https://serverrunordie.herokuapp.com/post';
  public API2 : string = 'https://serverrunordie.herokuapp.com/categorys';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getAllCategory(): Observable<Categorys[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')}; 
  	return this.http.get<Categorys[]>(this.API +'/findAll', {headers});
  }

  getSearch(key: string): Observable<Posts[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Posts[]>(`${this.API1}/search/${key}`, {headers});
  }

  getAllPost(): Observable<Posts[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Posts[]>(this.API1 +'/findAll', {headers});
  }

  addPost(posts: Posts) : Observable<Posts>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.post<Posts>(this.API1 +'/save', posts, {headers});
  }

  updatePost(posts: Posts): Observable<Posts> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.put<Posts>(`${this.API1}/update/`, posts, {headers});
  }

  deletePost(id_post: number): Observable<Posts>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.delete<Posts>(this.API1 +'/delete' +"/"+ id_post, {headers});
  }

  getPost(id_post: number): Observable<Posts>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')}; 
    return this.http.get<Posts>(`${this.API}/getOne/${id_post}`, {headers});
  }

  getOne(id_cate: string):Observable<Categorys>{
    const headers = { 'Authorization': 'Bearer '+this.cookieservice.get('token')};
    return this.http.get<Categorys>(`${this.API2}/getOne/${id_cate}`, {headers});
  }

  getByCategorys(id_category: string): Observable<Posts[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.get<Posts[]>(`${this.API1}/getByCategorys/${id_category}`, {headers});
  }
}
